import React, { useEffect } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleR"
import triangularCor from "../shape/TriangularR"
import heartCor from "../shape/HeartR"
import davidCor from "../shape/DavidR"
import homeCor from "../shape/HomeR"
import './RightCanvas.css';
import Avatar from '@mui/material/Avatar';
// import { ClickAwayListener } from '@mui/material';

let canvas;
let down;
let timeTakenR = 0;
let ctx;
let context;
let uploadCoor;
let p;
let x, y;
let area;
let fill;
let fillPercentage;
let flagCncR = true;
let color;
let line = 12;
let selectedShape;

const RightCanvas = (props) => {
    selectedShape = sessionStorage.getItem("selectedShape");
    useEffect(() => {
        document.getElementById("oneR").style.backgroundColor = props.color;
        document.getElementById("twoR").style.backgroundColor = props.color;
        document.getElementById("threeR").style.backgroundColor = props.color;

    }, [props.color])

    useEffect(() => {
        ctx = document.getElementById("canvasR")
        context = ctx.getContext('2d');
        context.lineWidth = line;

        if (Math.abs(props.cchange2 - props.cchange1) > 2.2 || props.cchange1 === 0) {
            context.beginPath();
            context.lineWidth = line;
            color = 'LightGrey';
            context.strokeStyle = 'LightGrey';
            context.lineTo(x, y);
            context.stroke();
            flagCncR = false;
        }

        else if (Math.abs(props.cchange2 - props.cchange1) > 1.8 && Math.abs(props.cchange2 - props.cchange1) < 2.2) {
            if (flagCncR) {
                context.beginPath();
                context.lineWidth = line;
                color = props.color;
                context.strokeStyle = props.color;
                context.lineTo(x, y);
                context.stroke();
            }
            else {
                context.beginPath();
                context.lineWidth = line;
                color = 'LightGrey';
                context.strokeStyle = 'LightGrey';
                context.lineTo(x, y);
                context.stroke();
            }
        }

        else if (Math.abs(props.cchange2 - props.cchange1) < 1.8 && props.cchange1 !== 0) {
            context.beginPath();
            context.lineWidth = line;
            color = props.color;
            context.strokeStyle = props.color;
            context.lineTo(x, y);
            context.stroke();
            flagCncR = true;
        }

        interact('#canvasR').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            context.lineWidth = line;
            canvas.strokeStyle = 'LightGrey';
            props.setMouseR(false);
            color = 'LightGrey'
        })

        interact('#canvasR').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
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
                        x = event.clientX;
                        y = event.clientY;
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setRight({ x: event.clientX, y: event.clientY, color: color, line: line })
                        props.handleCoordinate(event.clientX, event.clientY, color);
                        quantityPixels();
                    }
                }
            })
        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasR'), function (
                canvas
            ) {
                delete canvas.width
                delete canvas.height
            })
        }
        resizeCanvases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cchange2, props.cchange1])

    const shapesSelected = (color) => {
        switch (selectedShape) {
            case 'circle':
                uploadCoor = circleCor;
                filling2(0, 235, 230, color)
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                filling(0, 10, 370, 460, 0, 460, color)
                break;
            case 'heart':
                uploadCoor = heartCor;
                filling(0, 100, 370, 100, 0, 460, color)
                filling8(0, 100, 80, 0, 280, 0, 370, 100, color)
                filling8(370, 100, 570, 350, 180, 400, 0, 460, color)
                break;
            case 'david':
                uploadCoor = davidCor;
                filling(0, 20, 370, 370, 0, 370, color)
                filling(0, 100, 370, 100, 0, 450, color)
                break;
            case 'home':
                uploadCoor = homeCor;
                filling(0, 10, 370, 250, 0, 250, color)
                filling4(0, 250, 220, 250, 220, 460, 0, 460, color)
                break;
            default:
                uploadCoor = circleCor;
                filling2(0, 400, 390, color)
                break;
        }
    }

    useEffect(() => {
        ctx = document.getElementById("canvasR")
        context = ctx.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, ctx.width, ctx.height);
        shapesSelected('Ivory')
        fileUpload()
        quantityPixelsArea();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (fillPercentage > 90) {
            context.clearRect(0, 0, ctx.width, ctx.height);
            let color = props.color;
            shapesSelected(color);
            viewDrawing();
            props.setDoneRight(true);
        }
    }
    //check limits - flag
    // const indexCheck = (x, y) => {
    //     const { data } = context.getImageData(x, y, 1, 1);
    //     if (data[2] === 240) {
    //         flag = true;
    //     }
    //     else {
    //         flag = false;
    //     }
    // }

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

    // const ballons = () => {
    //     // BALOONSSSS Animation
    //     const bdayBallons = (function () {
    //         const density = 1; // concurrent balloon count
    //         const colors = ['yellow', 'green', 'blue', 'red'];

    //         const stringElement = document.createElement("div");
    //         stringElement.classList.add("string");

    //         for (let i = 0; i < density; i++) {
    //             const element = document.createElement("div");
    //             element.classList.add("balloon");
    //             element.classList.add(randomColor());

    //             element.append(stringElement.cloneNode());
    //             document.body.append(element);

    //             setTimeout(() => {
    //                 releaseBalloon(element);
    //             }, (i * 2000) + random(500, 1000));
    //         }

    //         function randomColor() {
    //             return colors[random(0, colors.length)];
    //         }

    //         function random(min, max) {
    //             return Math.floor(Math.random() * (max - min)) + min;
    //         }

    //         function releaseBalloon(balloon) {
    //             const delay = random(100, 1000);
    //             const x = random(-99, -30); // random x value to fly
    //             const y = random(-99, -30); // random y value to fly

    //             const sequence = [{
    //                 offset: 0,
    //                 transform: `rotateZ(45deg) translate(0, 0)`
    //             }];

    //             // random fly direction
    //             if (random(0, 2) === 0) {
    //                 // first fly up to top left

    //                 // left distance to keep balloon in view
    //                 balloon.style.left = `${-1 * x}vw`;

    //                 sequence.push({
    //                     offset: x / -200,
    //                     transform: `rotateZ(45deg) translate(${x}vw, 0)`
    //                 });
    //                 sequence.push({
    //                     offset: (x + y) / -200,
    //                     transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
    //                 });
    //                 sequence.push({
    //                     offset: (-100 + y) / -200,
    //                     transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`
    //                 });
    //             } else {
    //                 // fist fly up to right top

    //                 sequence.push({
    //                     offset: y / -200,
    //                     transform: `rotateZ(45deg) translate(0, ${y}vh)`
    //                 });
    //                 sequence.push({
    //                     offset: (x + y) / -200,
    //                     transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
    //                 });
    //                 sequence.push({
    //                     offset: (-100 + x) / -200,
    //                     transform: `rotateZ(45deg) translate(${x}vw, -100vh)`
    //                 });
    //             }

    //             // last move is common
    //             sequence.push({
    //                 offset: 1,
    //                 transform: `rotateZ(45deg) translate(-100vw, -100vh)`
    //             });

    //             const balloonAnimation = balloon.animate(sequence, {
    //                 duration: 15000,
    //                 delay: delay
    //             });


    //             balloonAnimation.onfinish = () => { releaseBalloon(balloon) }
    //         }
    //     })();
    // }

    const handleWidth = (value) => {
        line = value;
    }

    let button = document.getElementsByClassName("width");

    let addSelectClass = function () {
        removeSelectClass();
        this.classList.add('selected');
    }

    let removeSelectClass = function () {
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('selected')
        }
    }

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", addSelectClass);
    }

    const pointerUpR = () => {
        timeTakenR = Date.now() - down;
        props.handleSecondsR(timeTakenR)
    }

    return (
        <React.Fragment>
            <div className='container'>
                <canvas id="canvasR" width="620" height="470" penwidth='30' onPointerUp={pointerUpR}></canvas>
                <div id='content'>
                    <div id="myDiv">
                        <div>{`${JSON.parse(localStorage.getItem('secondKide')).name}`}</div>
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt={'left'}
                            src={`${process.env.REACT_APP_ASSET_URL}/${JSON.parse(localStorage.getItem('secondKide')).image}`}
                        />
                    </div>
                    <progress id='progress' value={props.cchange2} max="10"></progress>
                    <img src='https://i.postimg.cc/qRZpdjRL/Breadcrumbs-28.png' alt="turtel" id='turtel' />
                    <img src='https://i.postimg.cc/pyMb27tD/Breadcrumbs-27.png' alt="bunny" id='bunny' />
                    {/* <input type="range" min="4" max="20" id="lineWidthR" name='lineWidthR' step="8" /> */}
                    <div className='lineWidthR'>
                        <button type='button' className='width lineWidthR20' id='oneR' value={20} onClick={(() => handleWidth(20))}></button>
                        <button type='button' className='width selected lineWidthR12' id='twoR' value={12} onClick={(() => handleWidth(12))}></button>
                        <button type='button' className='width lineWidthR4' id='threeR' value={4} onClick={(() => handleWidth(4))}></button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
};

export default RightCanvas;