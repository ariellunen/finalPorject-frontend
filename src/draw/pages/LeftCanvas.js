// import React, {useEffect} from 'react';
// import interact from 'interactjs';
// import './Canvas.css';

// const LeftCanvas = (props) => {
//     let pixelSize = 5;
//     useEffect(() => {
//         interact('#canvasL')
//             .draggable({
//                 max: Infinity,
//                 origin: 'self',
//                 modifiers: [
//                     interact.modifiers.snap({
//                         targets: [
//                             interact.snappers.grid({ x: pixelSize, y: pixelSize })
//                         ]
//                     })
//                 ],
//                 listeners: {
//                     move: function (event) {
//                         let context = event.target.getContext('2d')
//                         let posx = event.clientX; 
//                         let posy = event.clientY;
//                         context.fillStyle = props.color.color;
//                         context.beginPath();
//                         context.arc(posx, posy, 20, 0, 2 * Math.PI);
//                         context.fill();
//                         props.setLeft({x:posx, y:posy})
//                         props.handleCoordinate(posx, posy);
//                     }
//                 }
//             })

//         function resizeCanvases() {
//             [].forEach.call(document.querySelectorAll('#canvasL'), function (
//                 canvas
//             ) {
//                 delete canvas.width
//                 delete canvas.height
//                 let rect = canvas.getBoundingClientRect()
//                 canvas.width = rect.width
//                 canvas.height = rect.height
//             })
//         }
//         resizeCanvases()
//         interact(window).on('resize', resizeCanvases)
//     }, [])
//     return (
//         <React.Fragment></React.Fragment>
//     )
// };

// export default LeftCanvas;





//--------Animation 1----------//
// let canvasss, ccttxx;
// let width, height, currentLayer;
// let layers = [];
// let fireworks = [];
// let particles = [];


//--------------------------------------Animation 1---------------------------------------------//
// class Layer {
//     constructor(ccttxx) {
//         this.ccttxx = ccttxx;
//         this.commands = [];
//         this.alpha = 1;
//     }
//     update(delta) {
//         this.alpha *= 1 - (0.1 * delta);
//         return this.alpha < 0.1;
//     }
//     draw() {
//         this.commands.forEach(([color, alpha, x, y, width, height]) => {
//             this.ccttxx.fillStyle = color;
//             this.ccttxx.globalAlpha = this.alpha * alpha;
//             this.ccttxx.fillRect(x, y, width, height);
//         });
//     }
// }
// class Particle {
//     constructor(x, y, col) {
//         this.x = x;
//         this.y = y;
//         this.col = col;
//         this.vel = randomVec(2);
//         this.lifetime = 0;
//     }

//     update(delta) {
//         delta = 1;
//         this.x += this.vel.x;
//         this.y += this.vel.y;
//         this.vel.y += 0.02 * delta;
//         this.vel.x *= 1 - (delta * 0.01);
//         this.vel.y *= 1 - (delta * 0.01);
//         this.lifetime += delta;
//         return this.lifetime > 80;
//     }

//     draw() {
//         const color = this.col;
//         const alpha = Math.max(1 - this.lifetime / 80, 0);
//         const x = this.x;
//         const y = this.y;
//         const rad = 2;
//         currentLayer.commands.push([color, alpha, x, y, rad, rad]);
//     }
// }

// class Firework {
//     constructor(x) {
//         this.x = x;
//         this.y = height;
//         this.isBlown = false;
//         this.col = randomCol();
//     }

//     update(delta) {
//         this.y -= 3 * delta;
//         if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
//             this.isBlown = true;
//             for (let i = 0; i < 60; i++) {
//                 particles.push(new Particle(this.x, this.y, this.col))
//             }
//         }
//         return this.isBlown;
//     }

//     draw() {
//         const color = this.col;
//         const alpha = 1;
//         const x = this.x;
//         const y = this.y;
//         const rad = 2;
//         currentLayer.commands.push([color, alpha, x, y, rad, rad]);
//     }
// }

// fireworks.push(new Firework(Math.random() * (width - 200) + 100));
// let lastTime = document.timeline?.currentTime || performance.now();
// requestAnimationFrame(loop);

// function loop(time) {
//     let delta = (time - lastTime) / (1000 / 60);
//     lastTime = time;
//     ccttxx.globalAlpha = 1;
//     // ccttxx.clearRect(0, 0, width, height);
//     ccttxx.fillStyle = "rgba(0, 0, 0, .1)";
//     ccttxx.fillRect(0, 0, width, height);
//     currentLayer = new Layer(ccttxx);
//     layers.push(currentLayer);

