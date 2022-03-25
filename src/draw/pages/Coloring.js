import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


let counter1 = 0, counter2 = 0;
let timeIndex1, timeIndex2;
let mm1 = [], mm2 = [], temp1 = [], temp2 = [];
let change1 = 0, change2 = 0;
let m1, m2;
let pointM1 = 0;
let pointM2 = 0;
let pointL = 0;
let indexL = 0;
let pointR = 0;
let indexR = 0;
let counter = 0;
let arr = [];
let leftCoordinates =[];
let rightCoordinates =[];



const Coloring = (props) => {
    const [startedTime, setStartedTime] = useState(0);
    useEffect(() => {
        setStartedTime(new Date());
        clearTimer(getDeadTime());
        timeIndex1 = setInterval(frequencyL, 100);
        timeIndex2 = setInterval(frequencyR, 100);
    }, []);

    const location = useLocation();

    const [left, setLeft] = useState({ x: -1, y: -1 })
    const [right, setRight] = useState({ y: -1, x: -1 })

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        console.log('arr', arr)
        counter++;
    }, [left, right])

///////////////////////////////////////////////////

    const frequencyL = () => {
        if (arr[pointL + 1]?.l.x) {
            counter1++;
            if (counter1 % 5 === 0) {
                frequencyL();
                //clearInterval(timeIndex1);
            }
            for (var i = 0; i < 10; i++) {
                if (arr[pointL].l.x !== -1) {
                    temp1.push(leftCoordinates[pointL].l)
                    pointL++;
                }
            }
            console.log("temp = ", temp1);
            for (var i = 0; i < 8; i++, indexL++) {
                if (temp1[indexL]?.x === temp1[indexL + 1]?.x) {
                    m1 = 0;
                }
                else {
                    m1 = (((temp1[indexL].y) - (temp1[indexL + 1].y)) / ((temp1[indexL].x) - (temp1[indexL + 1].x)));
                }

                // console.log("m1", m1);
                // positive incline = 1, negative incline = 2
                if (m1 > 0) { mm1.push(1); }
                else if (m1 < 0) { mm1.push(2); }
                else { console.log("loTOV"); }

                // console.log("mm1", mm1);
                // number of change direction
                if (mm1.length >= 2) {
                    for (pointM1; pointM1 < mm1.length - 1; pointM1++) {
                        // console.log("pointM1=", pointM1)
                        // console.log(mm1[pointM1])
                        // console.log("mm1[pointM1]=", mm1[pointM1]);
                        // console.log("mm1[pointM1 + 1]=", mm1[pointM1 + 1]);

                        if (mm1[pointM1] !== mm1[pointM1 + 1]) {
                            change1++;
                            seeChange1(change1 / 10);
                        }
                    }
                }
            }
            if ((Math.abs(change1 / 10 - change2 / 10) <= 1) && (Math.abs(change2 / 10 - change1 / 10) > 0)) {
                document.getElementById("b").innerHTML += "F ";
            }
        }
    }

    //Right side frequency algorithem
    const frequencyR = () => {
        if (arr[pointR + 1]?.r.x) {
            counter2++;
            if (counter2 % 5 === 0) {
                frequencyR();
            }
            for (var i = 0; i < 10; i++) {
                if (rightCoordinates[pointR] !== undefined) {
                    temp2.push(rightCoordinates[pointR])
                    pointR++;
                }
            }
            // console.log("temp = ", temp2);
            for (var i = 0; i < 8; i++, indexR++) {
                if (temp2[indexR]?.x === temp2[indexR + 1]?.x) {
                    m2 = 0;
                }
                else {
                    m2 = (((temp2[indexR].y) - (temp2[indexR + 1].y)) / ((temp2[indexR].x) - (temp2[indexR + 1].x)));
                }

                // console.log("m2", m2);
                // positive incline = 1, negative incline = 2
                if (m2 > 0) { mm2.push(1); }
                else if (m2 < 0) { mm2.push(2); }
                else { console.log("loTOV"); }

                // console.log("mm2", mm2);
                // number of change direction
                if (mm2.length >= 2) {
                    for (pointM2; pointM2 < mm2.length - 1; pointM2++) {
                        // console.log("pointM2=", pointM2)
                        // console.log(mm2[pointM2])
                        // console.log("mm2[pointM2]=", mm2[pointM2]);
                        // console.log("mm2[pointM2 + 1]=", mm2[pointM2 + 1]);

                        if (mm2[pointM2] !== mm2[pointM2 + 1]) {
                            change2++;
                            seeChange2(change2 / 10);
                        }
                    }
                }
            }

            // sync between 2 users, under 2 changes in the direcation
            if ((Math.abs(change2 / 10 - change1 / 10) <= 1) && (Math.abs(change2 / 10 - change1 / 10) > 0)) {
                document.getElementById("b").innerHTML += "F ";
            }
        }
    }

    //View changes on the left screen
    const seeChange1 = (change1) => {
        document.getElementById("SeveralChanges1").innerHTML = change1;
    }

    //View changes to the right screen
    const seeChange2 = (change2) => {
        document.getElementById("SeveralChanges2").innerHTML = change2;
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
                        timeDone: new Date(),
                        sync: '10',
                        coordinate: arr,
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
                        <LeftCanvas color={location.state[0]} setLeft={setLeft} />
                    </canvas>
                    <canvas id="canvasR" width="650" height="600"
                        onPointerUp={() => {
                            setRight({ x: -1, y: -1 })
                        }}
                    >
                        <RightCanvas color={location.state[1]} setRight={setRight} />
                    </canvas>
                    <p id="SeveralChanges2"></p>
                </div>
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            </div>
        </React.Fragment>
    )
};

export default Coloring;