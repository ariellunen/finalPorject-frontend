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

let canvas;
let down;
let timeTakenL = 0;
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
            // צריך לשמור בשרת את טיימטייק - זה יהיה ניתוח שלא בזמן אמת;
            props.setLeft({ x: -1, y: -1 })
            if (state.mousedown) {
                canvas.shadowColor = shadowColor;
                canvas.shadowBlur = shadowBlur;
                canvas.fillStyle = 'red'
                canvas.stroke();
            }
            state.mousedown = false;
            document.getElementById("SeveralChanges1").innerHTML = 0;
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

    const onSubmit = () => {
        console.log("wefgh");
    }
    return (
        <React.Fragment>
            <canvas id="canvasL" width="800" height="800"></canvas>
        </React.Fragment>
    )
};

export default LeftCanvas;



