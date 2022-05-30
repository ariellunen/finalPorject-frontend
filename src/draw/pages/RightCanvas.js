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
import './Ballons.css';

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
let selectedShape;

const RightCanvas = (props) => {
    selectedShape = sessionStorage.getItem("selectedShape");
    useEffect(() => {
        ctx = document.getElementById("canvasR")
        context = ctx.getContext('2d');
        line = document.getElementById("lineWidthR").value;
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
                        // if (x > 0 && x < 800 && y > 0 && y < 800) {
                        //     indexCheck(x, y);
                        // }
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
            })
        }
        resizeCanvases()
    }, [props.cchange2, props.cchange1])

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
            props.setDoneRight(true);
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

    const ballons = () => {
        // BALOONSSSS Animation
        const bdayBallons = (function () {
            const density = 1; // concurrent balloon count
            const balloons = [];
            const colors = ['yellow', 'green', 'blue', 'red'];

            const stringElement = document.createElement("div");
            stringElement.classList.add("string");

            for (let i = 0; i < density; i++) {
                const element = document.createElement("div");
                element.classList.add("balloon");
                element.classList.add(randomColor());

                element.append(stringElement.cloneNode());
                document.body.append(element);

                setTimeout(() => {
                    releaseBalloon(element);
                }, (i * 2000) + random(500, 1000));
            }

            function randomColor() {
                return colors[random(0, colors.length)];
            }

            function random(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }

            function releaseBalloon(balloon) {
                const delay = random(100, 1000);
                const x = random(-99, -30); // random x value to fly
                const y = random(-99, -30); // random y value to fly

                const sequence = [{
                    offset: 0,
                    transform: `rotateZ(45deg) translate(0, 0)`
                }];

                // random fly direction
                if (random(0, 2) === 0) {
                    // first fly up to top left

                    // left distance to keep balloon in view
                    balloon.style.left = `${-1 * x}vw`;

                    sequence.push({
                        offset: x / -200,
                        transform: `rotateZ(45deg) translate(${x}vw, 0)`
                    });
                    sequence.push({
                        offset: (x + y) / -200,
                        transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
                    });
                    sequence.push({
                        offset: (-100 + y) / -200,
                        transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`
                    });
                } else {
                    // fist fly up to right top

                    sequence.push({
                        offset: y / -200,
                        transform: `rotateZ(45deg) translate(0, ${y}vh)`
                    });
                    sequence.push({
                        offset: (x + y) / -200,
                        transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
                    });
                    sequence.push({
                        offset: (-100 + x) / -200,
                        transform: `rotateZ(45deg) translate(${x}vw, -100vh)`
                    });
                }

                // last move is common
                sequence.push({
                    offset: 1,
                    transform: `rotateZ(45deg) translate(-100vw, -100vh)`
                });

                const balloonAnimation = balloon.animate(sequence, {
                    duration: 15000,
                    delay: delay
                });


                balloonAnimation.onfinish = () => { releaseBalloon(balloon) }
            }
        })();
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