import React, {useMemo} from "react";
import geojson2svg from "geojson-to-svg";
import {XY} from "@/pages/TrailPage.tsx";

interface PathCanvasProps {
    path: XY[];
    width?: number;
    height?: number;
}

function pathToGeoJSON(path: XY[]) {
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "coordinates": [
                        [
                            11.009905223678146,
                            46.937578664456026
                        ],
                        [
                            10.811527887530701,
                            46.92292176570487
                        ],
                        [
                            10.906276479624353,
                            47.02034875789488
                        ]
                    ],
                    "type": "LineString"
                }
            }
        ]
    };
}

const PathCanvas: React.FC<PathCanvasProps> = ({path, width = 480, height = 240}) => {
    const coords = path.map(p => [p.lat, p.lng]);
    const xs = coords.map(([x]) => x);
    const ys = coords.map(([, y]) => y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const padding = 2;
    const viewBox = [
        minX - padding,
        minY - padding,
        maxX - minX + 2 * padding,
        maxY - minY + 2 * padding
    ].join(" ");

    const svgElements = useMemo(() => {
        console.log(pathToGeoJSON(path));
        return geojson2svg()
            .styles({YourType: {fill: "blue", stroke: "red"}})
            .data(pathToGeoJSON(path))
            .render();
    }, [path]);

    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            style={{
                background: "#fafbfd",
                border: "1px solid #eee",
                borderRadius: 12,
                width: "100%",
                height: "auto"
            }}
            dangerouslySetInnerHTML={{__html: svgElements}}
        />
    );
};

export default PathCanvas;