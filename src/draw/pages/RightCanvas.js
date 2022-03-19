import React, {useEffect} from 'react';
import interact from 'interactjs';
import './Canvas.css';

const RightCanvas = (props) => {
    let pixelSize = 5
    useEffect(() => {
        interact('#canvasR')
            .draggable({
                max: Infinity,
                origin: 'self',
                modifiers: [
                    interact.modifiers.snap({
                        targets: [
                            interact.snappers.grid({ x: pixelSize, y: pixelSize })
                        ]
                    })
                ],
                listeners: {
                    move: function (event) {
                        let context = event.target.getContext('2d')
                        let posx = event.clientX; 
                        let posy = event.clientY;
                        context.fillStyle = props.color.color;
                        context.beginPath();
                        context.arc(posx, posy, 8, 0, 2 * Math.PI);
                        context.fill();
                        props.handleCoordinate(posx, posy);
                    }
                }
            })
            .on('doubletap', function (event) {
                let context = event.target.getContext('2d')

                context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                resizeCanvases()
            })

        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasR'), function (
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
    }, [])

    return (
        <React.Fragment></React.Fragment>
    )
};

export default RightCanvas;