import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import circleCorL from "../../draw/shape/CircleL";
import triangularCorL from "../../draw/shape/TriangularL"
import heartCorL from "../../draw/shape/HeartL"
import davidCorL from "../../draw/shape/DavidL"
import homeCorL from "../../draw/shape/HomeL"

import circleCorR from "../../draw/shape/CircleR";
import triangularCorR from "../../draw/shape/TriangularR"
import heartCorR from "../../draw/shape/HeartR"
import davidCorR from "../../draw/shape/DavidR"
import homeCorR from "../../draw/shape/HomeR"

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

let drawData;
let uploadCoorL;
let uploadCoorR;
let ctx;
let ctxx;
let speed;
const Recovery = (props) => {
    const ctxRightRef = useRef(null);
    const ctxLeftRef = useRef(null);

    useEffect(() => {
        drawData = props.storedData;
        const canvas = document.getElementById('rightCanvas');
        ctx = canvas.getContext("2d");
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctxRightRef.current = ctx;

        const canvasLeft = document.getElementById('leftCanvas');
        ctxx = canvasLeft.getContext("2d");
        ctxx.lineWidth = 12;
        ctxx.lineCap = "round";
        ctxx.lineJoin = "round";
        ctxLeftRef.current = ctxx;
        speed = 100;

        switch (drawData.shape) {
            case 'circle':
                uploadCoorL = circleCorL;
                uploadCoorR = circleCorR;
                break;
            case 'triangular':
                uploadCoorL = triangularCorL;
                uploadCoorR = triangularCorR;
                break;
            case 'heart':
                uploadCoorL = heartCorL;
                uploadCoorR = heartCorR;
                break;
            case 'david':
                uploadCoorL = davidCorL;
                uploadCoorR = davidCorR;
                break;
            case 'home':
                uploadCoorL = homeCorL;
                uploadCoorR = homeCorR;
                break;
        }
        fileUpload();
        handleClick();
    }, [])

    const speedChange05 = () => { speed = 300; }
    const speedChange1 = () => { speed = 100; }
    const speedChange125 = () => { speed = 10; }
    const speedChange15 = () => { speed = 1; }

    let i = 0;
    const handleClick = () => {
        setTimeout(function () {
            if (i < drawData.coordinate.length) {
                draw(drawData.coordinate[i], i);
                i++;
                handleClick();
            }
        }, speed)

    }

    const draw = (cor, i) => {
        // both -1
        if (cor.r.x === -1 && cor.l.x === -1) {
            return;
        }
        else if (cor.r.x === -1 && cor.l.x !== -1) {
            if (drawData.coordinate[i + 1].l.x === -1) {
                ctxLeftRef.current.closePath();
            }
            else {
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(drawData.coordinate[i + 1].l.x, drawData.coordinate[i + 1].l.y);
                ctxLeftRef.current.strokeStyle = cor.l.color;
                ctxLeftRef.current.lineWidth = cor.l.line;
                ctxLeftRef.current.stroke();
            }
        }
        else if (cor.r.x !== -1 && cor.l.x === -1) {
            if (drawData.coordinate[i + 1].r.x === -1) {
                ctxRightRef.current.closePath();
            }
            else {
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(drawData.coordinate[i + 1].r.x, drawData.coordinate[i + 1].r.y);
                ctxRightRef.current.strokeStyle = cor.r.color;
                ctxRightRef.current.lineWidth = cor.r.line;
                ctxRightRef.current.stroke();
            }
        }
        // cor.r.x !== -1 && cor.l.x !== -1
        else {
            if (drawData.coordinate[i + 1].r.x === -1 && drawData.coordinate[i + 1].l.x === -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.closePath();
            }
            else if (drawData.coordinate[i + 1].r.x !== -1 && drawData.coordinate[i + 1].l.x === -1) {
                ctxLeftRef.current.closePath();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(drawData.coordinate[i + 1].r.x, drawData.coordinate[i + 1].r.y);
                ctxRightRef.current.strokeStyle = cor.r.color;
                ctxRightRef.current.lineWidth = cor.r.line;
                ctxRightRef.current.stroke();
            }
            else if (drawData.coordinate[i + 1].r.x === -1 && drawData.coordinate[i + 1].l.x !== -1) {
                ctxRightRef.current.closePath();
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(drawData.coordinate[i + 1].l.x, drawData.coordinate[i + 1].l.y);
                ctxLeftRef.current.strokeStyle = cor.l.color;
                ctxLeftRef.current.lineWidth = cor.l.line;
                ctxLeftRef.current.stroke();
            }
            else {
                ctxLeftRef.current.beginPath();
                ctxLeftRef.current.moveTo(cor.l.x, cor.l.y);
                ctxLeftRef.current.lineTo(drawData.coordinate[i + 1].l.x, drawData.coordinate[i + 1].l.y);
                ctxLeftRef.current.strokeStyle = cor.l.color;
                ctxLeftRef.current.lineWidth = cor.l.line;
                ctxLeftRef.current.stroke();
                ctxRightRef.current.beginPath();
                ctxRightRef.current.moveTo(cor.r.x, cor.r.y);
                ctxRightRef.current.lineTo(drawData.coordinate[i + 1].r.x, drawData.coordinate[i + 1].r.y);
                ctxRightRef.current.strokeStyle = cor.r.color;
                ctxRightRef.current.lineWidth = cor.r.line;
                ctxRightRef.current.stroke();
            }
        }
    }

    let coordinatesL = [];
    let coordinatesR = [];
    const fileUpload = () => {
        if (uploadCoorL && coordinatesR) {
            coordinatesL = []
            coordinatesR = []
            const linesL = uploadCoorL.split('\n')
            const linesR = uploadCoorR.split('\n')
            for (let i = 0; i < linesL.length; i++) {
                const values = linesL[i].split(',')
                coordinatesL.push([])
                for (let j = 0; j < values.length; j++) {
                    coordinatesL[i].push(parseInt(values[j]))
                }
            }
            for (let i = 0; i < linesR.length; i++) {
                const values = linesR[i].split(',')
                coordinatesR.push([])
                for (let j = 0; j < values.length; j++) {
                    coordinatesR[i].push(parseInt(values[j]))
                }
            }
            viewDrawing()
        }
    }

    const viewDrawing = () => {
        // console.log(coordinatesL);
        for (let i = 0; i < coordinatesL.length; i++) {
            if (coordinatesL[i].length === 3) {
                circleL(coordinatesL[i][0], coordinatesL[i][1], coordinatesL[i][2])
            } else if (coordinatesL[i].length === 4) {
                ddaL(coordinatesL[i][0], coordinatesL[i][1],
                    coordinatesL[i][2], coordinatesL[i][3])
            } else if (coordinatesL[i].length === 8) {
                bezierCurveL(coordinatesL[i][0], coordinatesL[i][1], coordinatesL[i][2],
                    coordinatesL[i][3], coordinatesL[i][4], coordinatesL[i][5],
                    coordinatesL[i][6], coordinatesL[i][7])
            }
        }
        for (let i = 0; i < coordinatesR.length; i++) {
            if (coordinatesR[i].length === 3) {
                circleR(coordinatesR[i][0], coordinatesR[i][1], coordinatesR[i][2])
            } else if (coordinatesR[i].length === 4) {
                ddaR(coordinatesR[i][0], coordinatesR[i][1],
                    coordinatesR[i][2], coordinatesR[i][3])
            } else if (coordinatesR[i].length === 8) {
                bezierCurveR(coordinatesR[i][0], coordinatesR[i][1], coordinatesR[i][2],
                    coordinatesR[i][3], coordinatesR[i][4], coordinatesR[i][5],
                    coordinatesR[i][6], coordinatesR[i][7])
            }
        }
    }

    const ddaL = (x0, y0, x1, y1) => {
        ctxx.beginPath();
        ctxx.moveTo(x0, y0);
        ctxx.lineTo(x1, y1);
        ctxx.lineWidth = 10;
        ctxx.strokeStyle = 'black';
        ctxx.stroke();
    };

    const circleL = (x1, y1, r) => {
        ctxx.beginPath();
        ctxx.arc(x1, y1, r, 0, 2 * Math.PI);
        ctxx.lineWidth = 10;
        ctxx.strokeStyle = 'black';
        ctxx.stroke();
    }

    const bezierCurveL = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        ctxx.beginPath();
        ctxx.moveTo(x0, y0);
        ctxx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctxx.lineWidth = 10;
        ctxx.strokeStyle = 'black';
        ctxx.stroke();
    }

    const ddaR = (x0, y0, x1, y1) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    };

    const circleR = (x1, y1, r) => {
        ctx.beginPath();
        ctx.arc(x1, y1, r, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    const bezierCurveR = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    return (
        <Box sx={style}>
            <div style={{ margin: 0, display: 'flex', justifyContent: 'center' }}>
                <canvas
                    id='leftCanvas'
                    width={`800px`}
                    height={`800px`}
                />
                <canvas
                    id='rightCanvas'
                    width={`800px`}
                    height={`800px`}
                />
            </div>
            {/* <Button variant="outlined" onClick={handleClick}>התחל</Button> */}
            <Button variant="outlined" onClick={speedChange05}>X0.5</Button>
            <Button variant="outlined" onClick={speedChange1}>X0.1</Button>
            <Button variant="outlined" onClick={speedChange125}>X1.25</Button>
            <Button variant="outlined" onClick={speedChange15}>X1.5</Button>

        </Box>
    )
}

export default Recovery;