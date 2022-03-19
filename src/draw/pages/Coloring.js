import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import Users from '../../user/pages/Users';
import Analysis from '../../analysis/pages/analysis';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Coloring = (props) => {
    let startedTime;
    useEffect(() => {
        startedTime = new Date();
    }, []);
    const location = useLocation();
    let leftCoordinates = [];
    let rightCoordinates = [];
    const history = useHistory();

    const handleLeftCoordinate = (x, y) => {
        leftCoordinates.push({ x, y });
        //console.log("left", leftCoordinates);
    }

    const handleRightCoordinate = (x, y) => {
        rightCoordinates.push({ x, y });
        //console.log("right", rightCoordinates);
    }

    // const handleFinish = () => {
    //     setLeft(leftCoordinates);
    //     setRight(rightCoordinates);
    //     history.push({state: {left: left, right:right}});
    //     setDone(true);
    // }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //var frequency algorithem 
    let counter1 = 0, counter2 = 0;
    let timeIndex1, timeIndex2;
    let mm1 = [], mm2 = [], temp1 = [], arr = [];
    let point1x1 = 0, point1x2 = 0;
    let point2x1 = 1, point2x2 = 1;
    let point1y1 = 0, point1y2 = 0;
    let point2y1 = 1, point2y2 = 1;
    let pointM1 = 0, pointM2 = 0;
    let change1 = 0, change2 = 0;
    let m1, m2;

    // Left side frequency algorithem
    // const frequencyL = () => {
    //     if (leftCoordinates[point1x1 + 1]?.x) {
    //         counter1++;
    //         if (counter1 % 10 === 0) {
    //             frequencyL();
    //         }
    //         //calculate incline m
    //         if (leftCoordinates[point1x1]?.y === leftCoordinates[point1x1 + 1]?.y) {
    //             m1 = (((leftCoordinates[point1x1].x) - (leftCoordinates[point2x1].x)) / ((leftCoordinates[point1y1].y) - (leftCoordinates[point2y1].y + 1)));
    //         }
    //         else {
    //             m1 = (((leftCoordinates[point1x1].x) - (leftCoordinates[point2x1].x)) / ((leftCoordinates[point1y1].y) - (leftCoordinates[point2y1].y)));
    //         }

    //         // positive incline = 1, negative incline = 0
    //         if (m1 >= 0) { mm1.push(1); }
    //         if (m1 < 0) { mm1.push(0); }

    //         // number of change direction
    //         if (mm1.length >= 2) {
    //             if (mm1[pointM1] !== mm1[pointM1 + 1]) {
    //                 change1++;
    //                 seeChange1(change1);
    //             }
    //             pointM1++;
    //         }

    //         point1x1 += 1;
    //         point2x1 += 1;
    //         point1y1 += 1;
    //         point2y1 += 1;
    //     }
    // }

    var t = 0;

    const frequencyL = () => {
        if (leftCoordinates[point1x1 + 1]?.x) {
            counter1++;
            if (counter1 == 10) {
                //frequencyL();
                clearInterval(timeIndex1);
            }
            for (var i = 0; i < 10; i++) {
                temp1.push(leftCoordinates[t])
                t++;
            }
            frequency1(temp1);
            console.log("temp1=", temp1);
        }
    }

    const frequency1 = (arr) => {
        for (var i = 0; i < 100; i++) {
            if (arr[i]?.y === arr[i + 1]?.y) {
                m1 = (((arr[i].x) - (leftCoordinates[i + 1].x)) / ((arr[point1y1].y) - (arr[i + 1].y + 1)));
            }
            else {
                m1 = (((arr[i].x) - (arr[i + 1].x)) / ((arr[i].y) - (arr[i + 1].y)));
            }

            // positive incline = 1, negative incline = 0
            if (m1 >= 0) { mm1.push(1); }
            if (m1 < 0) { mm1.push(0); }

            // number of change direction
            if (mm1.length >= 2) {
                if (mm1[pointM1] !== mm1[pointM1 + 1]) {
                    change1++;
                }
                pointM1++;
                seeChange1(change1);
            }
        }
    }

    //Right side frequency algorithem
    const frequencyR = () => {
        if (rightCoordinates[point1x2 + 1]?.x) {
            counter2++;
            if (counter2 % 10 === 0) {
                frequencyR();
            }
            //calculate incline m
            if (rightCoordinates[point1x2]?.y === rightCoordinates[point1x2 + 1]?.y) {
                m2 = (((rightCoordinates[point1x2].x) - (rightCoordinates[point2x2].x)) / ((rightCoordinates[point1y2].y) - (rightCoordinates[point2y2].y + 1)));
            }
            else {
                m2 = (((rightCoordinates[point1x2].x) - (rightCoordinates[point2x2].x)) / ((rightCoordinates[point1y2].y) - (rightCoordinates[point2y2].y)));
            }

            // positive incline = 1, negative incline = 0
            if (m2 >= 0) { mm2.push(1); }
            if (m2 < 0) { mm2.push(0); }

            // number of change direction
            if (mm2.length >= 2) {
                if (mm2[pointM2] !== mm2[pointM2 + 1]) {
                    change2++;
                    seeChange2(change2);
                }
                pointM2++;
            }

            // sync between 2 users, under 2 changes in the direcation
            if ((Math.abs(change2 - change1) <= 2) && (Math.abs(change2 - change1) > 0)) {
                document.getElementById("b").innerHTML += "Feedback " + (Math.abs(change2 - change1));
            }

            point1x2 += 1;
            point2x2 += 1;
            point1y2 += 1;
            point2y2 += 1;
        }
    }

    //Time to finish voting
    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
        setTimeout(handleOpen, 1200000);
    }

    //View changes on the left screen
    const seeChange1 = (change1) => {
        document.getElementById("SeveralChanges1").innerHTML = change1;
    }

    //View changes to the right screen
    const seeChange2 = (change2) => {
        document.getElementById("SeveralChanges2").innerHTML = change2;
    }

    window.onload = function () {
        timeIndex1 = setInterval(frequencyL, 1000);
        timeIndex2 = setInterval(frequencyR, 100);
        let fiveMinutes = 60 * 20,
            display = document.querySelector('#timer');
        startTimer(fiveMinutes, display);
    };

    ///////////////////////////////////////////////////

    let user1;
    let user2;
    const fetchGetAPI = async() => {
        try{
            const response = await fetch('http://localhost:5000/api/users/', {
            });
            const responseData = await response.json();
            const len = responseData.users.length;
            user2 = responseData.users[len - 2];
            user1 = responseData.users[len-1];
            console.log(user2, user1)

        } catch(err) {
            console.log(err);
        }
    }

    const onSubmit = () => {
        fetchGetAPI();
        setTimeout(async() => {   
            try {
                const response = await fetch('http://localhost:5000/api/drawing/', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstKide: user1,
                        secondKide: user2,
                        timeStarted: startedTime,
                        timeDone: new Date(),
                        sync: '10',
                        firstCoordinate: leftCoordinates,
                        secondCoordinate: rightCoordinates
                    })
                });
    
                const responseData = await response.json();
                console.log(responseData);
            } catch(err) {
                console.log(err);
            }
        }, 2000);
       
        
    }

    return (
        <div className='container'>
            <h1>זמן צביעה</h1>
            <div id="time">הזמן שנותר הוא: <span id="timer">20:00</span> דקות</div>
            <div id="canvasGrid">
                <p id="SeveralChanges1"></p>
                <canvas id="canvasL" width="650" height="600">
                    <LeftCanvas handleCoordinate={handleLeftCoordinate} color={location.state[0]} />
                </canvas>
                <canvas id="canvasR" width="650" height="600">
                    <RightCanvas handleCoordinate={handleRightCoordinate} color={location.state[1]} />
                </canvas>
                <p id="SeveralChanges2"></p>
            </div>

            {/* <Button variant="contained" color="primary" onClick={handleFinish}>
                DONE
            </Button>
            {done && history.replace('/analysis', right)} */}
            
            <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button>
            <div>
                <p id="b"></p>
            </div>
        </div>
    )
};

export default Coloring;