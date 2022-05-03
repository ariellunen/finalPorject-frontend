import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

let moment = require('moment-timezone');

let counter = 0;
let arr = [];

let leftCoordinates = [];
let rightCoordinates = [];
let pointM1 = 0;
let pointM2 = 0;
let tempL = 0;
let tempR = 0;
let change1 = 0;
let change2 = 0;
let cchange1 = 0;
let cchange2 = 0;
let m1 = [], m2 = [];
let indexL = 0;
let indexR = 0;

let secondsL = [];
let secondsR = [];
let changeL = [];
let changeR = [];
let timer2;

const Coloring = (props) => {
    const auth = useContext(AuthContext);
    const [startedTime, setStartedTime] = useState(moment().tz("Asia/Jerusalem").format());
    useEffect(() => {
        // setStartedTime(new Date());
        clearTimer(getDeadTime());
    }, []);

    const location = useLocation();

    const [left, setLeft] = useState({ x: -1, y: -1 })
    const [right, setRight] = useState({ y: -1, x: -1 })

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        counter++;
    }, [left, right])

    const handleLeftCoordinate = (x, y) => {
        leftCoordinates.push({ x, y });
        frequencyL();
    }

    const handleRightCoordinate = (x, y) => {
        rightCoordinates.push({ x, y });
        frequencyR();
    }

    ////////////////////ALGORITEM SYNC/////////////////////

    const frequencyL = () => {
        // setTimeout(function () {
        if (leftCoordinates[indexL + 1]?.x) {
            for (indexL; indexL < leftCoordinates.length - 1; indexL++) {
                // if (leftCoordinates[indexL]?.x !== (-1) && leftCoordinates[indexL + 1]?.x !== (-1)) {
                if ((Math.abs(leftCoordinates[indexL]?.x - leftCoordinates[indexL + 1]?.x)) < 15) {
                    if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                        // console.log("A1 - 0");
                        m1.push(0);
                    }
                    else if (leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y) {
                        // console.log("A2 - 1");
                        m1.push(1);
                    }
                    else { //((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 15 )
                        // console.log("A3 - ?");
                        // console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                        tempL = m1[m1.length - 1];
                        m1.push(tempL);
                    }
                }
                else if (leftCoordinates[indexL]?.x < leftCoordinates[indexL + 1]?.x) {
                    m1.push(0);
                }
                else {
                    m1.push(1);
                }
                if (m1.length >= 2) {
                    for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                        //View changes on the left screen
                        if (m1[pointM1] !== m1[pointM1 + 1]) {
                            change1++;
                            cchange1 = change1 / 10;
                            changeL.push({ change: cchange1, time: timer2 });
                        }
                    }
                }
            }
        }
    }

    // console.log(changeL);
    //Right side frequency algorithem
    const frequencyR = () => {
        if (rightCoordinates[indexR + 1]?.x) {
            for (indexR; indexR < rightCoordinates.length - 1; indexR++) {
                // if (rightCoordinates[indexR]?.x !== (-1) && rightCoordinates[indexR + 1]?.x !== (-1)) {
                if ((Math.abs(rightCoordinates[indexR]?.x - rightCoordinates[indexR + 1]?.x)) < 15) {
                    if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                        // console.log("A1 - 0");
                        m2.push(0);
                    }
                    else if (rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y) {
                        // console.log("A2 - 1");
                        m2.push(1);
                    }
                    else { //((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 15)
                        // console.log("A3 - ?");
                        // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                        tempR = m2[m2.length - 1];
                        m2.push(tempR);
                    }
                }
                else if (rightCoordinates[indexR]?.x < rightCoordinates[indexR + 1]?.x) {
                    m2.push(0);
                }
                else { // (rightCoordinates[indexR]?.x > rightCoordinates[indexR + 1]?.x)
                    m2.push(1);
                }
                if (m2.length >= 2) {
                    for (pointM2; pointM2 < m2.length - 1; pointM2++) {
                        //View changes on the left screen
                        if (m2[pointM2] !== m2[pointM2 + 1]) {
                            change2++;
                        }
                        cchange2 = change2 / 10;
                        changeR.push(cchange2);
                    }
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
            timer2 = (
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
            const response = await fetch('http://localhost:3000/api/users/children/', {
            });
            const responseData = await response.json();
            const len = responseData.children.length;
            user2 = responseData.children[len - 2];
            user1 = responseData.children[len - 1];
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
                    // Authorization: 'Bearer ' + auth.token,
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
                        colorFirst: location.state.state[1].color,
                        colorSecond: location.state.state[0].color,
                        changesL: changeL,
                        changesR: changeR,
                        secondsL: secondsL,
                        secondsR: secondsR,
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
                    <p id="SeveralChanges1">{cchange1}</p>
                    <LeftCanvas
                        handleCoordinate={handleLeftCoordinate}
                        color={location.state.state[0]}
                        setLeft={setLeft}
                        secondsL={secondsL}
                    />
                    <RightCanvas
                        handleCoordinate={handleRightCoordinate}
                        color={location.state.state[1]}
                        setRight={setRight}
                        secondsR={secondsR}

                    />
                    <p id="SeveralChanges2">{cchange2}</p>
                </div>
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            </div>
        </React.Fragment>
    )
};

export default Coloring;