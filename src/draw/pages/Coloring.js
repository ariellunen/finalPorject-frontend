import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import canvas from './LeftCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

let moment = require('moment-timezone');

let counter = 0;
let arr = [];
let leftCoordinates = [];
let rightCoordinates = [];

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
    // const { frequencyL, frequencyR } = require("./FrequencyAlgo").default;

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

    // setInterval(frequencyL(leftCoordinates), 1000);

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
                // const formData = new FormData();
                // formData.append('firstKide', user1);
                // formData.append('secondKide', user2);
                // formData.append('timeStarted', startedTime);
                // formData.append('timeDone', date);
                // formData.append('sync', 10);
                // formData.append('coordinate', arr);
                // formData.append('colorFirst', location.state[1].color);
                // formData.append('colorSecond', location.state[0].color);
                // await sendRequest('http://localhost:3000/api/drawing', 'POST', formData, {
                //     Authorization: 'Bearer ' + auth.token
                //   });
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
                        color={location.state.state[0]}
                        setLeft={setLeft}
                    />
                    <RightCanvas
                        handleCoordinate={handleRightCoordinate}
                        color={location.state.state[1]}
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