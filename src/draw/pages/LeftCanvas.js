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


import React, { useEffect } from 'react';
import interact from 'interactjs';
import './Canvas.css';
import circleCor from "../shape/CircleL";
import triangularCor from "../shape/TriangularL"
import heartCor from "../shape/HeartL"
import davidCor from "../shape/DavidL"
import homeCor from "../shape/HomeL"

let canvas;
let down;
let timeTakenL = 0;
let ctx;
let lineWidth;
let uploadCoor;

//--------Animation 1----------//
// let canvasss, ccttxx;
// let width, height, currentLayer;
// let layers = [];
// let fireworks = [];
// let particles = [];

const LeftCanvas = (props) => {
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

    let ccctttxxx, ctxx, w, h;
    let fireworks = [],
        particles = [],
        circles = [];
    let fireworksMax = 50;
    let fireworksChance = 0.2;
    let hue = 0;

    function init() {
        ccctttxxx = document.querySelector("#canvasL");
        ctxx = ccctttxxx.getContext("2d");
        resizeReset();
        animationLoop();
    }

    function resizeReset() {
        w = ccctttxxx.width;
        h = ccctttxxx.height;
        ctxx.fillStyle = "#222";
        ctxx.fillRect(0, 0, w, h);
        // ctxx.clearRect(0, 0, w, h);
    }

    function animationLoop() {
        if (fireworks.length < fireworksMax && Math.random() < fireworksChance) {
            fireworks.push(new Firework());
            hue += 10;
        }
        ctxx.globalCompositeOperation = "source-over";
        ctxx.fillStyle = "rgba(0, 0, 0, .1)";
        ctxx.fillRect(0, 0, w, h);
        // ctxx.clearRect(0, 0, w, h);
        ctxx.globalCompositeOperation = "lighter";

        drawScene();
        arrayCleanup();
        requestAnimationFrame(animationLoop);
    }

    function drawScene() {
        fireworks.map((firework) => {
            firework.update();
            firework.draw();
        });
        particles.map((particle) => {
            particle.update();
            particle.draw();
        });
        circles.map((circle) => {
            circle.update();
            circle.draw();
        });
    }

    function arrayCleanup() {
        let dump1 = [], dump2 = [], dump3 = [];

        fireworks.map((firework) => {
            if (firework.alpha > 0) {
                dump1.push(firework);
            } else {
                createFireworks(firework.x, firework.y, firework.hue);
            }
        });
        fireworks = dump1;

        particles.map((particle) => {
            if (particle.size > 0) dump2.push(particle);
        });
        particles = dump2;

        circles.map((circle) => {
            if (circle.size < circle.endSize) dump3.push(circle);
        });
        circles = dump3;
    }

    function createFireworks(x, y, hue) {
        for (let i = 0; i < 10; i++) {
            particles.push(new Particle(x, y, hue, i));
        }
        circles.push(new Circle(x, y, hue));
    }

    function getRandomInt(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    class Firework {
        constructor() {
            this.x = getRandomInt(w * 0.3, w * 0.7);
            this.y = h;
            this.targetY = getRandomInt(h * 0.2, h * 0.4);
            this.hue = hue;
            this.alpha = 1;
            this.tick = 0;
            this.ttl = getRandomInt(120, 180);
        }
        draw() {
            if (this.tick <= this.ttl) {
                ctxx.beginPath();
                ctxx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctxx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
                ctxx.fill();
                ctxx.closePath();
            }
        }
        update() {
            let progress = 1 - (this.ttl - this.tick) / this.ttl;
            this.y = h - (h - this.targetY) * easeOutQuart(progress);
            this.alpha = 1 - easeOutQuart(progress);
            this.tick++;
        }
    }

    class Particle {
        constructor(x, y, hue, i) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            this.size = getRandomInt(2, 3);
            this.speed = getRandomInt(30, 40) / 10;
            this.angle = getRandomInt(0, 36) + 36 * i;
        }
        draw() {
            if (this.size > 0) {
                ctxx.beginPath();
                ctxx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctxx.fillStyle = `hsla(${this.hue}, 100%, 50%, 1)`;
                ctxx.fill();
                ctxx.closePath();
            }
        }
        update() {
            this.radian = (Math.PI / 180) * this.angle;
            this.x += this.speed * Math.sin(this.radian);
            this.y += this.speed * Math.cos(this.radian);
            this.size -= 0.05;
        }
    }

    class Circle {
        constructor(x, y, hue) {
            this.x = x;
            this.y = y;
            this.hue = hue;
            this.size = 0;
            this.endSize = getRandomInt(100, 130);
        }
        draw() {
            if (this.size < this.endSize) {
                ctxx.beginPath();
                ctxx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctxx.fillStyle = `hsla(${this.hue}, 100%, 60%, .2)`;
                ctxx.fill();
                ctxx.closePath();
            }
        }
        update() {
            this.size += 15;
        }
    }

    window.onload = function () {
        init();
        resizeReset();
    };



    let selectedShape = sessionStorage.getItem("selectedShape");
    // const lineWidth = 36; //12 / 24 / 36
    lineWidth = props.lineWidthL;
    console.log(lineWidth);
    const shadowColor = '#333';
    const shadowBlur = lineWidth / 4;

    const state = {
        mousedown: false
    };

    useEffect(() => {
        // on pointer down
        interact('#canvasL').on('down', function (event) {
            canvas = event.target.getContext('2d')
            event.preventDefault();
            event.stopPropagation();
            down = Date.now();
            canvas.beginPath();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = props.color.color;
            canvas.shadowColor = null;
            canvas.shadowBlur = null;
            props.setMouseL(false);

        })

        interact('#canvasL').on('up', function (event) {
            event.preventDefault();
            event.stopPropagation();
            timeTakenL = Date.now() - down;
            props.secondsL.push(timeTakenL / 1000);
            props.setLeft({ x: -1, y: -1 })
            props.setMouseL(true);
            if (state.mousedown) {
                canvas.shadowColor = shadowColor;
                canvas.shadowBlur = shadowBlur;
                canvas.fillStyle = 'red'
                canvas.stroke();
            }
            state.mousedown = false;
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
                        canvas.fillStyle = 'red'
                        canvas.lineTo(event.clientX, event.clientY);
                        canvas.stroke();
                        props.setLeft({ x: event.clientX, y: event.clientY });
                        props.handleCoordinate(event.clientX, event.clientY);
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


    }, [])

    useEffect(() => {
        ctx = document.getElementById("canvasL").getContext('2d');
        switch (selectedShape) {
            case 'circle':
                uploadCoor = circleCor;
                break;
            case 'triangular':
                uploadCoor = triangularCor;
                break;
            case 'heart':
                uploadCoor = heartCor;
                break;
            case 'david':
                uploadCoor = davidCor;
                break;
            case 'home':
                uploadCoor = homeCor;
                break;
        }
        fileUpload();

    }, []);

    //Upload the drawing
    let coordinates = [];
    const dda = (x0, y0, x1, y1) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    };

    const circle = (x1, y1, r) => {
        let x = 0
        let y = r
        let p = 3 - 2 * x
        ctx.beginPath();
        ctx.arc(x1, y1, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    const bezierCurve = (x0, y0, x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        ctx.stroke();
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
        console.log(coordinates);
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
            <canvas id="canvasL" width="800" height="800"></canvas>
        </React.Fragment>
    )
};
export default LeftCanvas;