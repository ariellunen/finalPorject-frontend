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

import React, { useEffect } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleR"
import triangularCor from "../shape/TriangularR"
import heartCor from "../shape/HeartR"

let canvas;
let down;
let timeTakenR = 0;
let ctx;
const RightCanvas = (props) => {
    const lineWidth = 20;
    const shadowColor = '#333';
    const shadowBlur = lineWidth / 4;

    const state = {
        mousedown: false
    };

    useEffect(() => {
        // on pointer down
        interact('#canvasR').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = props.color.color;
            canvas.shadowColor = null;
            canvas.shadowBlur = null;
            props.setMouseR(false);
        })

        interact('#canvasR').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenR = Date.now() - down;
            props.secondsR.push(timeTakenR / 1000);
            props.setRight({ x: -1, y: -1 })
            props.setMouseR(true);
            if (state.mousedown) {
                canvas.shadowColor = shadowColor;
                canvas.shadowBlur = shadowBlur;
                canvas.stroke();
            }
            state.mousedown = false;
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
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setRight({ x: event.clientX, y: event.clientY });
                        props.handleCoordinate(event.clientX, event.clientY);
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
    }, [])

    useEffect(() => {
        ctx = document.getElementById("canvasR").getContext('2d');
        fileUpload()
    }, []);

    //Upload the drawing
    let coordinates = [];
    const dda = (x0, y0, x1, y1) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    };

    const circle = (x1, y1, r) => {
        let x = 0
        let y = r
        let p = 3 - 2 * x
        ctx.beginPath();
        ctx.arc(x1, y1, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.stroke();
    }

    const fileUpload = () => {
        if (heartCor) {
            coordinates = []
            const lines = heartCor.split('\n')
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
        console.log(coordinates);
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
            <canvas id="canvasR" width="800" height="800"></canvas>
        </React.Fragment>
    )
};

export default RightCanvas;