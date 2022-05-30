import React, { useState, useEffect, useRef } from 'react';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NavLink from '../../user/components/NavLinks';
import Confetti from "react-confetti";

let moment = require('moment-timezone');
let counter = 0;
let arr = [];
let secondTotal;
let leftCoordinates = [];
let rightCoordinates = [];

let CircularBufferL = require("circular-buffer");
let bufL = new CircularBufferL(80);
let CircularBufferR = require("circular-buffer");
let bufR = new CircularBufferR(80);

let pointM1 = 0;
let pointM2 = 0;
let tempL = 0;
let tempR = 0;
let change1 = 0;
let change2 = 0;
let cchange1 = 0;
let cchange2 = 0;
let m1 = [], m2 = [];

let startTimeL;
let stopTimeL;
let floatL = true;

let startTimeR;
let stopTimeR;
let floatR = true;

let secondsL = [];
let secondsR = [];
let changeL = [];
let changeR = [];

let test = [];
const Coloring = (props) => {
    const [startedTime, setStartedTime] = useState(moment().tz("Asia/Jerusalem").format());
    useEffect(() => {
        // setStartedTime(new Date());
        clearTimer(getDeadTime());
    }, []);

    const [left, setLeft] = useState({ x: -1, y: -1, color: 'LightGrey', line: '20' })
    const [right, setRight] = useState({ y: -1, x: -1, color: 'LightGrey', line: '20' })

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        counter++;
    }, [left, right])

    const handleLeftCoordinate = (x, y, color, line) => {
        leftCoordinates.push({ x, y, color, line });
        bufL.push({ x, y });
        if (bufL.get(0)?.x && floatL) {
            startTimeL = Date.now();
            floatL = false;
        }
        if (leftCoordinates.length % 80 === 0) {
            if (bufL.get(79)?.x && !floatL) {
                stopTimeL = (Date.now() - startTimeL) / 1000;
                floatL = true;
                cchange1 = 0;
                change1 = 0;
                frequencyL(stopTimeL);
            }
        };
    }

    const handleRightCoordinate = (x, y, color, line) => {
        rightCoordinates.push({ x, y, color, line });
        bufR.push({ x, y });
        if (bufR.get(0)?.x && floatR) {
            startTimeR = Date.now();
            floatR = false;
        }
        if (rightCoordinates.length % 80 === 0) {
            if (bufR.get(79)?.x && !floatR) {
                stopTimeR = (Date.now() - startTimeR) / 1000;
                floatR = true;
                cchange2 = 0;
                change2 = 0;
                frequencyR(stopTimeR);
            }
        };
    }

    ////////////////////ALGORITEM SYNC/////////////////////

    const [mouseUpL, setMouseL] = useState(false);
    // console.log("mouse",mouseUpL)

    if (mouseUpL === true) {
        setTimeout(() => {
            cchange1 = 0;
            change1 = 0;
        }, 1000);
    }

    const [mouseUpR, setMouseR] = useState(false);
    // console.log("mouse",mouseUpR)

    if (mouseUpR === true) {
        setTimeout(() => {
            cchange2 = 0;
            change2 = 0;
        }, 1000);
    }

    const frequencyL = (stopTimeL) => {
        // console.log(bufL.toarray());
        for (let i = 0; i < bufL.size() - 1; i++) {
            if ((Math.abs(bufL.get(i).x - bufL.get(i + 1).x)) < 5) {
                if ((bufL.get(i).y < bufL.get(i + 1).y) && (bufL.get(i).x < bufL.get(i + 1).x)) {
                    // console.log("1");
                    m1.push(1);
                }
                else if ((bufL.get(i).y < bufL.get(i + 1).y) && (bufL.get(i).x > bufL.get(i + 1).x)) {
                    // console.log("1");
                    m1.push(0);
                }
                else if ((bufL.get(i).y > bufL.get(i + 1).y) && (bufL.get(i).x < bufL.get(i + 1).x)) {
                    // console.log("1");
                    m1.push(1);
                }
                else if ((bufL.get(i).y > bufL.get(i + 1).y) && (bufL.get(i).x > bufL.get(i + 1).x)) {
                    // console.log("1");
                    m1.push(0);
                }
                else { //=
                    tempL = m1[m1.length - 1];
                    // console.log("3");
                    m1.push(tempL);
                }
            }
            else if (bufL.get(i).x < bufL.get(i + 1).x) {
                // console.log("1");
                m1.push(1);
            } else if (bufL.get(i).x > bufL.get(i + 1).x) {
                // console.log("2");
                m1.push(0);
            } else {
                tempL = m1[m1.length - 1];
                // console.log("3");
                m1.push(tempL);
            }
        }
        if (m1.length >= 2) {
            // console.log(m1);
            for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                //View changes on the left screen
                if (m1[pointM1] !== m1[pointM1 + 1]) {
                    change1++;
                    cchange1 = (change1 / stopTimeL).toFixed(2);
                    changeL.push({ x: secondTotal, y: cchange1 });
                }
            }
        }
    }

    const frequencyR = (stopTimeR) => {
        // console.log(bufR.toarray());
        for (let i = 0; i < bufR.size() - 1; i++) {
            if ((Math.abs(bufR.get(i).x - bufR.get(i + 1).x)) < 5) {
                if ((bufR.get(i).y < bufR.get(i + 1).y) && (bufR.get(i).x < bufR.get(i + 1).x)) {
                    // console.log("1");
                    m2.push(1);
                }
                else if ((bufR.get(i).y < bufR.get(i + 1).y) && (bufR.get(i).x > bufR.get(i + 1).x)) {
                    // console.log("1");
                    m2.push(0);
                }
                else if ((bufR.get(i).y > bufR.get(i + 1).y) && (bufR.get(i).x < bufR.get(i + 1).x)) {
                    // console.log("1");
                    m2.push(1);
                }
                else if ((bufR.get(i).y > bufR.get(i + 1).y) && (bufR.get(i).x > bufR.get(i + 1).x)) {
                    // console.log("1");
                    m2.push(0);
                }
                else { //=
                    tempR = m2[m2.length - 1];
                    // console.log("3");
                    m2.push(tempR);
                }
            }
            else if (bufR.get(i).x < bufR.get(i + 1).x) {
                // console.log("1");
                m2.push(1);
            } else if (bufR.get(i).x > bufR.get(i + 1).x) {
                // console.log("2");
                m2.push(0);
            } else {
                tempR = m2[m2.length - 1];
                // console.log("3");
                m2.push(tempR);
            }
        }
        if (m2.length >= 2) {
            // console.log(m2);
            for (pointM2; pointM2 < m2.length - 1; pointM2++) {
                //View changes on the left screen
                if (m2[pointM2] !== m2[pointM2 + 1]) {
                    change2++;
                    cchange2 = (change2 / stopTimeR).toFixed(2);
                    changeR.push({ x: secondTotal, y: cchange2 });
                }
            }
        }
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
            secondTotal = 1200 - (total / 1000);
            // timer2 = (
            //     (hours > 9 ? hours : '0' + hours) + ':' +
            //     (minutes > 9 ? minutes : '0' + minutes) + ':'
            //     + (seconds > 9 ? seconds : '0' + seconds)
            // )
        }
        secondTotal = 1200 - (total / 1000);
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
            const response = await fetch('http://localhost:3000/api/users/children/', {
            });
            const responseData = await response.json();
            console.log(responseData)
            user2 = JSON.parse(localStorage.getItem('secondtKide'));
            user1 = JSON.parse(localStorage.getItem('firstKide'));
            console.log(user2, user1)

        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = () => {
        fetchGetAPI();
        if (arr.length !== 1) {
            arr.shift();
        }
        setTimeout(async () => {
            console.log(user1.id, user2.id, startedTime, secondTotal, JSON.parse(localStorage.getItem('firstColor')),
                JSON.parse(localStorage.getItem('secondColor')), changeL, changeR, secondsL, secondsR, JSON.parse(localStorage.getItem('shape')))
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstKide: user1.id,
                        secondKide: user2.id,
                        timeStarted: startedTime,
                        // timeDone: date,
                        secondTotal: secondTotal,
                        coordinate: arr,
                        colorFirst: JSON.parse(localStorage.getItem('firstColor')),
                        colorSecond: JSON.parse(localStorage.getItem('secondColor')),
                        changesL: changeL,
                        changesR: changeR,
                        secondsL: secondsL,
                        secondsR: secondsR,
                        shape: JSON.parse(localStorage.getItem('shape'))
                    })
                });

                const responseData = await response.json();
                console.log(responseData);
            } catch (err) {
                console.log(err);
            }
        }, 2000);
    }

    const [doneLeft, setDoneLeft] = useState(false);
    const [doneRight, setDoneRight] = useState(false);

    if (doneLeft && doneRight === true) {
        console.log('wooooo')
    }

    return (
        <React.Fragment>
            <NavLink />
            <div className='container'>
                <div id="canvasGrid">
                    <p id="SeveralChanges1">{cchange1}</p>
                    {doneLeft && doneRight === true && <Confetti style={{ width: '100%' }} />}
                    {/* <div id="lifebar">
                        <progress value={cchange1} max="10"></progress>
                    </div> */}
                    {/* <LinearProgress variant="determinate" {...props} value={cchange1} /> */}
                    <LeftCanvas
                        handleCoordinate={handleLeftCoordinate}
                        color={JSON.parse(localStorage.getItem('firstColor'))}
                        setLeft={setLeft}
                        secondsL={secondsL}
                        cchange1={cchange1}
                        setMouseL={setMouseL}
                        arr={arr}
                        cchange2={cchange2}
                        setDoneLeft={setDoneLeft}

                    />
                    <RightCanvas
                        handleCoordinate={handleRightCoordinate}
                        color={JSON.parse(localStorage.getItem('secondColor'))}
                        setRight={setRight}
                        secondsR={secondsR}
                        cchange1={cchange1}
                        cchange2={cchange2}
                        setMouseR={setMouseR}
                        arr={arr}
                        setDoneRight={setDoneRight}
                    />
                    <p id="SeveralChanges2">{cchange2}</p>
                </div>
                <div id='time'>
                    <h2>{timer}</h2>
                </div>
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            </div>
        </React.Fragment >
    )
};

export default Coloring;