//     let ended = [];
//     fireworks.forEach((firework, index) => {
//         const done = firework.update(delta);
//         if (done) {
//             ended.push(index);
//         }
//         firework.draw();
//     });

//     ended.reverse().forEach((index) => {
//         fireworks.splice(index, 1);
//     });
//     ended.length = 0;

//     particles.forEach((particle, index) => {
//         const done = particle.update(delta);
//         particle.draw();
//         if (done) {
//             ended.push(index);
//         }
//     });

//     ended.reverse().forEach((index) => {
//         particles.splice(index, 1);
//     });
//     ended.length = 0;

//     layers.forEach((layer, index) => {
//         const done = layer.update(delta);
//         if (done) {
//             ended.push(index);
//         }
//         layer.draw();
//     });

//     ended.reverse().forEach((index) => {
//         layers.splice(index, 1);
//     });

//     if (Math.random() < 1 / 60) {

//         fireworks.push(new Firework(Math.random() * (width - 200) + 100));
//     }
//     requestAnimationFrame(loop);
// }

// function randomCol() {
//     let letter = '0123456789ABCDEF';
//     let nums = [];

//     for (let i = 0; i < 3; i++) {
//         nums[i] = Math.floor(Math.random() * 256);
//     }

//     let brightest = 0;
//     for (let i = 0; i < 3; i++) {
//         if (brightest < nums[i]) brightest = nums[i];
//     }

//     brightest /= 255;
//     for (let i = 0; i < 3; i++) {
//         nums[i] /= brightest;
//     }

//     let color = "#";
//     for (let i = 0; i < 3; i++) {
//         color += letter[Math.floor(nums[i] / 16)];
//         color += letter[Math.floor(nums[i] % 16)];
//     }
//     return color;
// }

// function randomVec(max) {
//     let dir = Math.random() * Math.PI * 2;
//     let spd = Math.random() * max;
//     return {
//         x: Math.cos(dir) * spd,
//         y: Math.sin(dir) * spd
//     };
// }

// function init() {
//     canvasss = document.querySelector("#canvasL");;
//     ccttxx = canvasss.getContext("2d");
//     ccttxx.globalAlpha = 0.5;
//     // ccttxx.clearRect(0, 0, width, height);
//     ccttxx.fillRect(0, 0, width, height);
//     width = canvasss.width;
//     height = canvasss.height;
// }

// window.onload = function (e) {
//     fireworks.push(new Firework(e.clientX));
//     init();
// };

//--------------------------------------Animation 2---------------------------------------------//

// let ccctttxxx, ctxx, w, h;
// let fireworks = [],
//     particles = [],
//     circles = [];
// let fireworksMax = 50;
// let fireworksChance = 0.2;
// let hue = 0;

// function init() {
//     ccctttxxx = document.querySelector("#canvasL");
//     ctxx = ccctttxxx.getContext("2d");
//     resizeReset();
//     animationLoop();
// }

// function resizeReset() {
//     w = ccctttxxx.width;
//     h = ccctttxxx.height;
//     ctxx.fillStyle = "#222";
//     ctxx.fillRect(0, 0, w, h);
//     // ctxx.clearRect(0, 0, w, h);
// }

// function animationLoop() {
//     if (fireworks.length < fireworksMax && Math.random() < fireworksChance) {
//         fireworks.push(new Firework());
//         hue += 10;
//     }
//     ctxx.globalCompositeOperation = "source-over";
//     ctxx.fillStyle = "rgba(0, 0, 0, .1)";
//     ctxx.fillRect(0, 0, w, h);
//     // ctxx.clearRect(0, 0, w, h);
//     ctxx.globalCompositeOperation = "lighter";

//     drawScene();
//     arrayCleanup();
//     requestAnimationFrame(animationLoop);
// }

// function drawScene() {
//     fireworks.map((firework) => {
//         firework.update();
//         firework.draw();
//     });
//     particles.map((particle) => {
//         particle.update();
//         particle.draw();
//     });
//     circles.map((circle) => {
//         circle.update();
//         circle.draw();
//     });
// }

// function arrayCleanup() {
//     let dump1 = [], dump2 = [], dump3 = [];

//     fireworks.map((firework) => {
//         if (firework.alpha > 0) {
//             dump1.push(firework);
//         } else {
//             createFireworks(firework.x, firework.y, firework.hue);
//         }
//     });
//     fireworks = dump1;

