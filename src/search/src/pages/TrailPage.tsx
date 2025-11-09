import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export interface XY {
    lat: number;
    lng: number;
}

export default function TrailPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [trailPath, setTrailPath] = useState<XY[] | null>(null);
    const [fileNames, setFileNames] = useState<string[] | null>(null);
    const [trailName, setTrailName] = useState<string | null>(null);
    console.log(trailPath)
    useEffect(() => {
        setTrailPath(location.state.trailPath);
        setFileNames(location.state.fileNames);
        setTrailName(location.state.trailName || "Trail Path");
    }, [location.state]);

    const initialTime = 0;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 2000) {
                    clearInterval(timerInterval);
                    // Perform actions when the timer reaches zero
                    console.log('Countdown complete!');
                    return 0;
                } else {
                    return prevTime + 1;
                }
            });
        }, 500);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, []); // The empty dependency array ensures the effect runs only once on mount

    // Convert seconds to hours, minutes, and seconds
    const seconds = timeRemaining % 60;

    return (
        <div>
            {/*<Background column={timeRemaining}/>*/}
            {/*<Asset asset={Autumn} column={seconds % 22} row={0} heigth={64} width={64}/>*/}
            {/*<Asset asset={Spring} column={seconds % 22} row={0} heigth={64} width={64}/>*/}
            {/*<Asset asset={Winter} column={seconds % 22} row={0} heigth={64} width={64}/>*/}
            {/*<Asset asset={Summer} column={seconds % 22} row={0} heigth={64} width={64}/>*/}
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 py-8">


                <div className="container mx-auto px-2 max-w-2xl">
                    <h1 className="text-3xl font-bold text-center mb-6">
                        {trailName ? trailName : "Trail Details"}
                    </h1>

                    {trailPath && Array.isArray(trailPath) && trailPath.length > 0 ? (
                        <>
                            <div className="mb-6">
                                <img src='/trail.png' alt='alt'/>
                                {/*<PathCanvas path={trailPath}/>*/}
                                <p className="text-xs text-center mt-1 text-muted-foreground">
                                    Trail
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-4 my-4">
                                <input
                                    type="range"
                                    min={0}
                                    max={trailPath.length - 1}
                                    className="w-3/4"
                                />
                            </div>

                            <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
                                <h2 className="font-bold text-lg text-primary mb-4">
                                    Trail Path ({trailPath.length} points)
                                </h2>
                                <div className="w-full overflow-x-auto border rounded-md">
                                    <table className="w-full text-sm text-left">
                                        <thead>
                                        <tr>
                                            <th className="py-1 px-2">#</th>
                                            <th className="py-1 px-2">Latitude (y)</th>
                                            <th className="py-1 px-2">Longitude (x)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {trailPath.map((point, idx) => (
                                            <tr
                                                key={idx}
                                                className={
                                                    idx === 0
                                                        ? "bg-primary/10 font-bold"
                                                        : idx === trailPath.length - 1
                                                            ? "bg-accent/10 font-bold"
                                                            : ""
                                                }
                                            >
                                                <td className="py-1 px-2">{idx + 1}</td>
                                                <td className="py-1 px-2">{point.lat?.toFixed(5)}</td>
                                                <td className="py-1 px-2">{point.lng?.toFixed(5)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    <span className="font-semibold">First row</span>: start,{" "}
                                    <span className="font-semibold">last row</span>: end point.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-muted-foreground mt-12">
                            No trail path found or data not loaded.<br/>
                            <button
                                className="mt-4 bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/80 transition"
                                onClick={() => navigate("/")}
                            >
                                Back to Search
                            </button>
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <button
                            className="bg-primary text-white px-6 py-2 rounded font-semibold shadow hover:bg-primary/80 transition"
                            onClick={() => navigate("/")}
                        >
                            Back to Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}