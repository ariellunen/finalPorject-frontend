import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Recovery = (props) => {
    const ctxRightRef = useRef(null);
    const ctxLeftRef = useRef(null);

    useEffect(() => {

        const canvas = document.getElementById('rightCanvas');
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 12;
        ctx.strokeStyle = props.draw.colorSecond;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctxRightRef.current = ctx;

        const canvasLeft = document.getElementById('leftCanvas');
        const ctxx = canvasLeft.getContext("2d");
        ctxx.lineWidth = 12;
        ctxx.strokeStyle = props.draw.colorFirst;
        ctxx.lineCap = "round";
        ctxx.lineJoin = "round";
        ctxLeftRef.current = ctxx;


    }, [])

    let i = 0;
    const handleClick = () => {
        setTimeout(function () {
            if (i < props.draw.coordinate.length) {
                draw(props.draw.coordinate[i], i);
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
            if (props.draw.coordinate[i + 1].l.x === -1) {
                ctxLeftRef.current.closePath();
            }
            else {
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(props.draw.coordinate[i + 1].l.x, props.draw.coordinate[i + 1].l.y);
                ctxLeftRef.current.stroke();
            }
        }
        else if (cor.r.x !== -1 && cor.l.x === -1) {
            if (props.draw.coordinate[i + 1].r.x === -1) {
                ctxRightRef.current.closePath();
            }
            else {
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(props.draw.coordinate[i + 1].r.x, props.draw.coordinate[i + 1].r.y);
                ctxRightRef.current.stroke();
            }
        }
        // cor.r.x !== -1 && cor.l.x !== -1
        else {
            if (props.draw.coordinate[i + 1].r.x === -1 && props.draw.coordinate[i + 1].l.x === -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.closePath();
            }
            else if (props.draw.coordinate[i + 1].r.x !== -1 && props.draw.coordinate[i + 1].l.x === -1) {
                ctxLeftRef.current.closePath();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(props.draw.coordinate[i + 1].r.x, props.draw.coordinate[i + 1].r.y);
                ctxRightRef.current.stroke();
            }
            else if (props.draw.coordinate[i + 1].r.x === -1 && props.draw.coordinate[i + 1].l.x !== -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(props.draw.coordinate[i + 1].l.x, props.draw.coordinate[i + 1].l.y);
                ctxLeftRef.current.stroke();
            }
            else {
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(props.draw.coordinate[i + 1].l.x, props.draw.coordinate[i + 1].l.y);
                ctxLeftRef.current.stroke();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(props.draw.coordinate[i + 1].r.x, props.draw.coordinate[i + 1].r.y);
                ctxRightRef.current.stroke();
            }
        }
    }
    return (
        <Box sx={style}>

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
            <Button variant="outlined" onClick={handleClick}>התחל</Button>
        </Box>
    )
}

export default Recovery;