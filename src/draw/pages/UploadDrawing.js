// import ctx from './LeftCanvas';
import mytext from "./test.js"


let coordinates = [];
let oldCoordinates = [];
let x, y;
let sX = 0;
let sY =0;
// const UploadDrawing = () => {
    // const canvas = require("./LeftCanvas");
    // console.log(canvas);

// let canvas = ctx;

//DDA algorithem
// const putPixel = (x, y, color) => {
//     console.log("6");
//     canvas.fillStyle = color;
//     canvas.fillRect(x, y, 1, 1);
// }

// const dda = (x0, y0, x1, y1, color) => {
//     console.log("5");
//     let range = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
//     let deltaX = (x1 - x0) / range;
//     let deltaY = (y1 - y0) / range;
//     x = x0;
//     y = y0;
//     for (let i = 0; i < range; i++) {
//         // putPixel(x, y, color);
//         x += deltaX;
//         y += deltaY;
//     }
// };

//MyCircle()
// const circle = (x1, y1, r) => {
//     console.log(coordinates);
//     console.log("4");
//     let x = 0
//     let y = r
//     let p = 3 - 2 * x

//     while (x < y) {
//         canvas.fillRect(x + x1, y + y1, 1, 1)
//         canvas.fillRect(y + x1, x + y1, 1, 1)
//         canvas.fillRect(-x + x1, y + y1, 1, 1)
//         canvas.fillRect(-y + x1, x + y1, 1, 1)
//         canvas.fillRect(-x + x1, -y + y1, 1, 1)
//         canvas.fillRect(-y + x1, -x + y1, 1, 1)
//         canvas.fillRect(x + x1, -y + y1, 1, 1)
//         canvas.fillRect(y + x1, -x + y1, 1, 1)

//         if (p < 0) {
//             p = p + 4 * x + 6
//         } else {
//             p = p + 4 * (x - y) + 10
//             y--
//         }
//         x++
//     }
// }

//myBezuerCurve
// const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
//     console.log("3");
//     sX = x0;
//     sY = y0;
//     for (let i = 0; i <= 1; i += 0.01) {

//         let cX = 3 * (x1 - x0),
//             bX = 3 * (x2 - x1) - cX,
//             aX = x3 - x0 - cX - bX;

//         let cY = 3 * (y1 - y0),
//             bY = 3 * (y2 - y1) - cY,
//             aY = y3 - y0 - cY - bY;

//         let tX = (aX * Math.pow(i, 3)) + (bX * Math.pow(i, 2)) + (cX * i) + x0;
//         let tY = (aY * Math.pow(i, 3)) + (bY * Math.pow(i, 2)) + (cY * i) + y0;

//         dda(sX, sY, tX, tY, 'blue')
//         sX = tX;
//         sY = tY;
//     }
//     dda(sX, sY, x3, y3, 'blue')
// }

//Import the coordinates from the document
// let document = "Circle.txt";
// const fileUpload = () => {
//     if (mytext) {
//         coordinates = []
//         const lines = mytext.split('\n')
//         for (let i = 0; i < lines.length; i++) {
//             const values = lines[i].split(',')
//             coordinates.push([])
//             oldCoordinates.push([])
//             for (let j = 0; j < values.length; j++) {
//                 coordinates[i].push(parseInt(values[j]))
//                 oldCoordinates[i].push(parseInt(values[j]))
//             }
//         }
//         viewDrawing()
//     }
// }

// //Upload all the drawing by coordinates
// const viewDrawing = () => {
//     console.log("2");
//     console.log(coordinates);
//     for (let i = 0; i < coordinates.length; i++) {
//         // if (coordinates[i].length === 3) {
//         //     circle(coordinates[i][0], coordinates[i][1], coordinates[i][2])
//         // } else if (coordinates[i].length === 4) {
//         //     dda(coordinates[i][0], coordinates[i][1],
//         //         coordinates[i][2], coordinates[i][3], 'red')
//         // } else if (coordinates[i].length === 8) {
//         //     bezierCurve(coordinates[i][0], coordinates[i][1], coordinates[i][2],
//         //         coordinates[i][3], coordinates[i][4], coordinates[i][5],
//         //         coordinates[i][6], coordinates[i][7])
//         // }
//     }
// }

// export { fileUpload };