import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


let counter1 = 0, counter2 = 0;
let timeIndex1, timeIndex2;
let m1 = [], m2 = [];
let change1 = 0, change2 = 0;
// let pointM1 = 0;
let pointM2 = 0;
let pointL = 0;
let indexL = 1;
let pointR = 0;
let indexR = 1;
let counter = 0;
let arr = [];
let leftCoordinates = [];
let rightCoordinates = [];
let temp;
let i = 0;

const Coloring = (props) => {
    const [startedTime, setStartedTime] = useState(new Date());
    useEffect(() => {
        // setStartedTime(new Date());
        clearTimer(getDeadTime());
        timeIndex1 = setInterval(frequencyL, 100);
        timeIndex2 = setInterval(frequencyR, 100);
    }, []);

    const location = useLocation();

    const [left, setLeft] = useState({ x: -1, y: -1 })
    const [right, setRight] = useState({ y: -1, x: -1 })

    useEffect(() => {
        arr[counter] = { l: left, r: right }
        // console.log('arr', arr)
        counter++;
    }, [left, right])

    ////////////////////ALGORITEM SYNC/////////////////////

    const frequencyL = () => {
        if (arr[pointL + 1]?.l.x) {
            counter1++;
            if (counter1 % 5 === 0) {
                frequencyL();
                // clearInterval(timeIndex1);
            }
            for (var i = 0; i < 10; i++, pointL++) {
                if (arr[pointL].l !== undefined) {
                    leftCoordinates.push(arr[pointL].l)
                }
            }
            for (var i = 0; i < 8; i++, indexL++) {
                if (leftCoordinates[indexL]?.x === leftCoordinates[indexL + 1]?.x || (Math.abs(leftCoordinates[indexL]?.x - leftCoordinates[indexL + 1]?.x)) < 5) {
                    console.log("1(y)-", leftCoordinates[indexL]?.x, leftCoordinates[indexL + 1]?.x);
                    if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                        console.log("2(0)-", leftCoordinates[indexL]?.y, leftCoordinates[indexL + 1]?.y);
                        m1.push(0);
                    } //positive
                    else if (leftCoordinates[indexL]?.y === leftCoordinates[indexL + 1]?.y) {
                        console.log("9(?)-", leftCoordinates[indexL]?.y, leftCoordinates[indexL + 1]?.y);
                        let temp = m1[m1.length - 1];
                        m1.push(temp);
                    } //negative or positive
                    else {
                        console.log("3(1)-", leftCoordinates[indexL]?.y, leftCoordinates[indexL + 1]?.y);
                        m1.push(1);
                    } //negative
                }
                else if (leftCoordinates[indexL]?.x > leftCoordinates[indexL + 1]?.x) {
                    console.log("4(1)-", leftCoordinates[indexL]?.x, leftCoordinates[indexL + 1]?.x);
                    m1.push(1);
                } //negative
                else {
                    console.log("5(0)-", leftCoordinates[indexL]?.x, leftCoordinates[indexL + 1]?.x);
                    m1.push(0);
                } //positive
            }

            console.log("m1", m1);

            // number of change direction
            if (m1.length >= 2) {
                m1.map((pointM1,i) => {
                    if (pointM1 !== m1[i+1]){
                        change1++;
                        console.log(change1 / 10);
                    }
                })



                // for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                //     //View changes on the left screen
                //     if (m1[pointM1] !== m1[pointM1 + 1]) {
                //         change1++;
                //         document.getElementById("SeveralChanges1").innerHTML = change1 / 10;
                //     }
                // }
            }
        }
    }

    //Right side frequency algorithem
    const frequencyR = () => {
    //     if (arr[pointR + 1]?.r) {
    //         counter2++;
    //         if (counter2 % 5 === 0) {
    //             frequencyR();
    //             // clearInterval(timeIndex2);
    //         }
    //         for (var i = 0; i < 10; i++, pointR++) {
    //             if (arr[pointR].r !== null) {
    //                 rightCoordinates.push(arr[pointR].r)
    //             }
    //         }
    //         console.log("rightCoordinates = ", rightCoordinates);
    //         for (var i = 0; i < 8; i++, indexR++) {
    //             if (rightCoordinates[indexR]?.x === rightCoordinates[indexR + 1]?.x || (Math.abs(rightCoordinates[indexR]?.x - rightCoordinates[indexR + 1]?.x)) < 5) {
    //                 console.log("1(y)-", rightCoordinates[indexR]?.x, rightCoordinates[indexR + 1]?.x);
    //                 if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
    //                     console.log("2(1)-", rightCoordinates[indexR]?.y, rightCoordinates[indexR + 1]?.y);
    //                     m2.push(1);
    //                 } //negative
    //                 else if (rightCoordinates[indexR]?.y === rightCoordinates[indexR + 1]?.y) {
    //                     console.log("9(?)-", rightCoordinates[indexR]?.y, rightCoordinates[indexR + 1]?.y);
    //                     let temp = m2[m2.length - 1];
    //                     m2.push(temp);
    //                 } //negative or positive
    //                 else {
    //                     console.log("3(0)-", rightCoordinates[indexR]?.y, rightCoordinates[indexR + 1]?.y);
    //                     m2.push(0);
    //                 } //positive
    //             }
    //             else if (rightCoordinates[indexR]?.x > rightCoordinates[indexR + 1]?.x) {
    //                 console.log("4(1)-", rightCoordinates[indexR]?.x, rightCoordinates[indexR + 1]?.x);
    //                 m2.push(1);
    //             } //negative
    //             else {
    //                 console.log("5(0)-", rightCoordinates[indexR]?.x, rightCoordinates[indexR + 1]?.x);
    //                 m2.push(0);
    //             } //positive
    //         }

    //         console.log("m2", m2);

    //         // number of change direction
    //         if (m2.length >= 2) {
    //             for (pointM2; pointM2 < m2.length - 1; pointM2++) {

    //                 //View changes on the left screen
    //                 if (m2[pointM2] !== m2[pointM2 + 1]) {
    //                     change2++;
    //                     document.getElementById("SeveralChanges2").innerHTML = change2 / 10;
    //                 }
    //             }
    //         }
    //     }
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
                            // m1 = [];
                            // change1 = 0;
                            // document.getElementById("SeveralChanges1").innerHTML = 0;
                        }}
                    >
                        <LeftCanvas color={location.state[0]} setLeft={setLeft} />
                    </canvas>
                    <canvas id="canvasR" width="650" height="600"
                        onPointerUp={() => {
                            setRight({ x: -1, y: -1 })
                            m2 = [];
                            change2 = 0;
                            document.getElementById("SeveralChanges2").innerHTML = 0;
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