// import React, {useEffect} from 'react';
// import interact from 'interactjs';
// import './Canvas.css';

// const LeftCanvas = (props) => {
//     let pixelSize = 5;
//     useEffect(() => {
//         interact('#canvasL')
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
//                         props.setLeft({x:posx, y:posy})
//                         props.handleCoordinate(posx, posy);
//                     }
//                 }
//             })

//         function resizeCanvases() {
//             [].forEach.call(document.querySelectorAll('#canvasL'), function (
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
//         interact(window).on('resize', resizeCanvases)
//     }, [])
//     return (
//         <React.Fragment></React.Fragment>
//     )
// };

// export default LeftCanvas;


import React, { useEffect } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import mytext from "./test.js"


let canvas;
let down;
let timeTakenL = 0;
let ctx;
const LeftCanvas = (props) => {
    const lineWidth = 20;
    const shadowColor = '#333';
    const shadowBlur = lineWidth / 4;

    const state = {
        mousedown: false
    };

    useEffect(() => {
        // on pointer down
        interact('#canvasL').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = props.color.color;
            canvas.shadowColor = null;
            canvas.shadowBlur = null;
        })

        interact('#canvasL').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenL = Date.now() - down;
            props.secondsL.push(timeTakenL / 1000);
            // צריך לשמור בשרת את סקנד - זה יהיה ניתוח שלא בזמן אמת;
            props.setLeft({ x: -1, y: -1 })
            if (state.mousedown) {
                canvas.shadowColor = shadowColor;
                canvas.shadowBlur = shadowBlur;
                canvas.fillStyle = 'red'
                canvas.stroke();
            }
            state.mousedown = false;
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
                        canvas.fillStyle = 'red'
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setLeft({ x: event.clientX, y: event.clientY });
                        props.handleCoordinate(event.clientX, event.clientY);
                    }
                }
            })
        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasL'), function (
                canvas
            ) {
                delete canvas.width
                delete canvas.height
                let rect = canvas.getBoundingClientRect()
                canvas.width = rect.width
                canvas.height = rect.height
            })
        }
        resizeCanvases()
        // interact(window).on('resize', resizeCanvases)


    }, [])

    useEffect(() => {
        ctx = document.getElementById("canvasL").getContext('2d');
        fileUpload()
    }, []);
    ///////////////////////////////////////////////

    let coordinates = [];
    const dda = (x0, y0, x1, y1) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    };

    // MyCircle()
    const circle = (x1, y1, r) => {
        console.log("4");
        let x = 0
        let y = r
        let p = 3 - 2 * x
        ctx.beginPath();
        ctx.arc(x1, y1, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // // myBezuerCurve
    const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.stroke();
    }

    const fileUpload = () => {
        if (mytext) {
            coordinates = []
            const lines = mytext.split('\n')
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

    //Upload all the drawing by coordinates
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
    ///////////////////////////////////////////////

    return (
        <React.Fragment>
            <canvas id="canvasL" width="800" height="800"></canvas>
        </React.Fragment>
    )
};
export default LeftCanvas;