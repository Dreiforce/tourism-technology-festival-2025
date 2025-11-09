import { useEffect, useRef, type FC } from 'react';
type IProps = {
  width: number;
  heigth: number;
  row: number;
  column: number;
  asset: string
}
export const Asset:FC<IProps> = (props) => {
const canvas = useRef<null | HTMLCanvasElement>(null)
useEffect(() => {
  if(canvas.current == null){
    return;

  }
  getTileFromTilemap(canvas.current, props.asset, props.column, props.row, props.width, props.heigth) // Get tile at column 1, row 2
      .then((_tileCanvas) => {
        console.log("hi")
      })
      .catch((error) => {
          console.error('Error getting tile:', error);
      });

  },[props.row, props.column])
return <canvas style={{"width": 64, "height": 64}} ref={canvas}>

</canvas>
}
function getTileFromTilemap(
    tileCanvas:HTMLCanvasElement,
    tilemapImagePath:string,
    tileColumn:number,
    tileRow:number,
    tileWidth = 64,
    tileHeight = 64,
) {
    return new Promise((resolve, reject) => {
        const tilemapImage = new Image();
        tilemapImage.src = tilemapImagePath;

        tilemapImage.onload = () => {
            tileCanvas.width = tileWidth;
            tileCanvas.height = tileHeight;
            const tileContext = tileCanvas.getContext('2d');

            const sourceX = tileColumn * tileWidth;
            const sourceY = tileRow * tileHeight;
            if(tileContext == null){
              reject()
              return;
            }

            tileContext.drawImage(
                tilemapImage,
                sourceX,
                sourceY,
                tileWidth,
                tileHeight,
                0,
                0,
                tileWidth,
                tileHeight
            );
            resolve(tileCanvas); // You can resolve with the canvas or its dataURL
        };

        tilemapImage.onerror = () => {
            reject(new Error('Failed to load tilemap image.'));
        };
    });
}

// How to use it:
