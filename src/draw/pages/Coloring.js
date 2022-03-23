import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import Users from '../../user/pages/Users';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


let url;
let isColoring = false

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
    let mm1 = [], mm2 = [], temp1 = [], temp2 = [];
    let change1 = 0, change2 = 0;
    let m1, m2;
    let pointM1 = 0;
    let pointM2 = 0;
    var pointL = 0;
    var indexL = 0;
    var pointR = 0;
    var indexR = 0;

    const frequencyL = () => {
        if (leftCoordinates[pointL + 1]?.x) {
            counter1++;
            if (counter1 % 5 === 0) {
                frequencyL();
                //clearInterval(timeIndex1);
            }
            for (var i = 0; i < 10; i++) {
                if (leftCoordinates[pointL] !== undefined) {
                    temp1.push(leftCoordinates[pointL])
                    pointL++;
                }
            }
            console.log("temp = ", temp1);
            for (var i = 0; i < 8; i++, indexL++) {
                if (temp1[indexL]?.x === temp1[indexL + 1]?.x) {
                    m1 = 0;
                }
                else{
                    m1 = (((temp1[indexL].y) - (temp1[indexL + 1].y)) / ((temp1[indexL].x) - (temp1[indexL + 1].x)));
                }

                console.log("m1", m1);
                // positive incline = 1, negative incline = 2
                if (m1 > 0) { mm1.push(1); }
                else if (m1 < 0) { mm1.push(2); }
                else { console.log("loTOV"); }

                console.log("mm1", mm1);
                // number of change direction
                if (mm1.length >= 2) {
                    for (pointM1; pointM1 < mm1.length - 1; pointM1++) {
                        // console.log("pointM1=", pointM1)
                        // console.log(mm1[pointM1])
                        // console.log("mm1[pointM1]=", mm1[pointM1]);
                        // console.log("mm1[pointM1 + 1]=", mm1[pointM1 + 1]);

                        if (mm1[pointM1] !== mm1[pointM1 + 1]) {
                            change1++;
                            seeChange1(change1/10);
                        }
                    }
                }
            }
            if ((Math.abs(change1/10 - change2/10) <= 1) && (Math.abs(change2/10 - change1/10) > 0)) {
                document.getElementById("b").innerHTML += "F ";
            }
        }
    }

    //Right side frequency algorithem
    const frequencyR = () => {
        if (rightCoordinates[pointR + 1]?.x) {
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
            console.log("temp = ", temp2);
            for (var i = 0; i < 8; i++, indexR++) {
                if (temp2[indexR]?.x === temp2[indexR + 1]?.x) {
                    m2 = 0;
                }
                else {
                    m2 = (((temp2[indexR].y) - (temp2[indexR + 1].y)) / ((temp2[indexR].x) - (temp2[indexR + 1].x)));
                }

                console.log("m2", m2);
                // positive incline = 1, negative incline = 2
                if (m2 > 0) { mm2.push(1); }
                else if (m2 < 0) { mm2.push(2); }
                else { console.log("loTOV"); }

                console.log("mm2", mm2);
                // number of change direction
                if (mm2.length >= 2) {
                    for (pointM2; pointM2 < mm2.length - 1; pointM2++) {
                        // console.log("pointM2=", pointM2)
                        // console.log(mm2[pointM2])
                        // console.log("mm2[pointM2]=", mm2[pointM2]);
                        // console.log("mm2[pointM2 + 1]=", mm2[pointM2 + 1]);

                        if (mm2[pointM2] !== mm2[pointM2 + 1]) {
                            change2++;
                            seeChange2(change2/10);
                        }
                    }
                }
            }

            // sync between 2 users, under 2 changes in the direcation
            if ((Math.abs(change2/10 - change1/10) <= 1) && (Math.abs(change2/10 - change1/10) > 0)) {
                document.getElementById("b").innerHTML += "F ";
            }
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
        timeIndex1 = setInterval(frequencyL, 100);
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
            const response = await fetch('http://localhost:3000/api/users/', {
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
                const response = await fetch('http://localhost:3000/api/drawing/', {
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
                        secondCoordinate: rightCoordinates,
                        video: url,
                    })
                });
    
                const responseData = await response.json();
                console.log(responseData);
            } catch(err) {
                console.log(err);
            }
        }, 2000);
       
        
    }

    const onRecord = async () => {
        let stream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        });

        const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
            ? "video/webm; codecs=vp9"
            : "video/webm"
        let mediaRecorder = new MediaRecorder(stream, {
            mimeType: mime
        })

        let chunks = []
        mediaRecorder.addEventListener('dataavailable', function(e) {
            chunks.push(e.data)
        })

        mediaRecorder.addEventListener('stop', function(){
            let blob = new Blob(chunks, {
                type: chunks[0].type
            })
            url = URL.createObjectURL(blob);
            // console.log("URLLLLLSSS",url);

            let video = document.querySelector("video")
            console.log("videoOO",video);
            video.src = url
      

            let a = document.createElement('a')
            a.href = url
            a.download = 'video.webm'
            a.click()
        })

        //we have to start the recorder manually
        mediaRecorder.start()
    }

    useEffect(() => {
        onRecord();
    }, [])

    
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
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


    const startTime = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            console.log("start counting");
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the begining of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
            if(total === 0 && !isColoring){
                change1 = 0;
                console.log('ddddddd');
            }
        }
    }

    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:00:10');
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTime(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        // setStartPaintL(false)
        isColoring = false
        setTimeout(() => {
        }, 2000);
        console.log("$$$$$$$$$$$$$$$$$$$$$$4",isColoring);

        console.log('restart')

        clearTimer(getDeadTime());
    }

    const handlePointerDownL = () => {
        console.log('start');
        isColoring = true
        // setStartPaintL(true)
        console.log(isColoring);
    }

    console.log(isColoring);


    return (
        <div className='container'>
            <h1>זמן צביעה</h1>
            {/* <Button className="record-btn" onClick={onRecord}>record</Button> */}
            <video className="video" width="600px" controls></video>
            <div id="time">הזמן שנותר הוא: <span id="timer">20:00</span> דקות</div>
            <div>
                <p id="b"></p>
            </div>
            <div id="canvasGrid">
                <p id="SeveralChanges1"></p>
                <canvas id="canvasL" width="650" height="600" 
                    onPointerUp={onClickReset}
                    onPointerDown={handlePointerDownL}>
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

        </div>
    )
};

export default Coloring;