import React, { useEffect, useRef, useState } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleL";
import triangularCor from "../shape/TriangularL"
import heartCor from "../shape/HeartL"
import davidCor from "../shape/DavidL"
import homeCor from "../shape/HomeL"
import Confetti from "react-confetti";

let flagCnc = true;
let canvas;
let down;
let timeTakenL = 0;
let ctx;
let context;
let uploadCoor;
let p;
let x, y;
let flag = true;
let area;
let fill;
let fillPercentage;
let selectedShape;
let color;
let line;
const LeftCanvas = (props) => {
    selectedShape = sessionStorage.getItem("selectedShape");
    //check if it sync
    // if (Math.abs(props.cchange2 - props.cchange1) > 2) {
    //     flagCnc = false;
    // }
    // else {
    //     flagCnc = true;
    // }
    useEffect(() => {
        ctx = document.getElementById("canvasL")
        context = ctx.getContext('2d');
        line = document.getElementById("lineWidthL").value;
        if (Math.abs(props.cchange2 - props.cchange1) > 2 || props.cchange2 === 0) {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthL").value;
            line = document.getElementById("lineWidthL").value;
            color = 'LightGrey'
            context.strokeStyle = 'LightGrey';
            context.lineTo(x, y);
            context.stroke();
        }

        else {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthL").value;
            context.strokeStyle = props.color;
            context.lineTo(x, y);
            context.stroke();
            line = document.getElementById("lineWidthL").value;
            color = props.color
        }
        // on pointer down
        interact('#canvasL').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = document.getElementById("lineWidthL").value;
            canvas.strokeStyle = 'LightGrey';
            props.setMouseL(false);
            line = document.getElementById("lineWidthL").value;
            color = 'LightGrey'
        })

        interact('#canvasL').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenL = Date.now() - down;
            props.secondsL.push(timeTakenL / 1000);
            props.setLeft({ x: -1, y: -1, color: color, line: line })
            props.setMouseL(true);
            canvas.stroke();
            quantityPixels();
        })
        interact('#canvasL')
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
                        //     changeToWhite()
                        // }
                        // else {
                        //     changeToColor()
                        // }
                        x = event.clientX;
                        y = event.clientY;
                        // if (x > 0 && x < 800 && y > 0 && y < 800) {
                        //     indexCheck(x, y);
                        // }
                        // if (flag) {
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setLeft({ x: event.clientX, y: event.clientY, color: color, line: line })
                        props.handleCoordinate(event.clientX, event.clientY, color, line);
                    }
                }
            })
        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasL'), function (
                canvas
            ) {
                delete canvas.width
                delete canvas.height
            })
        }
        resizeCanvases()
    }, [props.cchange2, props.cchange1])



    // const id = setInterval(() => {
    //     startTimerrr();
    // }, 500)

    // const startTimerrr = () => {
    //     props.handleCoordinate(x, y);
    // }

    useEffect(() => {
        ctx = document.getElementById("canvasL");
        context = ctx.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, ctx.width, ctx.height);
        shapesSelected('Ivory');
        fileUpload();
        quantityPixelsArea();
    }, []);


    //Filiing in grey
    const changeToWhite = () => {
        let arr = props.arr;
        if (flagCnc) {
            return
        }
        for (let i = 1; i < arr.length - 1; i++) {
            context.lineWidth = document.getElementById("lineWidthL").value;
            context.strokeStyle = 'LightGrey';

            if (arr[i].l.x === -1) {
                context.closePath();
            }
            else if (arr[i].l.x !== -1 && arr[i + 1].l.x !== -1) {
                context.beginPath();
                context.moveTo(arr[i].l.x, arr[i].l.y);
                context.lineTo(arr[i + 1].l.x, arr[i + 1].l.y);
                context.stroke();
            }
        }
        context.stroke();
    }


    const quantityPixelsArea = () => {
        p = context.getImageData(0, 0, ctx.width, ctx.height).data;
        area = 0;
        for (let i = 0; i < p.length / 4; i += 4) {
            if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
                area++
            }
        }
        console.log(area);
    }



    // const quantityPixels = () => {
    //     p = context.getImageData(0, 0, ctx.width, ctx.height).data;
    //     console.log(p);
    //     console.log(p.length / 16);
    //     fill = 0;
    //     background = 0;
    //     white = 0;
    //     for (let i = 0; i < p.length / 4; i += 4) {
    //         if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255){
    //             background ++
    //         }
    //         else if (p[i] !== 255 || p[i + 1] !== 255 || p[i + 2] !== 255 || p[i + 3] !== 255) {
    //             fill++;
    //         }
    //         else {
    //             white ++;
    //         }
    //     }
    //     console.log(background);
    //     console.log(fill);
    //     console.log(white);
    // }

    const shapesSelected = (color) => {
        switch (selectedShape) {
            case 'circle':
                uploadCoor = circleCor;
                filling2(800, 400, 390, color)
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                filling(800, 10, 250, 790, 800, 790, color)
                break;
            case 'heart':
                uploadCoor = heartCor;
                filling(800, 150, 350, 150, 800, 750, color)
                filling8(800, 150, 700, 50, 400, 50, 350, 150, color)
                filling8(350, 150, 250, 350, 600, 700, 800, 750, color)
                break;
            case 'david':
                uploadCoor = davidCor;
                filling(800, 20, 300, 650, 800, 650, color)
                filling(800, 140, 300, 140, 800, 780, color)
                break;
            case 'home':
                uploadCoor = homeCor;
                filling(800, 10, 250, 400, 800, 400, color)
                filling4(800, 400, 550, 400, 550, 550, 800, 550, color)
                filling4(700, 550, 550, 550, 550, 780, 700, 780, color)
                filling4(700, 780, 700, 550, 800, 550, 800, 780, color)
                break;
            default:
                uploadCoor = circleCor;
                filling2(800, 400, 390, color)
                break;
        }

    }

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
            shapesSelected(props.color);
            viewDrawing();
            props.setDoneLeft(true);
        }
    }

    const indexCheck = (x, y) => {
        const { data } = context.getImageData(x, y, 1, 1);
        // console.log(data[2])
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
                {/* <Confetti /> */}
                <canvas id="canvasL" width="800" height="800"></canvas>
                <div>
                    <input type="range" min="4" max="20" id="lineWidthL" name='lineWidthL' step="8" />
                    <output for="lineWidthL"></output>
                </div>
            </div>


        </React.Fragment >
    )
};
export default LeftCanvas;