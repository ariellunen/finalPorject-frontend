import React, { useEffect, useRef, useState } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleL";
import triangularCor from "../shape/TriangularL"
import heartCor from "../shape/HeartL"
import davidCor from "../shape/DavidL"
import homeCor from "../shape/HomeL"
import Confetti from "react-confetti";
import Avatar from '@mui/material/Avatar';
import './LeftCanvas.css'
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
let line = 12;

const LeftCanvas = (props) => {
    selectedShape = sessionStorage.getItem("selectedShape");
    useEffect(() => {
        document.getElementById("oneL").style.backgroundColor = props.color;
        document.getElementById("twoL").style.backgroundColor = props.color;
        document.getElementById("threeL").style.backgroundColor = props.color;

    }, [props.color])

    useEffect(() => {
        ctx = document.getElementById("canvasL")
        context = ctx.getContext('2d');
        // line = document.getElementById("lineWidthL").value;
        context.lineWidth = line;
        if (Math.abs(props.cchange2 - props.cchange1) > 2 || props.cchange2 === 0) {
            context.beginPath();
            context.lineWidth = line;
            // context.lineWidth = document.getElementById("lineWidthL").value;
            // line = document.getElementById("lineWidthL").value;
            color = 'LightGrey'
            context.strokeStyle = 'LightGrey';
            context.lineTo(x, y);
            context.stroke();
        }

        else {
            context.beginPath();
            context.lineWidth = line;
            // context.lineWidth = document.getElementById("lineWidthL").value;
            context.strokeStyle = props.color;
            context.lineTo(x, y);
            context.stroke();
            // line = document.getElementById("lineWidthL").value;
            color = props.color
        }
        // on pointer down
        interact('#canvasL').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            context.lineWidth = line;
            canvas.strokeStyle = 'LightGrey';
            props.setMouseL(false);
            color = 'LightGrey'
        })

        interact('#canvasL').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            // timeTakenL = Date.now() - down;
            // console.log(timeTakenL)
            // props.secondsL.push(timeTakenL / 1000);
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
                        quantityPixels();
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

    useEffect(() => {
        ctx = document.getElementById("canvasL");
        context = ctx.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, ctx.width, ctx.height);
        shapesSelected('Ivory');
        fileUpload();
        quantityPixelsArea();
    }, []);

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
                filling2(620, 235, 230, color)
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                filling(620, 10, 250, 460, 620, 460, color)
                break;
            case 'heart':
                uploadCoor = heartCor;
                filling(620, 100, 250, 100, 620, 460, color)
                filling8(620, 100, 540, 0, 340, 0, 250, 100, color)
                filling8(250, 100, 50, 350, 440, 400, 620, 460, color)
                break;
            case 'david':
                uploadCoor = davidCor;
                filling(620, 20, 250, 370, 620, 370, color)
                filling(620, 100, 250, 100, 620, 450, color)
                break;
            case 'home':
                uploadCoor = homeCor;
                filling(620, 10, 250, 250, 620, 250, color)
                filling4(400, 250, 620, 250, 620, 460, 400, 460, color)
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
        if (fillPercentage > 90) {
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

    const handleWidth = (value) => {
        // console.log(value)
        line = value;
    }

    let button = document.getElementsByClassName("widthL");
    
    let addSelectClass = function () {
        removeSelectClass();
        this.classList.add('selectedL');
    }

    let removeSelectClass = function () {
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('selectedL')
        }
    }

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", addSelectClass);
    }

    const pointerUp = () => {
        timeTakenL = Date.now() - down;
        props.handleSecondsL(timeTakenL)
        // props.secondsL.push(timeTakenL / 1000);
    }
    return (
        <React.Fragment>
            <div className='containerL'>
                <canvas id="canvasL" width="620" height="470" penwidth='30' onPointerUp={pointerUp}></canvas>
                <div id='contentL'>
                    <div id="myDivL">
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt={'left'}
                            src={`http://localhost:3000/${JSON.parse(localStorage.getItem('firstKide')).image}`}
                        />
                        <div>{`${JSON.parse(localStorage.getItem('firstKide')).name}`}</div>

                    </div>
                    
                    <progress id='progressL' value={props.cchange1} max="10"></progress>
                    <img src='https://i.postimg.cc/0jLXYJWx/Breadcrumbs-25.png' alt="turtel" id='turtelL' />
                    <img src='https://i.postimg.cc/SRT236FF/Breadcrumbs-26.png' alt="bunny" id='bunnyL' />
                    {/* <input type="range" min="4" max="20" id="lineWidthL" name='lineWidthL' step="8" /> */}
                    <div className='lineWidthL'>
                        <button type='button' className='widthL lineWidthL4' id='oneL' value={4} onClick={(() => handleWidth(4))}></button>
                        <button type='button' className='widthL selectedL lineWidthL12' id='twoL' value={12} onClick={(() => handleWidth(12))}></button>
                        <button type='button' className='widthL lineWidthL20' id='threeL' value={20} onClick={(() => handleWidth(20))}></button>
                    </div>
                </div>
            </div>


        </React.Fragment >
    )
};
export default LeftCanvas;