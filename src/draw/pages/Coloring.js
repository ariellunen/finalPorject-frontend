import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import canvas from './LeftCanvas';
import './Coloring.css';
import './Circle.txt';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import * as fs from 'fs';

let moment = require('moment-timezone');

let counter = 0;
let arr = [];
let leftCoordinates = [];
let rightCoordinates = [];

const Coloring = (props) => {
    // let coordinates = [];
    // let oldCoordinates = [];

    // //DDA algorithem
    // const putPixel = (x, y, color) => {
    //     console.log("6");
    //     canvas.fillStyle = color;
    //     canvas.fillRect(x, y, 1, 1);
    // }

    // const dda = (x0, y0, x1, y1, color) => {
    //     console.log("5");
    //     var range = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    //     let deltaX = (x1 - x0) / range;
    //     let deltaY = (y1 - y0) / range;
    //     let x = x0;
    //     let y = y0;
    //     for (var i = 0; i < range; i++) {
    //         putPixel(x, y, color);
    //         x += deltaX;
    //         y += deltaY;
    //     }
    // };

    // //MyCircle()
    // const circle = (x1, y1, r) => {
    //     console.log(coordinates);
    //     console.log("4");
    //     let x = 0
    //     let y = r
    //     let p = 3 - 2 * x

    //     while (x < y) {
    //         canvas.fillRect(x + x1, y + y1, 1, 1)
    //         canvas.fillRect(y + x1, x + y1, 1, 1)
    //         canvas.fillRect(-x + x1, y + y1, 1, 1)
    //         canvas.fillRect(-y + x1, x + y1, 1, 1)
    //         canvas.fillRect(-x + x1, -y + y1, 1, 1)
    //         canvas.fillRect(-y + x1, -x + y1, 1, 1)
    //         canvas.fillRect(x + x1, -y + y1, 1, 1)
    //         canvas.fillRect(y + x1, -x + y1, 1, 1)

    //         if (p < 0) {
    //             p = p + 4 * x + 6
    //         } else {
    //             p = p + 4 * (x - y) + 10
    //             y--
    //         }
    //         x++
    //     }
    // }

    // //myBezuerCurve
    // const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
    //     console.log("3");
    //     var sX = x0;
    //     var sY = y0;
    //     for (var i = 0; i <= 1; i += 0.01) {

    //         var cX = 3 * (x1 - x0),
    //             bX = 3 * (x2 - x1) - cX,
    //             aX = x3 - x0 - cX - bX;

    //         var cY = 3 * (y1 - y0),
    //             bY = 3 * (y2 - y1) - cY,
    //             aY = y3 - y0 - cY - bY;

    //         var tX = (aX * Math.pow(i, 3)) + (bX * Math.pow(i, 2)) + (cX * i) + x0;
    //         var tY = (aY * Math.pow(i, 3)) + (bY * Math.pow(i, 2)) + (cY * i) + y0;

    //         dda(sX, sY, tX, tY, 'blue')
    //         var sX = tX;
    //         var sY = tY;
    //     }
    //     dda(sX, sY, x3, y3, 'blue')
    // }


    // //Upload all the drawing by coordinates
    // const viewDrawing = () => {
    //     console.log("2");
    //     for (let i = 0; i < coordinates.length; i++) {
    //         if (coordinates[i].length === 3) {
    //             circle(coordinates[i][0], coordinates[i][1], coordinates[i][2])
    //         } else if (coordinates[i].length === 4) {
    //             dda(coordinates[i][0], coordinates[i][1],
    //                 coordinates[i][2], coordinates[i][3], 'red')
    //         } else if (coordinates[i].length === 8) {
    //             bezierCurve(coordinates[i][0], coordinates[i][1], coordinates[i][2],
    //                 coordinates[i][3], coordinates[i][4], coordinates[i][5],
    //                 coordinates[i][6], coordinates[i][7])
    //         }
    //     }
    // }

    // window.onload = () => {
    //     //Import the coordinates from the document
    //     // let document = "Circle.txt";
    //     console.log("1");
    //     fetch('.Circle.txt')
    //         .then(response => response.text())
    //         .then(text => {
    //             coordinates = []
    //             const lines = text.split('\n')
    //             for (let i = 0; i < lines.length; i++) {
    //                 const values = lines[i].split(',')
    //                 console.log(lines.length);
    //                 coordinates.push([])
    //                 oldCoordinates.push([])
    //                 for (let j = 0; j < values.length; j++) {
    //                     coordinates[i].push(parseInt(values[j]))
    //                     oldCoordinates[i].push(parseInt(values[j]))
    //                 }
    //             }
    //             viewDrawing()
    //         });
    // };
    const { fileUpload } = require("./UploadDrawing").default;
    // window.onload = () => {fileUpload()}
    const fs = require('fs')
    window.onload = () => {
            let data = fs.readFileSync('Circle.txt', 'utf8')
console.log(data);        
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [startedTime, setStartedTime] = useState(moment().tz("Asia/Jerusalem").format());
    useEffect(() => {
        // setStartedTime(new Date());
        clearTimer(getDeadTime());
    }, []);

    const location = useLocation();

    const [left, setLeft] = useState({ x: -1, y: -1 })
    const [right, setRight] = useState({ y: -1, x: -1 })
    const { frequencyL, frequencyR } = require("./FrequencyAlgo").default;

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        counter++;
    }, [left, right])

    const handleLeftCoordinate = (x, y) => {
        leftCoordinates.push({ x, y });
    }

    const handleRightCoordinate = (x, y) => {
        rightCoordinates.push({ x, y });
        // frequencyR(rightCoordinates);
    }

    setInterval(frequencyL(leftCoordinates), 1000);

    /////////////////////-20 MINUTES TIMER-//////////////////////////////

    const Ref = useRef(null);
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('00:20:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 1200);
        return deadline;
    }

    let user1;
    let user2;
    const fetchGetAPI = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/', {
            });
            const responseData = await response.json();
            const len = responseData.users.length;
            user2 = responseData.users[len - 2];
            user1 = responseData.users[len - 1];
            console.log(user2, user1)

        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = () => {
        fetchGetAPI();
        const date = new Date();
        console.log(typeof (date))
        if (arr.length !== 1) {
            arr.shift();
        }
        setTimeout(async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstKide: user1,
                        secondKide: user2,
                        timeStarted: startedTime,
                        timeDone: date,
                        sync: '10',
                        coordinate: arr,
                        colorFirst: location.state[1].color,
                        colorSecond: location.state[0].color,
                    })
                });

                const responseData = await response.json();
                console.log(responseData);
            } catch (err) {
                console.log(err);
            }
        }, 2000);
    }

    return (
        <React.Fragment>
            <div className='container'>
                <h1>זמן צביעה</h1>
                <div id='time'>
                    <h2>{timer}</h2>
                </div>
                <div id="canvasGrid">
                    {/* <p id="SeveralChanges1">{cchange1}</p> */}
                    <p id="SeveralChanges1">0</p>
                    <LeftCanvas
                        handleCoordinate={handleLeftCoordinate}
                        color={location.state[0]}
                        setLeft={setLeft}
                    />
                    <RightCanvas
                        handleCoordinate={handleRightCoordinate}
                        color={location.state[1]}
                        setRight={setRight}
                    />
                    {/* <p id="SeveralChanges2">{cchange2}</p> */}
                    <p id="SeveralChanges2">0</p>
                </div>
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            </div>
        </React.Fragment>
    )
};

export default Coloring;