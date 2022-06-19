// import React, { useState, useEffect, useRef } from 'react';
// import LeftCanvas from './LeftCanvas';
// import RightCanvas from './RightCanvas';
// import './Coloring.css';
// import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
// import NavLink from '../../user/components/NavLinks';
// import Confetti from "react-confetti";
// import { useHttpClient } from '../../shared/hooks/http-hook';
// import { useHistory } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Stack from '@mui/material/Stack';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// let moment = require('moment-timezone');
// let counter = 0;
// let arr = [];
// let secondTotal;
// let leftCoordinates = [];
// let rightCoordinates = [];

// let CircularBufferL = require("circular-buffer");
// let bufL = new CircularBufferL(80);
// let CircularBufferR = require("circular-buffer");
// let bufR = new CircularBufferR(80);

// let pointM1 = 0;
// let pointM2 = 0;
// let tempL = 0;
// let tempR = 0;
// let change1 = 0;
// let change2 = 0;
// let cchange1 = 0;
// let cchange2 = 0;
// let m1 = [], m2 = [];

// let startTimeL;
// let stopTimeL;
// let floatL = true;

// let startTimeR;
// let stopTimeR;
// let floatR = true;

// let secondsL = [];
// let secondsR = [];
// let changeL = [];
// let changeR = [];

// let test = [];
// const breadcrumbs = [
//     <Typography key="1" color="text.primary" component={Link} to='/'>
//         תפריט ראשי
//     </Typography>,
//     <Typography key="2" color="text.primary" component={Link} to='/form'>
//         בחירת ילדים
//     </Typography>,
//     <Typography key="2" color="text.primary" component={Link} to='/drawing/color'>
//         בחירת צבע
//     </Typography>,
//     <Typography key="3" color="text.primary" component={Link} to='/drawing/shapes'>
//         בחירת צורה
//     </Typography>,
//     <Typography key="4" color="text.primary">
//         צביעה    </Typography>,
// ];


// const Coloring = (props) => {
//     const history = useHistory();
//     const [isDone, seyIsDone] = useState(false)
//     const [startedTime, setStartedTime] = useState(moment().tz("Asia/Jerusalem").format());
//     useEffect(() => {
//         clearTimer(getDeadTime());
//     }, []);

//     const [left, setLeft] = useState({ x: -1, y: -1, color: 'LightGrey', line: '20' })
//     const [right, setRight] = useState({ y: -1, x: -1, color: 'LightGrey', line: '20' })

//     useEffect(() => {
//         arr[counter] = { l: left, r: right }
//         counter++;
//         if (isDone) {
//             arr = [];
//             counter = 0;
//         }
//     }, [left, right, isDone])

//     useEffect(() => {
//         setInterval(() => {
//             if (!mouseUpL && bufL.size() === 80) {frequencyL()}
//             //console.log('check', cchange1);
//         }, 500)
//     }, [])

//     const [mouseUpL, setMouseL] = useState(false);

//     const intervalRef = useRef();

//     useEffect(() => {
//         if (mouseUpL) {
//             cchange1 = 0;
//             change1 = 0;
//             intervalRef.current = setInterval(() => {
//                 bufL.push(bufL.get(bufL.size() - 1));
//                 // if (bufL.get((bufL.size() - 1))?.x) {
//                     // stopTimeL = (Date.now() - startTimeL) / 1000;
//                     // floatL = true;
//                     // cchange1 = 0;
//                     // change1 = 0;
//                 // }
//             }, 250)
//         } else {
//             clearInterval(intervalRef.current)
//         }
//     }, [mouseUpL])

//     const handleLeftCoordinate = (x, y, color, line) => {
//         leftCoordinates.push({ x, y, color, line });
//         bufL.push({ x, y });
//         if (bufL.get(0)?.x && floatL) {
//         //     startTimeL = Date.now();
//             floatL = false;
//         }
//         // console.log(bufL.capacity());
//         // console.log(bufL.capacity() - 1);
//         if (leftCoordinates.length % bufL.capacity() === 0) {
//             if (bufL.get(29)?.x && !floatL) {
//                 // stopTimeL = (Date.now() - startTimeL) / 1000;
//                 floatL = true;
//                 cchange1 = 0;
//                 change1 = 0;
//                 // frequencyL(stopTimeL);
//             }
//         };
//         console.log(bufL.toarray());
//     }

//     const handleRightCoordinate = (x, y, color, line) => {
//         rightCoordinates.push({ x, y, color, line });
//         bufR.push({ x, y });
//         if (bufR.get(0)?.x && floatR) {
//             startTimeR = Date.now();
//             floatR = false;
//         }
//         if (rightCoordinates.length % 30 === 0) {
//             if (bufR.get(29)?.x && !floatR) {
//                 stopTimeR = (Date.now() - startTimeR) / 1000;
//                 floatR = true;
//                 cchange2 = 0;
//                 change2 = 0;
//                 frequencyR(stopTimeR);
//             }
//         };
//     }

//     ////////////////////ALGORITEM SYNC/////////////////////

//     //console.log("mouse", mouseUpL)

//     // if (mouseUpL === true) {
//     //     setTimeout(() => {
//     //         cchange1 = 0;
//     //         change1 = 0;
//     //     }, 1000);
//     // }

//     const [mouseUpR, setMouseR] = useState(false);
//     // console.log("mouse",mouseUpR)

//     if (mouseUpR === true) {
//         setTimeout(() => {
//             cchange2 = 0;
//             change2 = 0;
//         }, 1000);
//     }

//     const frequencyL = () => {
//         // console.log(bufL.toarray());
//         for (let i = 0; i < bufL.size() - 1; i++) {
//             if ((Math.abs(bufL.get(i).x - bufL.get(i + 1).x)) < 5) {
//                 if ((bufL.get(i).y < bufL.get(i + 1).y) && (bufL.get(i).x < bufL.get(i + 1).x)) {
//                     // console.log("1");
//                     m1.push(1);
//                 }
//                 else if ((bufL.get(i).y < bufL.get(i + 1).y) && (bufL.get(i).x > bufL.get(i + 1).x)) {
//                     // console.log("1");
//                     m1.push(0);
//                 }
//                 else if ((bufL.get(i).y > bufL.get(i + 1).y) && (bufL.get(i).x < bufL.get(i + 1).x)) {
//                     // console.log("1");
//                     m1.push(1);
//                 }
//                 else if ((bufL.get(i).y > bufL.get(i + 1).y) && (bufL.get(i).x > bufL.get(i + 1).x)) {
//                     // console.log("1");
//                     m1.push(0);
//                 }
//                 else { //=
//                     tempL = m1[m1.length - 1];
//                     // console.log("3");
//                     m1.push(tempL);
//                 }
//             }
//             else if (bufL.get(i).x < bufL.get(i + 1).x) {
//                 // console.log("1");
//                 m1.push(1);
//             } else if (bufL.get(i).x > bufL.get(i + 1).x) {
//                 // console.log("2");
//                 m1.push(0);
//             } else {
//                 tempL = m1[m1.length - 1];
//                 // console.log("3");
//                 m1.push(tempL);
//             }
//         }
//         if (m1.length >= 2) {
//             // console.log(m1);
//             for (pointM1; pointM1 < m1.length - 1; pointM1++) {
//                 //View changes on the left screen
//                 if (m1[pointM1] !== m1[pointM1 + 1]) {
//                     change1++;
//                     console.log(change1);
//                     cchange1 = (change1).toFixed(2);
//                     console.log('cchange1', cchange1);
//                     changeL.push({ x: secondTotal, y: cchange1 });
//                 }
//             }
//         }
//     }

//     const frequencyR = (stopTimeR) => {
//         // console.log(bufR.toarray());
//         for (let i = 0; i < bufR.size() - 1; i++) {
//             if ((Math.abs(bufR.get(i).x - bufR.get(i + 1).x)) < 5) {
//                 if ((bufR.get(i).y < bufR.get(i + 1).y) && (bufR.get(i).x < bufR.get(i + 1).x)) {
//                     // console.log("1");
//                     m2.push(1);
//                 }
//                 else if ((bufR.get(i).y < bufR.get(i + 1).y) && (bufR.get(i).x > bufR.get(i + 1).x)) {
//                     // console.log("1");
//                     m2.push(0);
//                 }
//                 else if ((bufR.get(i).y > bufR.get(i + 1).y) && (bufR.get(i).x < bufR.get(i + 1).x)) {
//                     // console.log("1");
//                     m2.push(1);
//                 }
//                 else if ((bufR.get(i).y > bufR.get(i + 1).y) && (bufR.get(i).x > bufR.get(i + 1).x)) {
//                     // console.log("1");
//                     m2.push(0);
//                 }
//                 else { //=
//                     tempR = m2[m2.length - 1];
//                     m2.push(tempR);
//                 }
//             }
//             else if (bufR.get(i).x < bufR.get(i + 1).x) {
//                 m2.push(1);
//             } else if (bufR.get(i).x > bufR.get(i + 1).x) {
//                 m2.push(0);
//             } else {
//                 tempR = m2[m2.length - 1];
//                 m2.push(tempR);
//             }
//         }
//         if (m2.length >= 2) {
//             // console.log(m2);
//             for (pointM2; pointM2 < m2.length - 1; pointM2++) {
//                 //View changes on the left screen
//                 if (m2[pointM2] !== m2[pointM2 + 1]) {
//                     change2++;
//                     cchange2 = (change2 / stopTimeR).toFixed(2);
//                     changeR.push({ x: secondTotal, y: cchange2 });
//                 }
//             }
//         }
//     }

//     /////////////////////-20 MINUTES TIMER-//////////////////////////////

//     const Ref = useRef(null);
//     // The state for our timer
//     const [timer, setTimer] = useState('00:00:00');

//     const getTimeRemaining = (e) => {
//         const total = Date.parse(e) - Date.parse(new Date());
//         const seconds = Math.floor((total / 1000) % 60);
//         const minutes = Math.floor((total / 1000 / 60) % 60);
//         const hours = Math.floor((total / 1000 * 60 * 60) % 24);
//         return {
//             total, hours, minutes, seconds
//         };
//     }

//     const startTimer = (e) => {
//         let { total, hours, minutes, seconds } = getTimeRemaining(e);
//         if (total >= 0) {
//             // update the timer
//             setTimer(
//                 (hours > 9 ? hours : '0' + hours) + ':' +
//                 (minutes > 9 ? minutes : '0' + minutes) + ':'
//                 + (seconds > 9 ? seconds : '0' + seconds)
//             )
//             secondTotal = 1200 - (total / 1000);
//             // timer2 = (
//             //     (hours > 9 ? hours : '0' + hours) + ':' +
//             //     (minutes > 9 ? minutes : '0' + minutes) + ':'
//             //     + (seconds > 9 ? seconds : '0' + seconds)
//             // )
//         }
//         secondTotal = 1200 - (total / 1000);
//     }

//     const clearTimer = (e) => {
//         setTimer('00:20:00');
//         if (Ref.current) clearInterval(Ref.current);
//         const id = setInterval(() => {
//             startTimer(e);
//         }, 1000)
//         Ref.current = id;
//     }

//     const getDeadTime = () => {
//         let deadline = new Date();
//         deadline.setSeconds(deadline.getSeconds() + 1200);
//         return deadline;
//     }
//     const onSubmit = async () => {
//         if (arr.length !== 1) {
//             arr.shift();
//         }
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/drawing/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     firstKide: JSON.parse(localStorage.getItem('firstKide')).id,
//                     secondKide: JSON.parse(localStorage.getItem('secondKide')).id,
//                     timeStarted: startedTime,
//                     secondTotal: secondTotal,
//                     coordinate: arr,
//                     colorFirst: JSON.parse(localStorage.getItem('firstColor')),
//                     colorSecond: JSON.parse(localStorage.getItem('secondColor')),
//                     changesL: changeL,
//                     changesR: changeR,
//                     secondsL: secondsL,
//                     secondsR: secondsR,
//                     shape: JSON.parse(localStorage.getItem('shape'))
//                 })
//             });

//             const responseData = await response.json();
//             console.log(responseData);
//             arr = [];
//             counter = 0;
//             secondsL = 0;
//             changeL = 0;
//             secondsR = 0;
//             secondsL = 0;
//             seyIsDone(true)
//             history.push('/')

//         } catch (err) {
//             arr = [];
//             counter = 0;
//             counter = 0;
//             secondsL = 0;
//             changeL = 0;
//             secondsR = 0;
//             secondsL = 0;
//             console.log(err);
//         }
//     }

//     const [doneLeft, setDoneLeft] = useState(false);
//     const [doneRight, setDoneRight] = useState(false);

