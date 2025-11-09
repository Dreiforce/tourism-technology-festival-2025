package main

import (
	"log"
	"net/http"
	"time"
	"encoding/json"
	"strings"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"strconv"
    "os/exec"
	"github.com/ajstarks/svgo"
"path/filepath"
)

type SearchResult struct {
 Time        time.Time `json:"time"`
 Description string    `json:"description"`
 ID          uint64    `json:"id"`
}

type Data struct {
    Rows []DataRow `json:"data"`
}
type DataRow struct {
    Id string `json:"id"`
    Geo Geo `json:"geo"`
}
type Geo struct {
    Geometry Geometry `json:"geometry"`
}
type Geometry struct {
    Value string `json:"value"`
}

type Point struct {
  X float64
  Y float64
}


type MyTree struct {
    X,Y int
    Hexcolor string
}

func generate_svg(target string, trees []MyTree) {
    fileout, err := os.Create(target)
    if(err != nil) {

            log.Fatalf("svg gen open : %v", err)
            }
        defer func() {
         if err := fileout.Close(); err != nil {
             panic(err)
         }
     }()




	width := 500
	height := 500
	canvas := svg.New(fileout)
	canvas.Start(width, height)

    for i := range trees {
        t := trees[i]
        canvas.Translate(t.X, t.Y)
        canvas.Rect(-10, -10, 20, 20, "color=\"" + t.Hexcolor + "\"")
        canvas.Rect(0 + 2, -10 , 4, 10, "color=\"#f0f\"")
        canvas.Gend()
    }

	canvas.Circle(width/2, height/2, 100)

	canvas.Text(width/2, height/2, "Hello, SVG", "text-anchor:middle;font-size:30px;fill:white")
	canvas.End()

}

func extract_svg(id, pngfile string) {
    grepCmd := exec.Command("python", "../pipeline_colors/extract.py",
    pngfile)
  const venv = "../.venv"

//grepCmd.Dir =  filepath.Join(".", "datadir", id)
    grepCmd.Env = append(os.Environ(),
        // these were the only ones i could see changing on 'activation'
        "VIRTUAL_ENV=" + venv,
        //"OPENEO_CONFIG_HOME=/home/simon/Projects/hackathon2025/tourism-technology-festival-2025/processing/openeo",
    )

    grepIn, _ := grepCmd.StdinPipe()
    grepOut, _ := grepCmd.StdoutPipe()
    grepErr, _ := grepCmd.StderrPipe()
    grepCmd.Start()
    grepIn.Write([]byte("hello grep\ngoodbye grep"))
    grepIn.Close()
    grepBytes, _ := io.ReadAll(grepOut)
    grepBytesErr, _ := io.ReadAll(grepErr)


    if err := grepCmd.Wait(); err != nil {
        if exiterr, ok := err.(*exec.ExitError); ok {
            log.Printf("Exit Status: %d", exiterr.ExitCode())
        } else {
            log.Fatalf("cmd.Wait: %v", err)
        }
    }

    println("output of command" + string(grepBytes))
    println("output of command" + string(grepBytesErr))

    generate_svg(pngfile + ".svg", []MyTree{
        MyTree{X: 10, Y: 10, Hexcolor: "#ff0"},
    })

}

func readdir_ext(id, dir string) {

    items, _ := os.ReadDir(dir)
    for _, item := range items {
    if(!item.IsDir() && strings.HasSuffix(item.Name(), ".png")) {
        extract_svg(id, filepath.Join(dir, item.Name()))
    }
    }

}


func (b Point) String() string {
        return fmt.Sprintf("[%f %f]", b.X, b.Y)
}


