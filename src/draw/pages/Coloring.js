import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
let moment = require('moment-timezone');

let counter = 0;
let arr = [];

let m1 = [], m2 = [];
let allLeftCoordinates = [];
let allRightCoordinates = [];
let leftCoordinates = [];
let rightCoordinates = [];
let pointM1 = 0;
let pointM2 = 0;
let pointL = 0;
let pointR = 0;
let counterL = 0;
let counterR = 0;
let tempL = 0;
let tempR = 0;
let change1 = 0;
let change2 = 0;


const Coloring = (props) => {
    const [startedTime, setStartedTime] = useState(moment().tz("Asia/Jerusalem").format());
    useEffect(() => {
        // setStartedTime(new Date());
        clearTimer(getDeadTime());
        frequencyL();
        frequencyR();
    }, []);

    const location = useLocation();

    const [left, setLeft] = useState({ x: -1, y: -1 })
    const [right, setRight] = useState({ y: -1, x: -1 })

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        // console.log('arr', arr)
        counter++;
    }, [left, right])

    const handleLeftCoordinate = (x, y) => {
        allLeftCoordinates.push({ x, y });
        console.log("left", allLeftCoordinates);
    }

    const handleRightCoordinate = (x, y) => {
        allRightCoordinates.push({ x, y });
        // console.log("right", allRightCoordinates);
    }

    ////////////////////ALGORITEM SYNC/////////////////////

    const frequencyL = () => {
        setTimeout(function () {
            if (allLeftCoordinates[pointL + 1]?.x) {
                for (let i = 0; i < 10; i++, pointL++) {
                    if (allLeftCoordinates[pointL]?.x) {
                        counterL++;
                        // console.log("X");
                        if (i === 9) {
                            // console.log("pointL", pointL);
                            leftCoordinates = allLeftCoordinates.slice(pointL - 9, pointL + 1)
                            // console.log("leftCoordinates = ", leftCoordinates);
                            // console.log("arr = ", arr);
                        }
                    }
                }
                if (counterL % 10 === 0) {
                    for (let indexL = 0; indexL < 9; indexL++) {
                        if (leftCoordinates[indexL]?.x !== (-1) && leftCoordinates[indexL + 1]?.x !== (-1)) {
                            if ((Math.abs(leftCoordinates[indexL]?.x - leftCoordinates[indexL + 1]?.x)) < 6) {
                                if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                                    // console.log("A1 - 0");
                                    m1.push(0);
                                }
                                else if (leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y) {
                                    // console.log("A2 - 1");
                                    m1.push(1);
                                }
                                else { //((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 6 )
                                    // console.log("A3 - ?");
                                    // console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                                    tempL = m1[m1.length - 1];
                                    m1.push(tempL);
                                }
                            }
                            else if (leftCoordinates[indexL]?.x < leftCoordinates[indexL + 1]?.x) {
                                if ((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 6) {
                                    // console.log("B1 - ?");
                                    // console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                                    tempL = m1[m1.length - 1];
                                    m1.push(tempL);
                                }
                                else if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                                    // console.log("B2 - 0");
                                    m1.push(0);
                                }
                                else { //(leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y)
                                    // console.log("B3 - 1");
                                    m1.push(1);
                                }
                            }
                            else { // (leftCoordinates[indexL]?.x > leftCoordinates[indexL + 1]?.x)
                                if ((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 6) {
                                    // console.log("C1 - ?");
                                    // console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                                    tempL = m1[m1.length - 1];
                                    m1.push(tempL);
                                }
                                else if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                                    // console.log("C2 - 0");
                                    m1.push(0);
                                }
                                else { //(leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y)
                                    // console.log("C3 - 1");
                                    m1.push(1);
                                }
                            }
                            console.log("m1 = ", m1);
                            if (m1.length >= 2) {
                                for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                                    //View changes on the left screen
                                    if (m1[pointM1] !== m1[pointM1 + 1]) {
                                        change1++;
                                    }
                                    document.getElementById("SeveralChanges1").innerHTML = change1 / 10;
                                }
                            }
                        }
                    }
                }
            }
            frequencyL();
        }, 1000)
    }

    //Right side frequency algorithem
    const frequencyR = () => {
        setTimeout(function () {
            if (allRightCoordinates[pointR + 1]?.x) {
                for (let i = 0; i < 10; i++, pointR++) {
                    if (allRightCoordinates[pointR]?.x) {
                        counterR++;
                        // console.log("X");
                        if (i === 9) {
                            // console.log("pointR", pointR);
                            // rightCoordinates.push(allRightCoordinates[pointR])
                            rightCoordinates = allRightCoordinates.slice(pointR - 9, pointR + 1)
                            // console.log("rightCoordinates = ", rightCoordinates);
                            // console.log("allRightCoordinates = ", allRightCoordinates);
                        }
                    }
                }
                if (counterR % 10 === 0) {
                    for (let indexR = 0; indexR < 9; indexR++) {
                        if (rightCoordinates[indexR]?.x !== (-1) && rightCoordinates[indexR + 1]?.x !== (-1)) {
                            if ((Math.abs(rightCoordinates[indexR]?.x - rightCoordinates[indexR + 1]?.x)) < 6) {
                                if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                                    // console.log("A1 - 0");
                                    m2.push(0);
                                }
                                else if (rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y) {
                                    // console.log("A2 - 1");
                                    m2.push(1);
                                }
                                else { //((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 6)
                                    // console.log("A3 - ?");
                                    // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                                    tempR = m2[m2.length - 1];
                                    m2.push(tempR);
                                }
                            }
                            else if (rightCoordinates[indexR]?.x < rightCoordinates[indexR + 1]?.x) {
                                if ((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 6) {
                                    // console.log("B1 - ?");
                                    // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                                    tempR = m2[m2.length - 1];
                                    m2.push(tempR);
                                }
                                else if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                                    // console.log("B2 - 0");
                                    m2.push(0);
                                }
                                //(rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y)
                                else {
                                    // console.log("B3 - 1");
                                    m2.push(1);
                                }
                            }
                            // (rightCoordinates[indexR]?.x > rightCoordinates[indexR + 1]?.x)
                            else {
                                if ((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 6) {
                                    // console.log("C1 - ?");
                                    // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                                    tempR = m2[m2.length - 1];
                                    m2.push(tempR);
                                }
                                else if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                                    // console.log("C2 - 0");
                                    m2.push(0);
                                }
                                //(rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y)
                                else {
                                    // console.log("C3 - 1");
                                    m2.push(1);
                                }
                            }
                            console.log("m2 = ", m2);
                            if (m2.length >= 2) {
                                for (pointM2; pointM2 < m2.length - 1; pointM2++) {
                                    //View changes on the left screen
                                    if (m2[pointM2] !== m2[pointM2 + 1]) {
                                        change2++;
                                    }
                                    document.getElementById("SeveralChanges2").innerHTML = change2 / 10;
                                }
                            }
                        }
                    }
                }
            }
            frequencyR();
        }, 1000)
    }

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
        console.log(location.state[0])
        console.log(location.state[1])
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
                        sync: '10',
                        coordinate: arr,
                        colorFirst: location.state[0].color,
                        colorSecond: location.state[1].color
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
                <div>
                    <p id="b"></p>
                </div>
                <div id="canvasGrid">
                    <p id="SeveralChanges1"></p>
                    <canvas id="canvasL" width="650" height="600"
                        onPointerUp={() => {
                            setLeft({ x: -1, y: -1 })
                        }}
                    >
                        <LeftCanvas handleCoordinate={handleLeftCoordinate} color={location.state[0]} setLeft={setLeft} />
                    </canvas>
                    <canvas id="canvasR" width="650" height="600"
                        onPointerUp={() => {
                            setRight({ x: -1, y: -1 })
                        }}
                    >
                        <RightCanvas handleCoordinate={handleRightCoordinate} color={location.state[1]} setRight={setRight} />
                    </canvas>
                    <p id="SeveralChanges2"></p>
                </div>
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            </div>
        </React.Fragment>
    )
};

export default Coloring;