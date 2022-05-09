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

let CircularBufferL = require("circular-buffer");
let bufL = new CircularBufferL(100);
let CircularBufferR = require("circular-buffer");
let bufR = new CircularBufferR(100);

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
        bufL.push({ x, y });
        if (bufL.get(0)?.x && floatL) {
            startTimeL = Date.now();
            floatL = false;
        }
        if (leftCoordinates.length % 100 === 0) {
            if (bufL.get(99)?.x && !floatL) {
                stopTimeL = (Date.now() - startTimeL) / 1000;
                floatL = true
                frequencyL(stopTimeL);
            }
        };
    }

    const handleRightCoordinate = (x, y) => {
        rightCoordinates.push({ x, y });
        bufR.push({ x, y });
        if (bufR.get(0)?.x && floatR) {
            startTimeR = Date.now();
            floatR = false;
        }
        if (rightCoordinates.length % 100 === 0) {
            if (bufR.get(99)?.x && !floatR) {
                stopTimeR = (Date.now() - startTimeR) / 1000;
                floatR = true
                frequencyR(stopTimeR);
            }
        };
    }

    ////////////////////ALGORITEM SYNC/////////////////////

    const frequencyL = (stopTimeL) => {
        for (let i = 0; i < bufL.size() - 1; i++) {
            if (bufL.get(i).x <= bufL.get(i + 1).x) {
                if ((Math.abs(bufL.get(i).x - bufL.get(i + 1).x)) < 10) {
                    if (bufL.get(i).y > bufL.get(i + 1).y) {
                        m1.push(1);
                    }
                    else if ((Math.abs(bufL.get(i).y - bufL.get(i + 1).y)) < 10) {
                        tempL = m1[m1.length - 1];
                        m1.push(tempL);
                    }
                    else {
                        m1.push(0);
                    }
                }
                else {
                    m1.push(1);
                }
            }
            else {
                m1.push(0);
            }
            if (m1.length >= 2) {
                for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                    console.log(m1);
                    //View changes on the left screen
                    if (m1[pointM1] !== m1[pointM1 + 1]) {
                        change1++;
                        cchange1 = (change1 / stopTimeL).toFixed(2);
                        changeL.push({ change: cchange1, time: timer2 });
                    }
                }
            }
        }
    }

    const frequencyR = (stopTimeR) => {
        for (let i = 0; i < bufR.size() - 1; i++) {
            if (bufR.get(i).x <= bufR.get(i + 1).x) {
                if ((Math.abs(bufR.get(i).x - bufR.get(i + 1).x)) < 10) {
                    if (bufR.get(i).y > bufR.get(i + 1).y) {
                        m2.push(1);
                    }
                    else if ((Math.abs(bufR.get(i).y - bufR.get(i + 1).y)) < 10) {
                        tempR = m2[m2.length - 1];
                        m2.push(tempR);
                    }
                    else {
                        m2.push(0);
                    }
                }
                else {
                    m2.push(1);
                }
            }
            else {
                m2.push(0);
            }
            if (m2.length >= 2) {
                for (pointM2; pointM2 < m2.length - 1; pointM2++) {
                    console.log(m2);
                    //View changes on the righ screen
                    if (m2[pointM2] !== m2[pointM2 + 1]) {
                        change2++;
                        cchange2 = (change2 / stopTimeR).toFixed(2);
                        changeR.push({ change: cchange2, time: timer2 });
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
                < div id="canvasGrid">
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
        </React.Fragment >
    )
};

export default Coloring;