//     particles.map((particle) => {
//         if (particle.size > 0) dump2.push(particle);
//     });
//     particles = dump2;

//     circles.map((circle) => {
//         if (circle.size < circle.endSize) dump3.push(circle);
//     });
//     circles = dump3;
// }

// function createFireworks(x, y, hue) {
//     for (let i = 0; i < 10; i++) {
//         particles.push(new Particle(x, y, hue, i));
//     }
//     circles.push(new Circle(x, y, hue));
// }

// function getRandomInt(min, max) {
//     return Math.round(Math.random() * (max - min)) + min;
// }

// function easeOutQuart(x) {
//     return 1 - Math.pow(1 - x, 4);
// }

// class Firework {
//     constructor() {
//         this.x = getRandomInt(w * 0.3, w * 0.7);
//         this.y = h;
//         this.targetY = getRandomInt(h * 0.2, h * 0.4);
//         this.hue = hue;
//         this.alpha = 1;
//         this.tick = 0;
//         this.ttl = getRandomInt(120, 180);
//     }
//     draw() {
//         if (this.tick <= this.ttl) {
//             ctxx.beginPath();
//             ctxx.arc(this.x, this.y, 3, 0, Math.PI * 2);
//             ctxx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
//             ctxx.fill();
//             ctxx.closePath();
//         }
//     }
//     update() {
//         // ctxx.clearRect(0, 0, w, h);
//         // ctxx.globalAlpha = 0.5;
//         let progress = 1 - (this.ttl - this.tick) / this.ttl;
//         this.y = h - (h - this.targetY) * easeOutQuart(progress);
//         this.alpha = 1 - easeOutQuart(progress);
//         this.tick++;
//     }
// }

// class Particle {
//     constructor(x, y, hue, i) {
//         this.x = x;
//         this.y = y;
//         this.hue = hue;
//         this.size = getRandomInt(2, 3);
//         this.speed = getRandomInt(30, 40) / 10;
//         this.angle = getRandomInt(0, 36) + 36 * i;
//     }
//     draw() {
//         if (this.size > 0) {
//             ctxx.beginPath();
//             ctxx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctxx.fillStyle = `hsla(${this.hue}, 100%, 50%, 1)`;
//             ctxx.fill();
//             ctxx.closePath();
//         }
//     }
//     update() {
//         this.radian = (Math.PI / 180) * this.angle;
//         this.x += this.speed * Math.sin(this.radian);
//         this.y += this.speed * Math.cos(this.radian);
//         this.size -= 0.05;
//     }
// }

// class Circle {
//     constructor(x, y, hue) {
//         this.x = x;
//         this.y = y;
//         this.hue = hue;
//         this.size = 0;
//         this.endSize = getRandomInt(100, 130);
//     }
//     draw() {
//         if (this.size < this.endSize) {
//             ctxx.beginPath();
//             ctxx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//             ctxx.fillStyle = `hsla(${this.hue}, 100%, 60%, .2)`;
//             ctxx.fill();
//             ctxx.closePath();
//         }
//     }
//     update() {
//         this.size += 15;
//     }
// }

// window.onload = function () {
//     init();
//     resizeReset();
// };

//---------------------------------------------------------------------------------------------//

import React, { useEffect, useRef, useState } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleL";
import triangularCor from "../shape/TriangularL"
import heartCor from "../shape/HeartL"
import davidCor from "../shape/DavidL"
import homeCor from "../shape/HomeL"
let flagCnc = true;