//     return (
//         <React.Fragment>
//             <NavLink />
//             <Stack spacing={2} >
//                 <Breadcrumbs
//                     sx={{ marginTop: 1, marginLeft: 3 }}
//                     separator={<NavigateNextIcon fontSize="small" />}
//                     aria-label="breadcrumb"
//                 >
//                     {breadcrumbs}
//                 </Breadcrumbs>
//             </Stack>
//             <div className='container'>
//                 <div id="canvasGrid" style={{ marginTop: "8px" }}>
//                     {doneLeft && doneRight === true && <Confetti style={{ width: '100%' }} />}
//                     <div>{cchange1}</div>
//                     <LeftCanvas
//                         handleCoordinate={handleLeftCoordinate}
//                         color={JSON.parse(localStorage.getItem('firstColor'))}
//                         setLeft={setLeft}
//                         secondsL={secondsL}
//                         cchange1={cchange1}
//                         setMouseL={setMouseL}
//                         arr={arr}
//                         cchange2={cchange2}
//                         setDoneLeft={setDoneLeft}
//                     />

//                     <RightCanvas
//                         handleCoordinate={handleRightCoordinate}
//                         color={JSON.parse(localStorage.getItem('secondColor'))}
//                         setRight={setRight}
//                         secondsR={secondsR}
//                         cchange1={cchange1}
//                         cchange2={cchange2}
//                         setMouseR={setMouseR}
//                         arr={arr}
//                         setDoneRight={setDoneRight}
//                     />
//                     <div>{cchange2}</div>

//                     {/* <p id="SeveralChanges2">{cchange2}</p> */}

//                 </div>
//                 <div id='footer'>
//                     <Button sx={{ marginTop: "-25px" }} className='button' type='submit' onClick={onSubmit}>סיום</Button>
//                     <div id='time'>
//                         <h3>{timer}</h3>
//                     </div>
//                     {/* <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/">סיום</Button> */}
//                 </div>
//             </div>
//         </React.Fragment >
//     )
// };

// export default Coloring;


// // import React, { useEffect, useState } from 'react';
// // import interact from 'interactjs';
// // import './Canvas.css';
// // import circleCor from "../shape/CircleR"
// // import triangularCor from "../shape/TriangularR"
// // import heartCor from "../shape/HeartR"
// // import davidCor from "../shape/DavidR"
// // import homeCor from "../shape/HomeR"
// // import './RightCanvas.css';
// // import Avatar from '@mui/material/Avatar';
// // import { ClickAwayListener } from '@mui/material';

// // let canvas;
// // let down;
// // let timeTakenR = 0;
// // let ctx;
// // let context;
// // let uploadCoor;
// // let p;
// // let c;
// // let x, y;
// // let flag = true;
// // let area;
// // let fill;
// // let fillPercentage;
// // let flagCnc = true;
// // let color;
// // let line = 12;
// // let selectedShape;

// // const RightCanvas = (props) => {
// //     selectedShape = sessionStorage.getItem("selectedShape");
// //     useEffect(() => {
// //         document.getElementById("oneR").style.backgroundColor = props.color;
// //         document.getElementById("twoR").style.backgroundColor = props.color;
// //         document.getElementById("threeR").style.backgroundColor = props.color;

// //     }, [props.color])

// //     const frequencyOnset = () => {
        
// //     }

// //     useEffect(() => {
// //         ctx = document.getElementById("canvasR")
// //         context = ctx.getContext('2d');
// //         // line = document.getElementById("lineWidthR").value;
// //         // on pointer down
// //         if (Math.abs(props.cchange2 - props.cchange1) > 2 || props.cchange1 === 0) {
// //             context.beginPath();
// //             context.lineWidth = line;
// //             // line = document.getElementById("lineWidthL").value;
// //             color = 'LightGrey'
// //             context.strokeStyle = 'LightGrey';
// //             context.lineTo(x, y);
// //             context.stroke();
// //         }

// //         else {
// //             context.beginPath();
// //             context.lineWidth = line;
// //             // context.lineWidth = document.getElementById("lineWidthR").value;
// //             context.strokeStyle = props.color;
// //             context.lineTo(x, y);
// //             context.stroke();
// //             // line = document.getElementById("lineWidthL").value;
// //             color = props.color
// //         }

// //         interact('#canvasR').on('down', function (event) {
// //             canvas = event.target.getContext('2d')
// //             event.preventDefault();
// //             event.stopPropagation();
// //             down = Date.now();
// //             canvas.beginPath();
// //             // canvas.lineWidth = document.getElementById("lineWidthR").value;
// //             context.lineWidth = line;

// //             canvas.strokeStyle = 'LightGrey';
// //             props.setMouseR(false);
// //             // line = document.getElementById("lineWidthL").value;
// //             color = 'LightGrey'
// //         })