func Exxtract (id string, leftTop, rightBottom Point){
println("running extraction with " + leftTop.String() + " "+ rightBottom.String())
fmt.Println("Say hi")

newpath := filepath.Join(".", "datadir", id, "satellite_images")
err := os.MkdirAll(newpath, os.ModePerm)
if err != nil {
return
}
    grepCmd := exec.Command("python", "../../../processing/Sentinel_3.py",
     fmt.Sprintf("%f", leftTop.Y),
    fmt.Sprintf("%f", leftTop.X),
    fmt.Sprintf("%f", rightBottom.Y),
    fmt.Sprintf("%f", rightBottom.X))
  const venv = "../.venv"

grepCmd.Dir =  filepath.Join(".", "datadir", id)
    grepCmd.Env = append(os.Environ(),
        // these were the only ones i could see changing on 'activation'
        "VIRTUAL_ENV=" + venv,
        "OPENEO_CONFIG_HOME=/home/simon/Projects/hackathon2025/tourism-technology-festival-2025/processing/openeo",
    )

    grepIn, _ := grepCmd.StdinPipe()
    grepOut, _ := grepCmd.StdoutPipe()
    grepErr, _ := grepCmd.StderrPipe()
    grepCmd.Start()
    grepIn.Write([]byte("hello grep\ngoodbye grep"))
    grepIn.Close()
    grepBytes, _ := io.ReadAll(grepOut)
    grepBytesErr, _ := io.ReadAll(grepErr)


    if err := grepCmd.Wait(); err != nil {
        if exiterr, ok := err.(*exec.ExitError); ok {
            log.Printf("Exit Status: %d", exiterr.ExitCode())
        } else {
            log.Fatalf("cmd.Wait: %v", err)
        }
    }

    println("output of command" + string(grepBytes))
    println("output of command" + string(grepBytesErr))
}

func extract(id string, coords []Point) {

    minX := 120000.0
     maxX := 0.0
    minY := 2000000.0 //TODO: large number max float etc
    maxY := 0.0

    for i := range coords {
        minX = min(minX, coords[i].X)
        maxX = max(maxX, coords[i].X)
        minY = min(minY, coords[i].Y)
        maxY = max(maxY, coords[i].Y)
    }


    Exxtract(id, Point{
          X: minX, Y: minY,
    }, Point{X: maxX, Y: maxY })
}



func hello(w http.ResponseWriter, req *http.Request)  {
    res := SearchResult{
    }
    json.NewEncoder(w).Encode(res)
}
func findit(w http.ResponseWriter, req *http.Request)  {
    q := req.URL.Query()


      id := q.Get("id")



     content, err := ioutil.ReadFile("./rows.json")
        if err != nil {
            log.Fatal("Error when opening file: ", err)
        }

        // Now let's unmarshall the data into `payload`
        var payload Data
        err = json.Unmarshal(content, &payload)
        if err != nil {
            log.Fatal("Error during Unmarshal(): ", err)
        }

    for i := range payload.Rows {
        if(strings.Compare(id, payload.Rows[i].Id) == 0 ) {
        log.Printf("hallo, found something")
            points := make([]Point, 0)
            datapoints := strings.Split(payload.Rows[i].Geo.Geometry.Value, " ")
            for i:=0; i<len(datapoints); i+=2 {

    x, _ := strconv.ParseFloat(datapoints[i], 32)

    y, _ := strconv.ParseFloat(datapoints[i+1], 32)

                points = append(points, Point{
                    X: x,
                    Y: y,
                })
            }
        extract(id, points)
        readdir_ext(id, filepath.Join(".","datadir",id,"satellite_images"))

            var res2 = map[string]string {
                "test": payload.Rows[i].Geo.Geometry.Value,
            }
            json.NewEncoder(w).Encode(res2)

            return

        }
    }
log.Fatal("entry not found")

    var res = map[string]string {
    "test":"test",
    }
    json.NewEncoder(w).Encode(res)
}

func main() {
	fs := http.FileServer(http.Dir("./../src/search/dist"))
	http.Handle("/", fs)
	http.HandleFunc("/api/doit", hello)
	http.HandleFunc("/api/find", findit)

	log.Print("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}