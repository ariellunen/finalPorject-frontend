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
                drawing = responseData.drawing[18];
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

    let i = 0;
    const handleClick = () => {
        setTimeout(function () {
            if (i < drawing.coordinate.length) {
                draw(drawing.coordinate[i], i);
                i++;
                handleClick();
            }
        }, 100)

    }

    const draw = (cor, i) => {
        // both -1
        if (cor.r.x === -1 && cor.l.x === -1) {
            return;
        }
        else if (cor.r.x === -1 && cor.l.x !== -1) {
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
        else if (cor.r.x !== -1 && cor.l.x === -1) {
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
        // cor.r.x !== -1 && cor.l.x !== -1
        else {
            if (drawing.coordinate[i + 1].r.x === -1 && drawing.coordinate[i + 1].l.x === -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.closePath();
            }
            else if (drawing.coordinate[i + 1].r.x !== -1 && drawing.coordinate[i + 1].l.x === -1) {
                ctxLeftRef.current.closePath();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(drawing.coordinate[i + 1].r.x, drawing.coordinate[i + 1].r.y);
                ctxRightRef.current.stroke();
            }
            else if (drawing.coordinate[i + 1].r.x === -1 && drawing.coordinate[i + 1].l.x !== -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(drawing.coordinate[i + 1].l.x, drawing.coordinate[i + 1].l.y);
                ctxLeftRef.current.stroke();
            }
            else {
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(drawing.coordinate[i + 1].l.x, drawing.coordinate[i + 1].l.y);
                ctxLeftRef.current.stroke();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(drawing.coordinate[i + 1].r.x, drawing.coordinate[i + 1].r.y);
                ctxRightRef.current.stroke();
            }
        }
    }

    return (
        <React.Fragment>
            <button onClick={() => {
                handleClick();
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