// //         interact('#canvasR').on('up', function (event) {
// //             event.preventDefault();
// //             event.stopPropagation();
// //             // timeTakenR = Date.now() - down;
// //             // props.secondsR.push(timeTakenR / 1000);
// //             props.setRight({ x: -1, y: -1, color: color, line: line })
// //             props.setMouseR(true);
// //             canvas.stroke();
// //             quantityPixels();
// //         })
// //         interact('#canvasR')
// //             .draggable({
// //                 max: Infinity,
// //                 origin: 'self',
// //                 modifiers: [
// //                     interact.modifiers.snap({
// //                         targets: [
// //                             // interact.snappers.grid({ x: pixelSize, y: pixelSize })
// //                         ]
// //                     })
// //                 ],
// //                 listeners: {
// //                     move: function (event) {
// //                         // if (x > 0 && x < 800 && y > 0 && y < 800) {
// //                         //     indexCheck(x, y);
// //                         // }
// //                         x = event.clientX;
// //                         y = event.clientY;
// //                         canvas.lineTo(event.clientX, event.clientY);
// //                         canvas.stroke();
// //                         props.setRight({ x: event.clientX, y: event.clientY, color: color, line: line })
// //                         props.handleCoordinate(event.clientX, event.clientY, color);
// //                         quantityPixels();
// //                     }
// //                 }
// //             })
// //         function resizeCanvases() {
// //             [].forEach.call(document.querySelectorAll('#canvasR'), function (
// //                 canvas
// //             ) {
// //                 delete canvas.width
// //                 delete canvas.height
// //             })
// //         }
// //         resizeCanvases()
// //     }, [props.cchange2, props.cchange1])

// //     const shapesSelected = (color) => {
// //         switch (selectedShape) {
// //             case 'circle':
// //                 uploadCoor = circleCor;
// //                 filling2(0, 235, 230, color)
// //                 break;
// //             case 'triangular':
// //                 uploadCoor = triangularCor;
// //                 filling(0, 10, 370, 460, 0, 460, color)
// //                 break;
// //             case 'heart':
// //                 uploadCoor = heartCor;
// //                 filling(0, 100, 370, 100, 0, 460, color)
// //                 filling8(0, 100, 80, 0, 280, 0, 370, 100, color)
// //                 filling8(370, 100, 570, 350, 180, 400, 0, 460, color)
// //                 break;
// //             case 'david':
// //                 uploadCoor = davidCor;
// //                 filling(0, 20, 370, 370, 0, 370, color)
// //                 filling(0, 100, 370, 100, 0, 450, color)
// //                 break;
// //             case 'home':
// //                 uploadCoor = homeCor;
// //                 filling(0, 10, 370, 250, 0, 250, color)
// //                 filling4(0, 250, 220, 250, 220, 460, 0, 460, color)
// //                 break;
// //             default:
// //                 uploadCoor = circleCor;
// //                 filling2(0, 400, 390, color)
// //                 break;
// //         }
// //     }

// //     useEffect(() => {
// //         ctx = document.getElementById("canvasR")
// //         context = ctx.getContext('2d');
// //         context.fillStyle = "#fff";
// //         context.fillRect(0, 0, ctx.width, ctx.height);
// //         shapesSelected('Ivory')
// //         fileUpload()
// //         quantityPixelsArea();
// //     }, []);

// //     //check how much left to coloring
// //     const quantityPixelsArea = () => {
// //         p = context.getImageData(0, 0, ctx.width, ctx.height).data;
// //         area = 0;
// //         for (let i = 0; i < p.length / 4; i += 4) {
// //             if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
// //                 area++
// //             }
// //         }
// //         // console.log(area);
// //     }

// //     //check drawing pixels area - for 95% coloring 
// //     const quantityPixels = () => {
// //         p = context.getImageData(0, 0, ctx.width, ctx.height).data;
// //         fill = 0;
// //         for (let i = 0; i < p.length / 4; i += 4) {
// //             if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
// //                 fill++
// //             }
// //         }
// //         fillPercentage = ((area - fill) * 100) / area;
// //         if (fillPercentage > 80) {
// //             context.clearRect(0, 0, ctx.width, ctx.height);
// //             let color = props.color;
// //             shapesSelected(color);
// //             viewDrawing();
// //             props.setDoneRight(true);
// //         }
// //     }
// //     //check limits - flag
// //     const indexCheck = (x, y) => {
// //         const { data } = context.getImageData(x, y, 1, 1);
// //         if (data[2] === 240) {
// //             flag = true;
// //         }
// //         else {
// //             flag = false;
// //         }
// //     }

