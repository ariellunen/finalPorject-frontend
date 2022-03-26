import React, { useState, useEffect, useRef } from 'react';

const Analysis = (props) => {
    let drawing;
    const ctxRightRef = useRef(null);
    const ctxLeftRef = useRef(null);
    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                drawing = responseData.drawing[15];
                console.log(drawing)
            } catch (err) {
                console.log(err);
            }
        }
        getDraw();
        const canvas = document.getElementById('rightCanvas');
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctxRightRef.current = ctx;

        const canvasLeft = document.getElementById('leftCanvas');
        const ctxx = canvasLeft.getContext("2d");
        ctxx.lineWidth = 12;
        ctxx.lineCap = "round";
        ctxx.lineJoin = "round";
        ctxLeftRef.current = ctxx;
    }, [])

    const startDraw = () => {
        drawing.coordinate.map((cor, i) => {
            setTimeout(() => {
                // RIGHT
                if (cor.r.x === -1) {
                    return;
                }
                else {
                    if (drawing.coordinate[i + 1].r.x === -1) {
                        ctxRightRef.current.closePath();
                    }
                    else {
                        ctxRightRef.current.beginPath();
                        ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                        ctxRightRef.current.lineTo(drawing.coordinate[i + 1].r.x, drawing.coordinate[i + 1].r.y);
                        ctxRightRef.current.stroke();
                    }

                }
            }, 2000)
        })
    }

    const drawLeft = () => {
        drawing.coordinate.map((cor, i) => {
            setTimeout(() => {
                // LEFT
                if (cor.l.x === -1) {
                    return;
                }
                else {
                    if (drawing.coordinate[i + 1].l.x === -1) {
                        ctxLeftRef.current.closePath();
                    }
                    else {
                        ctxLeftRef.current.beginPath();
                        ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                        ctxLeftRef.current.lineTo(drawing.coordinate[i + 1].l.x, drawing.coordinate[i + 1].l.y);
                        ctxLeftRef.current.stroke();
                    }

                }
                console.log(cor, i)
            }, 2000)
        })
    }

    return (
        <React.Fragment>
            <button onClick={() => {
                startDraw();
                drawLeft();
            }}>play</button>
            <div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                <canvas
                    id='leftCanvas'
                    width={`650px`}
                    height={`600px`}
                />
                <canvas
                    id='rightCanvas'
                    width={`650px`}
                    height={`600px`}
                />
            </div>
        </React.Fragment>
    )
};

export default Analysis;
