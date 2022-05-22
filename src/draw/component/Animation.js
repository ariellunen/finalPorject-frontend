import React from 'react';

let canvasss, ccttxx;
let width, height, currentLayer;
let layers = [];
let fireworks = [];
let particles = [];

const FireworksAnimation = (props) => {
    class Layer {
        constructor(ccttxx) {
            this.ccttxx = ccttxx;
            this.commands = [];
            this.alpha = 1;
        }
        update(delta) {
            this.alpha *= 1 - (0.1 * delta);
            return this.alpha < 0.1;
        }
        draw() {
            this.commands.forEach(([color, alpha, x, y, width, height]) => {
                this.ccttxx.fillStyle = color;
                this.ccttxx.globalAlpha = this.alpha * alpha;
                this.ccttxx.fillRect(x, y, width, height);
            });
        }
    }
    class Particle {
        constructor(x, y, col) {
            this.x = x;
            this.y = y;
            this.col = col;
            this.vel = randomVec(2);
            this.lifetime = 0;
        }

        update(delta) {
            delta = 1;
            this.x += this.vel.x;
            this.y += this.vel.y;
            this.vel.y += 0.02 * delta;
            this.vel.x *= 1 - (delta * 0.01);
            this.vel.y *= 1 - (delta * 0.01);
            this.lifetime += delta;
            return this.lifetime > 80;
        }

        draw() {
            const color = this.col;
            const alpha = Math.max(1 - this.lifetime / 80, 0);
            const x = this.x;
            const y = this.y;
            const rad = 2;
            currentLayer.commands.push([color, alpha, x, y, rad, rad]);
        }
    }

    class Firework {
        constructor(x) {
            this.x = x;
            this.y = height;
            this.isBlown = false;
            this.col = randomCol();
        }

        update(delta) {
            this.y -= 3 * delta;
            if (this.y < 350 - Math.sqrt(Math.random() * 500) * 40) {
                this.isBlown = true;
                for (let i = 0; i < 60; i++) {
                    particles.push(new Particle(this.x, this.y, this.col))
                }
            }
            return this.isBlown;
        }

        draw() {
            const color = this.col;
            const alpha = 1;
            const x = this.x;
            const y = this.y;
            const rad = 2;
            currentLayer.commands.push([color, alpha, x, y, rad, rad]);
        }
    }

    fireworks.push(new Firework(Math.random() * (width - 200) + 100));
    let lastTime = document.timeline?.currentTime || performance.now();
    requestAnimationFrame(loop);

    function loop(time) {
        let delta = (time - lastTime) / (1000 / 40);
        lastTime = time;
        // ccttxx.globalAlpha = 1;
        ccttxx.globalAlpha = 0.5;
        ccttxx.clearRect(0, 0, width, height);
        currentLayer = new Layer(ccttxx);
        layers.push(currentLayer);

        let ended = [];
        fireworks.forEach((firework, index) => {
            const done = firework.update(delta);
            if (done) {
                ended.push(index);
            }
            firework.draw();
        });

        ended.reverse().forEach((index) => {
            fireworks.splice(index, 1);
        });
        ended.length = 0;

        particles.forEach((particle, index) => {
            const done = particle.update(delta);
            particle.draw();
            if (done) {
                ended.push(index);
            }
        });

        ended.reverse().forEach((index) => {
            particles.splice(index, 1);
        });
        ended.length = 0;

        layers.forEach((layer, index) => {
            const done = layer.update(delta);
            if (done) {
                ended.push(index);
            }
            layer.draw();
        });

        ended.reverse().forEach((index) => {
            layers.splice(index, 1);
        });

        if (Math.random() < 1 / 60) {

            fireworks.push(new Firework(Math.random() * (width - 200) + 100));
        }
        requestAnimationFrame(loop);
    }

    function randomCol() {
        let letter = '0123456789ABCDEF';
        let nums = [];

        for (let i = 0; i < 3; i++) {
            nums[i] = Math.floor(Math.random() * 256);
        }

        let brightest = 0;
        for (let i = 0; i < 3; i++) {
            if (brightest < nums[i]) brightest = nums[i];
        }

        brightest /= 255;
        for (let i = 0; i < 3; i++) {
            nums[i] /= brightest;
        }

        let color = "#";
        for (let i = 0; i < 3; i++) {
            color += letter[Math.floor(nums[i] / 16)];
            color += letter[Math.floor(nums[i] % 16)];
        }
        return color;
    }

    function randomVec(max) {
        let dir = Math.random() * Math.PI * 2;
        let spd = Math.random() * max;
        return {
            x: Math.cos(dir) * spd,
            y: Math.sin(dir) * spd
        };
    }

    function init() {
        canvasss = document.querySelector("#canvasL");;
        ccttxx = canvasss.getContext("2d");
        fireworks.push(new Firework(e.clientX));
        width = canvasss.width;
        height = canvasss.height;
    }
    console.log(width);

    window.onload = function (e) {
        fireworks.push(new Firework(e.clientX));
        init();
    };
};

export default FireworksAnimation;