// //     //Upload the drawing
// //     let coordinates = [];
// //     const dda = (x0, y0, x1, y1) => {
// //         context.beginPath();
// //         context.moveTo(x0, y0);
// //         context.lineTo(x1, y1);
// //         context.lineWidth = 10;
// //         context.strokeStyle = 'black';
// //         context.stroke();
// //     };

// //     const circle = (x1, y1, r) => {
// //         context.beginPath();
// //         context.arc(x1, y1, r, 0, 2 * Math.PI);
// //         context.lineWidth = 10;
// //         context.strokeStyle = 'black';
// //         context.stroke();
// //     }

// //     const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
// //         context.beginPath();
// //         context.moveTo(x0, y0);
// //         context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
// //         context.lineWidth = 10;
// //         context.strokeStyle = 'black';
// //         context.stroke();
// //     }

// //     const filling = (x1, y1, x2, y2, x3, y3, color) => {
// //         context.beginPath();
// //         context.moveTo(x1, y1);
// //         context.lineTo(x2, y2);
// //         context.lineTo(x3, y3);
// //         context.fillStyle = color;
// //         context.fill();
// //         context.strokeStyle = color;
// //         context.stroke();
// //     }

// //     const filling2 = (x1, y1, r, color) => {
// //         context.beginPath();
// //         context.arc(x1, y1, r, 0, 2 * Math.PI);
// //         context.lineWidth = 10;
// //         context.fillStyle = color;
// //         context.fill();
// //         context.strokeStyle = 'black';
// //         context.stroke();
// //     }

// //     const filling4 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
// //         context.beginPath();
// //         context.moveTo(x1, y1);
// //         context.lineTo(x2, y2);
// //         context.lineTo(x3, y3);
// //         context.lineTo(x4, y4);
// //         context.fillStyle = color;
// //         context.fill();
// //         context.strokeStyle = color;
// //         context.stroke();
// //     }
// //     const filling8 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
// //         context.beginPath();
// //         context.moveTo(x1, y1);
// //         context.bezierCurveTo(x2, y2, x3, y3, x4, y4);
// //         context.fillStyle = color;
// //         context.fill();
// //         context.strokeStyle = color;
// //         context.stroke();
// //     }

// //     const fileUpload = () => {
// //         if (uploadCoor) {
// //             coordinates = []
// //             const lines = uploadCoor.split('\n')
// //             for (let i = 0; i < lines.length; i++) {
// //                 const values = lines[i].split(',')
// //                 coordinates.push([])
// //                 for (let j = 0; j < values.length; j++) {
// //                     coordinates[i].push(parseInt(values[j]))
// //                 }
// //             }
// //             viewDrawing()
// //         }
// //     }

// //     const viewDrawing = () => {
// //         for (let i = 0; i < coordinates.length; i++) {
// //             if (coordinates[i].length === 3) {
// //                 circle(coordinates[i][0], coordinates[i][1], coordinates[i][2])
// //             } else if (coordinates[i].length === 4) {
// //                 dda(coordinates[i][0], coordinates[i][1],
// //                     coordinates[i][2], coordinates[i][3])
// //             } else if (coordinates[i].length === 8) {
// //                 bezierCurve(coordinates[i][0], coordinates[i][1], coordinates[i][2],
// //                     coordinates[i][3], coordinates[i][4], coordinates[i][5],
// //                     coordinates[i][6], coordinates[i][7])
// //             }
// //         }
// //     }

// //     const ballons = () => {
// //         // BALOONSSSS Animation
// //         const bdayBallons = (function () {
// //             const density = 1; // concurrent balloon count
// //             const balloons = [];
// //             const colors = ['yellow', 'green', 'blue', 'red'];

// //             const stringElement = document.createElement("div");
// //             stringElement.classList.add("string");

// //             for (let i = 0; i < density; i++) {
// //                 const element = document.createElement("div");
// //                 element.classList.add("balloon");
// //                 element.classList.add(randomColor());

// //                 element.append(stringElement.cloneNode());
// //                 document.body.append(element);

// //                 setTimeout(() => {
// //                     releaseBalloon(element);
// //                 }, (i * 2000) + random(500, 1000));
// //             }

