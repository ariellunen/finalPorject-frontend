// import React, {useEffect} from 'react';
// import interact from 'interactjs';
// import './Canvas.css';

// const RightCanvas = (props) => {
//     let pixelSize = 5
//     useEffect(() => {
//         interact('#canvasR')
//             .draggable({
//                 max: Infinity,
//                 origin: 'self',
//                 modifiers: [
//                     interact.modifiers.snap({
//                         targets: [
//                             interact.snappers.grid({ x: pixelSize, y: pixelSize })
//                         ]
//                     })
//                 ],
//                 listeners: {
//                     move: function (event) {
//                         let context = event.target.getContext('2d')
//                         let posx = event.clientX; 
//                         let posy = event.clientY;
//                         context.fillStyle = props.color.color;
//                         context.beginPath();
//                         context.arc(posx, posy, 20, 0, 2 * Math.PI);
//                         context.fill();
//                         props.setRight({x:posx, y:posy});
//                         props.handleCoordinate(posx, posy);
//                     }
//                 }
//             })

//         function resizeCanvases() {
//             [].forEach.call(document.querySelectorAll('#canvasR'), function (
//                 canvas
//             ) {
//                 delete canvas.width
//                 delete canvas.height
//                 let rect = canvas.getBoundingClientRect()
//                 canvas.width = rect.width
//                 canvas.height = rect.height
//             })
//         }

//         resizeCanvases()
//     }, [])

//     return (
//         <React.Fragment></React.Fragment>
//     )
// };

// export default RightCanvas;

import React, { useEffect, useState } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleR"
import triangularCor from "../shape/TriangularR"
import heartCor from "../shape/HeartR"
import davidCor from "../shape/DavidR"
import homeCor from "../shape/HomeR"

let canvas;
let down;
let timeTakenR = 0;
let ctx;
let context;
let uploadCoor;
let p;
let c;
let x, y;
let flag = true;
let area;
let fill;
let fillPercentage;
let flagCnc = true;
let color;
let line;

