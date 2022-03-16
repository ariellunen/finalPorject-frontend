import React, {useEffect} from 'react';
import interact from 'interactjs';
import './Canvas.css';

const LeftCanvas = (props) => {
    let pixelSize = 5;
    useEffect(() => {
        interact('#canvas')
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
            })

        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvas'), function (
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
        interact(window).on('resize', resizeCanvases)
    }, [])
    return (
        <React.Fragment></React.Fragment>
    )
};

export default LeftCanvas;