// //             function randomColor() {
// //                 return colors[random(0, colors.length)];
// //             }

// //             function random(min, max) {
// //                 return Math.floor(Math.random() * (max - min)) + min;
// //             }

// //             function releaseBalloon(balloon) {
// //                 const delay = random(100, 1000);
// //                 const x = random(-99, -30); // random x value to fly
// //                 const y = random(-99, -30); // random y value to fly

// //                 const sequence = [{
// //                     offset: 0,
// //                     transform: `rotateZ(45deg) translate(0, 0)`
// //                 }];

// //                 // random fly direction
// //                 if (random(0, 2) === 0) {
// //                     // first fly up to top left

// //                     // left distance to keep balloon in view
// //                     balloon.style.left = `${-1 * x}vw`;

// //                     sequence.push({
// //                         offset: x / -200,
// //                         transform: `rotateZ(45deg) translate(${x}vw, 0)`
// //                     });
// //                     sequence.push({
// //                         offset: (x + y) / -200,
// //                         transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
// //                     });
// //                     sequence.push({
// //                         offset: (-100 + y) / -200,
// //                         transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`
// //                     });
// //                 } else {
// //                     // fist fly up to right top

// //                     sequence.push({
// //                         offset: y / -200,
// //                         transform: `rotateZ(45deg) translate(0, ${y}vh)`
// //                     });
// //                     sequence.push({
// //                         offset: (x + y) / -200,
// //                         transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
// //                     });
// //                     sequence.push({
// //                         offset: (-100 + x) / -200,
// //                         transform: `rotateZ(45deg) translate(${x}vw, -100vh)`
// //                     });
// //                 }

// //                 // last move is common
// //                 sequence.push({
// //                     offset: 1,
// //                     transform: `rotateZ(45deg) translate(-100vw, -100vh)`
// //                 });

// //                 const balloonAnimation = balloon.animate(sequence, {
// //                     duration: 15000,
// //                     delay: delay
// //                 });


// //                 balloonAnimation.onfinish = () => { releaseBalloon(balloon) }
// //             }
// //         })();
// //     }

// //     const handleWidth = (value) => {
// //         line = value;
// //     }

// //     let button = document.getElementsByClassName("width");
    
// //     let addSelectClass = function () {
// //         removeSelectClass();
// //         this.classList.add('selected');
// //     }

// //     let removeSelectClass = function () {
// //         for (let i = 0; i < button.length; i++) {
// //             button[i].classList.remove('selected')
// //         }
// //     }

// //     for (let i = 0; i < button.length; i++) {
// //         button[i].addEventListener("click", addSelectClass);
// //     }

// //     const pointerUpR = () => {
// //         timeTakenR = Date.now() - down;
// //         props.handleSecondsR(timeTakenR)
// //     }

// //     return (
// //         <React.Fragment>
// //             <div className='container'>
// //                 <canvas id="canvasR" width="620" height="470" penwidth='30' onPointerUp={pointerUpR}></canvas>
// //                 <div id='content'>
// //                     <div id="myDiv">
// //                         <div>{`${JSON.parse(localStorage.getItem('secondKide')).name}`}</div>
// //                         <Avatar
// //                             sx={{ width: 50, height: 50 }}
// //                             alt={'left'}
// //                             src={`http://localhost:3000/${JSON.parse(localStorage.getItem('secondKide')).image}`}
// //                         />
// //                     </div>
// //                     <progress id='progress' value={props.cchange2} max="10"></progress>
// //                     <img src='https://i.postimg.cc/qRZpdjRL/Breadcrumbs-28.png' alt="turtel" id='turtel' />
// //                     <img src='https://i.postimg.cc/pyMb27tD/Breadcrumbs-27.png' alt="bunny" id='bunny' />
// //                     {/* <input type="range" min="4" max="20" id="lineWidthR" name='lineWidthR' step="8" /> */}
// //                     <div className='lineWidthR'>
// //                         <button type='button' className='width lineWidthR20' id='oneR' value={20} onClick={(() => handleWidth(20))}></button>
// //                         <button type='button' className='width selected lineWidthR12' id='twoR' value={12} onClick={(() => handleWidth(12))}></button>
// //                         <button type='button' className='width lineWidthR4' id='threeR' value={4} onClick={(() => handleWidth(4))}></button>
// //                     </div>
// //                 </div>
// //             </div>

// //         </React.Fragment>
// //     )
// // };

// // export default RightCanvas;