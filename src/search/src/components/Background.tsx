import {useEffect, useRef} from "react"
import Terrain from "../assets/beispiel_bild.png"
import Plants from '../assets/Plants.png'
import Rock from '../assets/Rock1.png'
import Summer from '../assets/laub_anim/Summer.png'
import Gras from '../assets/terrain/gras.png'
import Dirt from '../assets/terrain/dirt.png'

export const Background = (props: { column: number }) => {
    const canvas = useRef<null | HTMLCanvasElement>(null)
    const canvas1 = useRef<null | HTMLCanvasElement>(null)
    const img = useRef<null | HTMLImageElement>(null)
    const components = useRef<Component[]>([])
    const update = useRef<number>(0)
    useEffect(() => {
        getTileFromTilemap(Terrain) // Get tile at column 1, row 2
            .then((tileCanvas) => {
                let componentsList: Component[] = [];
                for (let index = 0; index < tileCanvas.length; index++) {
                    const element = tileCanvas[index];

                    componentsList.push(genCoord(element))

                }
                components.current = componentsList
                update.current = update.current + 1;

            })
            .catch((error) => {
                console.error('Error getting tile:', error);
            });


    }, [])
    useEffect(() => {
        if (canvas.current == null || canvas1.current == null) {
            return;
        }
        const context = canvas.current.getContext('2d');
        const context1 = canvas1.current.getContext('2d');
        if (context == null || context1 == null) {
            return;
        }

        components.current.forEach((el, idx) => {
            const x = Math.floor(idx / 100);
            const y = idx % 100;
            if (el.type === 'terrain') {
                const image = loadImage(el.value)
                image.onload = () => {

                    context.drawImage(image, x * 16, y * 16, 16, 16);
                }
            } else {
                const asset = loadImage(Gras);
                asset.onload = () => {
                    context.drawImage(asset, x * 16, y * 16, 16, 16);
                }

            }
        })

        components.current.forEach((el, idx) => {
            if (el.type === 'asset' && el.value === Rock) {
                render(el.value, context, idx, props.column)
            }
        })

        components.current.forEach((el, idx) => {
            if (el.type === 'asset' && el.value === Summer) {
                render(el.value, context, idx, props.column)
            }
        })
        context1.putImageData(context.getImageData(0, 0, 1600, 1600), 1600, 1600)
        img.current!.src = canvas.current.toDataURL("image/url")
        img
    }, [props.column, update.current])

    return <>
        <img ref={img} width={1000} height={1000} style={{"position": "fixed", left: 0, top: 0}}/>
        <canvas

            id="1"
            style={{"width": 1600, "height": 1600, "imageRendering": 'pixelated', display: 'none'}}
            ref={canvas1}/>
        <canvas
            id="2"
            style={{"width": 1600, "height": 1600, "imageRendering": 'pixelated', display: 'none'}}
            ref={canvas}/>
    </>

}
type Component = { type: 'asset' | 'terrain', value: string };

function genCoord(pixel: number[]): Component {
    //TODO: This shit
    const [r, g, b, a] = pixel;
    const probability = a / 255 * 0.8;
    let asset = '';
    if (r === 59 && g === 117 && b === 175) {
        //red
        console.count("rock")
        asset = Rock;
    }
    if (r === 59 && g === 117 && b === 175) {
        //green
        console.count("summer")
        asset = Summer;
    }
    if (r === 88 && g === 187 && b === 204) {
        //green
        console.count("plants")
        asset = Plants;
    }
    const randomNumber = Math.random();
    if (randomNumber < probability * 0.1) {
        return {type: 'asset', value: asset}; // Draw the image
    } else {
        // Don't draw asset instead draw terrain
        // //special case dirt
        if (r === 0 && g === 0 && b === 0) {
            return {type: 'terrain', value: Dirt};
        }
    }
    // Don't draw asset instead draw terrain
    return {type: 'terrain', value: Gras};

}

function getTileFromTilemap(
    tilemapImagePath: string,
): Promise<number[][]> {
    return new Promise((resolve, reject) => {
        const tileCanvas = new OffscreenCanvas(100, 100);
        const tilemapImage = new Image();
        tilemapImage.src = tilemapImagePath;

        tilemapImage.onload = () => {
            const tileContext = tileCanvas.getContext('2d');

            if (tileContext == null) {
                reject()
                return;
            }

            tileContext.drawImage(
                tilemapImage,
                0,
                0,
                tileCanvas.width,
                tileCanvas.height,
                0,
                0,
                tileCanvas.width,
                tileCanvas.height,
            );
            const imageData = tileContext.getImageData(0, 0, tileCanvas.width, tileCanvas.height);
            const r = []
            const g = []
            const b = []
            const a = []
            for (let index = 0; index < imageData.data.length; index++) {
                const element = imageData.data[index];
                const modulo = index % 4;
                if (modulo === 0) {
                    r.push(element)
                }
                if (modulo === 1) {
                    g.push(element)
                }

                if (modulo === 2) {
                    b.push(element)
                }
                if (modulo === 3) {
                    a.push(element)
                }
            }

            const trans = transpose([r, g, b, a]);
            console.table(trans)
            resolve(trans); // You can resolve with the canvas or its dataURL
        };

        tilemapImage.onerror = () => {
            reject(new Error('Failed to load tilemap image.'));
        };
    });
}

function transpose(matrix: number[][]) {
    return matrix[0].map((_col, i) => matrix.map(row => row[i]));
}

function loadImage(src: string) {
    const tilemapImage = new Image();
    tilemapImage.src = src;
    return tilemapImage;
}

function render(img: string, context: CanvasRenderingContext2D, idx: number, frame: number) {

    const image = loadImage(img)
    const x = Math.floor(idx / 100);
    const y = idx % 100;
    image.onload = () => {
        if (img === Summer) {
            context.drawImage(image, 64 * ((frame + x + y) % 21 + 1), 0, 64, 64, x * 16, y * 16, 64, 64);
        } else if (img === Rock) {
            context.drawImage(image, 0, 0, 128, 128, x * 16, y * 16, 32, 32);
        } else {
            context.drawImage(image, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
        }
    }
}