let canvas;
let down;
let timeTakenL = 0;
let ctx;
let context;
let uploadCoor;
let p;
let x, y;
let flag = true;
let area;
let fill;
let fillPercentage;
let selectedShape;
let colorr;
let lineee;
const LeftCanvas = (props) => {
    selectedShape = sessionStorage.getItem("selectedShape");
    const [color, setColor] = useState('LightGrey');
    const [line, setLine] = useState('20');
    //check if it sync
    // if (Math.abs(props.cchange2 - props.cchange1) > 2) {
    //     flagCnc = false;
    // }
    // else {
    //     flagCnc = true;
    // }
    useEffect(() => {
        ctx = document.getElementById("canvasL")
        context = ctx.getContext('2d');
        setLine(document.getElementById("lineWidthL").value);
        lineee = document.getElementById("lineWidthL").value;
        if (Math.abs(props.cchange2 - props.cchange1) > 2 || props.cchange2 === 0) {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthL").value;
            setLine(document.getElementById("lineWidthL").value);
            lineee = document.getElementById("lineWidthL").value;
            colorr = 'LightGrey'
            context.strokeStyle = 'LightGrey';
            setColor('LightGrey')
            context.lineTo(x, y);
            context.stroke();
        }

        else {
            context.beginPath();
            context.lineWidth = document.getElementById("lineWidthL").value;
            setLine(document.getElementById("lineWidthL").value);
            context.strokeStyle = props.color;
            setColor(props.color)
            context.lineTo(x, y);
            context.stroke();
            lineee = document.getElementById("lineWidthL").value;
            colorr = props.color
        }
        // on pointer down
        interact('#canvasL').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = document.getElementById("lineWidthL").value;
            setLine(document.getElementById("lineWidthL").value);
            canvas.strokeStyle = 'LightGrey';
            setColor('LightGrey')
            props.setMouseL(false);
            lineee = document.getElementById("lineWidthL").value;
            colorr = 'LightGrey'
        })

        interact('#canvasL').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenL = Date.now() - down;
            props.secondsL.push(timeTakenL / 1000);
            props.setLeft({ x: -1, y: -1, color: colorr, line: lineee })
            props.setMouseL(true);
            canvas.stroke();
            quantityPixels();
        })
        interact('#canvasL')
            .draggable({
                max: Infinity,
                origin: 'self',
                modifiers: [
                    interact.modifiers.snap({
                        targets: [
                            // interact.snappers.grid({ x: pixelSize, y: pixelSize })
                        ]
                    })
                ],
                listeners: {
                    move: function (event) {
                        // if (!flagCnc) {
                        //     changeToWhite()
                        // }
                        // else {
                        //     changeToColor()
                        // }
                        x = event.clientX;
                        y = event.clientY;
                        // if (x > 0 && x < 800 && y > 0 && y < 800) {
                        //     indexCheck(x, y);
                        // }
                        // if (flag) {
                        canvas.lineTo(event.clientX, event.clientY);
                        // }
                        // canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setLeft({ x: event.clientX, y: event.clientX, color: colorr, line: lineee })
                        props.handleCoordinate(event.clientX, event.clientY, colorr, lineee);
                    }
                }
            })
        function resizeCanvases() {
            [].forEach.call(document.querySelectorAll('#canvasL'), function (
                canvas
            ) {
                delete canvas.width
                delete canvas.height
                // let rect = canvas.getBoundingClientRect()
                // canvas.width = rect.width
                // canvas.height = rect.height
            })
        }
        resizeCanvases()
        // interact(window).on('resize', resizeCanvases)
        // }, [props.cchange2, props.cchange1, color, line, props])
    }, [props.cchange2, props.cchange1])



    // const id = setInterval(() => {
    //     startTimerrr();
    // }, 500)

    // const startTimerrr = () => {
    //     props.handleCoordinate(x, y);
    // }

    useEffect(() => {
        ctx = document.getElementById("canvasL");
        context = ctx.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, ctx.width, ctx.height);
        shapesSelected('Ivory');
        fileUpload();
        quantityPixelsArea();
    }, []);


    //Filiing in grey
    const changeToWhite = () => {
        let arr = props.arr;
        if (flagCnc) {
            return
        }
        for (let i = 1; i < arr.length - 1; i++) {
            context.lineWidth = document.getElementById("lineWidthL").value;
            context.strokeStyle = 'LightGrey';

            if (arr[i].l.x === -1) {
                context.closePath();
            }
            else if (arr[i].l.x !== -1 && arr[i + 1].l.x !== -1) {
                context.beginPath();
                context.moveTo(arr[i].l.x, arr[i].l.y);
                context.lineTo(arr[i + 1].l.x, arr[i + 1].l.y);
                context.stroke();
            }
        }
        context.stroke();
    }


    const quantityPixelsArea = () => {
        p = context.getImageData(0, 0, ctx.width, ctx.height).data;
        area = 0;
        for (let i = 0; i < p.length / 4; i += 4) {
            if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
                area++
            }
        }
        console.log(area);
    }

    // const quantityPixels = () => {
    //     p = context.getImageData(0, 0, ctx.width, ctx.height).data;
    //     console.log(p);
    //     console.log(p.length / 16);
    //     fill = 0;
    //     background = 0;
    //     white = 0;
    //     for (let i = 0; i < p.length / 4; i += 4) {
    //         if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255){
    //             background ++
    //         }
    //         else if (p[i] !== 255 || p[i + 1] !== 255 || p[i + 2] !== 255 || p[i + 3] !== 255) {
    //             fill++;
    //         }
    //         else {
    //             white ++;
    //         }
    //     }
    //     console.log(background);
    //     console.log(fill);
    //     console.log(white);
    // }

    const shapesSelected = (color) => {
        switch (selectedShape) {
            case 'circle':
                uploadCoor = circleCor;
                filling2(800, 400, 390, color)
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                filling(800, 10, 250, 790, 800, 790, color)
                break;
            case 'heart':
                uploadCoor = heartCor;
                filling(800, 150, 350, 150, 800, 750, color)
                filling8(800, 150, 700, 50, 400, 50, 350, 150, color)
                filling8(350, 150, 250, 350, 600, 700, 800, 750, color)
                break;
            case 'david':
                uploadCoor = davidCor;
                filling(800, 20, 300, 650, 800, 650, color)
                filling(800, 140, 300, 140, 800, 780, color)
                break;
            case 'home':
                uploadCoor = homeCor;
                filling(800, 10, 250, 400, 800, 400, color)
                filling4(800, 400, 550, 400, 550, 550, 800, 550, color)
                filling4(700, 550, 550, 550, 550, 780, 700, 780, color)
                filling4(700, 780, 700, 550, 800, 550, 800, 780, color)
                break;
            default:
                uploadCoor = circleCor;
                filling2(800, 400, 390, color)
                break;
        }

    }

    const quantityPixels = () => {
        p = context.getImageData(0, 0, ctx.width, ctx.height).data;
        fill = 0;
        for (let i = 0; i < p.length / 4; i += 4) {
            if (p[i] === 255 && p[i + 1] === 255 && p[i + 2] === 240 && p[i + 3] === 255) {
                fill++
            }
        }
        fillPercentage = ((area - fill) * 100) / area;
        if (fillPercentage > 95) {
            context.clearRect(0, 0, ctx.width, ctx.height);
            shapesSelected(props.color);
            viewDrawing();
        }
    }

    const indexCheck = (x, y) => {
        const { data } = context.getImageData(x, y, 1, 1);
        // console.log(data[2])
        if (data[2] === 240) {
            flag = true;
        }
        else {
            flag = false;
        }
    }

    //Upload the drawing
    let coordinates = [];
    const dda = (x0, y0, x1, y1) => {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    };

    const circle = (x1, y1, r) => {
        context.beginPath();
        context.arc(x1, y1, r, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    }

    const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        context.beginPath();
        context.moveTo(x0, y0);
        context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        context.lineWidth = 10;
        context.strokeStyle = 'black';
        context.stroke();
    }

    const filling = (x1, y1, x2, y2, x3, y3, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    const filling2 = (x1, y1, r, color) => {
        context.beginPath();
        context.arc(x1, y1, r, 0, 2 * Math.PI);
        context.lineWidth = 10;
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = 'black';
        context.stroke();
    }

    const filling4 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    const filling8 = (x1, y1, x2, y2, x3, y3, x4, y4, color) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.bezierCurveTo(x2, y2, x3, y3, x4, y4);
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = color;
        context.stroke();
    }

    const fileUpload = () => {
        if (uploadCoor) {
            coordinates = []
            const lines = uploadCoor.split('\n')
            for (let i = 0; i < lines.length; i++) {
                const values = lines[i].split(',')
                coordinates.push([])
                for (let j = 0; j < values.length; j++) {
                    coordinates[i].push(parseInt(values[j]))
                }
            }
            viewDrawing()
        }
    }

    const viewDrawing = () => {
        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i].length === 3) {
                circle(coordinates[i][0], coordinates[i][1], coordinates[i][2])
            } else if (coordinates[i].length === 4) {
                dda(coordinates[i][0], coordinates[i][1],
                    coordinates[i][2], coordinates[i][3])
            } else if (coordinates[i].length === 8) {
                bezierCurve(coordinates[i][0], coordinates[i][1], coordinates[i][2],
                    coordinates[i][3], coordinates[i][4], coordinates[i][5],
                    coordinates[i][6], coordinates[i][7])
            }
        }
    }

    return (
        <React.Fragment>
            <div>
                {/* <canvas id="canvasL" width="620" height="470"></canvas> */}
                <canvas id="canvasL" width="800" height="800"></canvas>
                <div>
                    <input type="range" min="4" max="20" id="lineWidthL" name='lineWidthL' step="8" />
                    <output for="lineWidthL"></output>
                </div>
            </div>


        </React.Fragment >
    )
};
export default LeftCanvas;