const RightCanvas = (props) => {
    let selectedShape = sessionStorage.getItem("selectedShape");
    //check if it sync
    // if (Math.abs(props.cchange2 - props.cchange1) > 2) {
    //     flagCnc = false;
    // }
    // else {
    //     flagCnc = true;
    // }

    useEffect(() => {
        ctx = document.getElementById("canvasR")
        context = ctx.getContext('2d');
        // on pointer down
        if (Math.abs(props.cchange2 - props.cchange1) > 2 || props.cchange1 === 0) {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthR").value;
            line = document.getElementById("lineWidthL").value;
            color = 'LightGrey'
            context.strokeStyle = 'LightGrey';
            context.lineTo(x, y);
            context.stroke();
        }

        else {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthR").value;
            context.strokeStyle = props.color;
            context.lineTo(x, y);
            context.stroke();
            line = document.getElementById("lineWidthL").value;
            color = props.color
        }

        interact('#canvasR').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = document.getElementById("lineWidthR").value;
            canvas.strokeStyle = 'LightGrey';
            props.setMouseR(false);
            line = document.getElementById("lineWidthL").value;
            color = 'LightGrey'
        })

        interact('#canvasR').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenR = Date.now() - down;
            props.secondsR.push(timeTakenR / 1000);
            props.setRight({ x: -1, y: -1, color: color, line: line })
            props.setMouseR(true);
            canvas.stroke();
            quantityPixels();
        })
        interact('#canvasR')
            .draggable({
                max: Infinity,
                origin: 'self',
                modifiers: [
                    interact.modifiers.snap({
                        targets: [
                            // interact.snappers.grid({ x: pixelSize, y: pixelSize })
                        ]
                    })
                ],
                listeners: {
                    move: function (event) {
                        // if (!flagCnc) {
                        // changeToWhite()
                        // }
                        // else {
                        //     changeToColor()
                        // }
                        // if (x > 0 && x < 800 && y > 0 && y < 800) {
                        //     indexCheck(x, y);
                        // }
                        // if (flag) {
                        x = event.clientX;
                        y = event.clientY;
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setRight({ x: event.clientX, y: event.clientY, color: color, line: line })
                        props.handleCoordinate(event.clientX, event.clientY, color);
                    }
                }
            })
        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasR'), function (
                canvas
            ) {
                delete canvas.width
                delete canvas.height
                // let rect = canvas.getBoundingClientRect()
                // canvas.width = rect.width
                // canvas.height = rect.height
                // console.log( canvas.width);
            })
        }
        resizeCanvases()
        // interact(window).on('resize', resizeCanvases)
    }, [props.cchange2, props.cchange1])

    //Coloring to grey
    // const changeToWhite = () => {
    //     let arr = props.arr;
    //     if (flagCnc) {
    //         return
    //     }
    //     for (let i = 1; i < arr.length - 1; i++) {
    //         context.lineWidth = document.getElementById("lineWidthR").value;
    //         context.strokeStyle = 'LightGrey';

    //         if (arr[i].r.x === -1) {
    //             context.closePath();
    //         }
    //         else if (arr[i].r.x !== -1 && arr[i + 1].r.x !== -1) {
    //             context.beginPath();
    //             context.moveTo(arr[i].r.x, arr[i].r.y);
    //             context.lineTo(arr[i + 1].r.x, arr[i + 1].r.y);
    //             context.stroke();
    //         }
    //         // else if (arr[i].r.x !== -1 && arr[i + 1].r.x !== -1) {
    //         //     context.beginPath();
    //         //     const { data } = context.getImageData(x, y, 1, 1);
    //         //     if (data[2] === 240) {
    //         //         flag = true;
    //         //     }
    //         //     else {
    //         //         flag = false;
    //         //     }
    //         //     context.moveTo(arr[i].r.x, arr[i].r.y);
    //         //     if (flag) { context.lineTo(arr[i + 1].r.x, arr[i + 1].r.y); }
    //         //     context.stroke();
    //         // }
    //     }
    //     context.stroke();
    // }

    //coloring all the coloring to the color
    // const changeToColor = () => {
    //     let arr = props.arr;
    //     if (!flagCnc) {
    //         return
    //     }
    //     context.beginPath();
    //     for (let i = 0; i < arr.length - 1; i++) {
    //         context.lineWidth = document.getElementById("lineWidth").value;
    //         context.strokeStyle = props.color;
    //         if(arr[i].r.x === -1 && arr[i+1].r.x !== -1){
    //             context.closePath();
    //         }
    //         else if (arr[i].r.x === -1) {
    //             context.closePath();
    //         }
    //         else if(arr[i].r.x !== -1 && arr[i + 1].r.x !== -1) {
    //             context.beginPath();
    //             context.moveTo(arr[i].r.x, arr[i].r.y);
    //             context.lineTo(arr[i + 1].r.x, arr[i + 1].r.y);
    //             context.stroke();
    //         }

    //     }
    //     context.stroke();
    // }

    const changeToWhite = () => {
        if (flagCnc) {
            return
        }
        context.beginPath();
        context.lineWidth = document.getElementById("lineWidthR").value;
        context.strokeStyle = 'LightGrey';
        // context.moveTo(x, y;
        context.lineTo(x, y);
        context.stroke();

    }

    const changeToColor = () => {
        if (!flagCnc) {
            return
        }
        context.beginPath();
        context.lineWidth = document.getElementById("lineWidthR").value;
        context.strokeStyle = props.color;
        // context.moveTo(x, y;
        context.lineTo(x, y);
        context.stroke();
    }


    const shapesSelected = (color) => {
        switch (selectedShape) {
            case 'circle':
                uploadCoor = circleCor;
                filling2(0, 400, 390, color)
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                filling(0, 10, 550, 790, 0, 790, color)
                break;
            case 'heart':
                uploadCoor = heartCor;
                filling(0, 150, 450, 150, 0, 750, color)
                filling8(0, 150, 100, 50, 400, 50, 450, 150, color)
                filling8(450, 150, 550, 350, 200, 700, 0, 750, color)
                break;
            case 'david':
                uploadCoor = davidCor;
                filling(0, 20, 500, 650, 0, 650, color)
                filling(0, 140, 500, 140, 0, 780, color)
                break;
            case 'home':
                uploadCoor = homeCor;
                filling(0, 10, 550, 400, 0, 400, color)
                filling4(0, 400, 250, 400, 250, 550, 0, 550, color)
                filling4(100, 550, 250, 550, 250, 780, 100, 780, color)
                filling4(100, 780, 100, 550, 0, 550, 0, 780, color)
                break;
            default:
                uploadCoor = circleCor;
                filling2(0, 400, 390, color)
                break;
        }
    }

    // const id = setInterval(() => {
    //     startTimerrr();
    // }, 500)

    // const startTimerrr = () => {
    //     props.handleCoordinate(x, y);
    // }

    useEffect(() => {
        ctx = document.getElementById("canvasR")
        context = ctx.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, ctx.width, ctx.height);
        shapesSelected('Ivory')
        fileUpload()
        quantityPixelsArea();
    }, []);

    //check how much left to coloring
    const quantityPixelsArea = () => {
        p = context.getImageData(0, 0, ctx.width, ctx.height).data;
        area = 0;
        for (let i = 0; i < p.length / 4; i += 4) {
            if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
                area++
            }
        }
        // console.log(area);
    }

    //check drawing pixels area - for 95% coloring 
    const quantityPixels = () => {
        p = context.getImageData(0, 0, ctx.width, ctx.height).data;
        fill = 0;
        for (let i = 0; i < p.length / 4; i += 4) {
            if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
                fill++
            }
        }
        fillPercentage = ((area - fill) * 100) / area;
        if (fillPercentage > 95) {
            context.clearRect(0, 0, ctx.width, ctx.height);
            let color = props.color;
            shapesSelected(color);
            viewDrawing();
        }
    }
    //check limits - flag
    const indexCheck = (x, y) => {
        const { data } = context.getImageData(x, y, 1, 1);
        if (data[2] === 240) {
            flag = true;
        }
        else {
            flag = false;
        }
    }

    //Upload the drawing
    let coordinates = [];
    const dda = (x0, y0, x1, y1) => {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    };

    const circle = (x1, y1, r) => {
        context.beginPath();
        context.arc(x1, y1, r, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    }

    const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        context.beginPath();
        context.moveTo(x0, y0);
        context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    }

    const filling = (x1, y1, x2, y2, x3, y3, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    const filling2 = (x1, y1, r, color) => {
        context.beginPath();
        context.arc(x1, y1, r, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
    }

    const filling4 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }
    const filling8 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.bezierCurveTo(x2, y2, x3, y3, x4, y4);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    const fileUpload = () => {
        if (uploadCoor) {
            coordinates = []
            const lines = uploadCoor.split('\n')
            for (let i = 0; i < lines.length; i++) {
                const values = lines[i].split(',')
                coordinates.push([])
                for (let j = 0; j < values.length; j++) {
                    coordinates[i].push(parseInt(values[j]))
                }
            }
            viewDrawing()
        }
    }

    const viewDrawing = () => {
        // console.log(coordinates);
        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i].length === 3) {
                circle(coordinates[i][0], coordinates[i][1], coordinates[i][2])
            } else if (coordinates[i].length === 4) {
                dda(coordinates[i][0], coordinates[i][1],
                    coordinates[i][2], coordinates[i][3])
            } else if (coordinates[i].length === 8) {
                bezierCurve(coordinates[i][0], coordinates[i][1], coordinates[i][2],
                    coordinates[i][3], coordinates[i][4], coordinates[i][5],
                    coordinates[i][6], coordinates[i][7])
            }
        }
    }

    return (
        <React.Fragment>
            <div>
                {/* <canvas id="canvasR" width="620" height="470" penwidth='30'></canvas> */}
                <canvas id="canvasR" width="800" height="800" penwidth='30'></canvas>
                <div>
                    <input type="range" min="4" max="20" id="lineWidthR" name='lineWidthR' step="8" />
                    <output for="lineWidthR" onforminput="value = lineWidthR.valueAsNumber;"></output>
                </div>
            </div>

        </React.Fragment>
    )
};

export default RightCanvas;