import Particle from "./particle.js";

/**
 * @param {int} canvasWidth
 * @param {int} canvasHeight
 * @constructor
 */
let System = function (canvasWidth, canvasHeight) {
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.frame = 0;
    this.caughtCount = 0;
    this.totalCount = 0;
    this.startTime = new Date();
    this.success = null;
    this.totalTime = 30;
    this.timeLeft = this.totalTime;
    this.newCountNumber = true;
};

/**
 * Update state of particles in the system.
 */
System.prototype.updateParticles = function () {

    // Iterate over particles in the system.
    for (let i = 0; i < this.particles.length; i++) {

        let particle = this.particles[i];

        if (this.success !== null) {
            particle.velY += 0.01;

            // Move the particle according to its current vertical velocity.
            particle.y += particle.velY;

            if (particle.y + particle.rad < 0) {
                this.particles.splice(i, 1);
            }

            continue;
        }

        // if the frame is a multiple of x, make a random change to the horizontal and vertical speed.
        if (this.frame % 2 === 0) {
            particle.velX = this._clamp(particle.velX + this._randomBetween(-0.3, 0.3), -2, 2);
            particle.velY = this._clamp(particle.velY + this._randomBetween(-0.3, 0.3), -2, 2);
        }

        // If particle has been caught shrink it
        if (particle.caught && particle.rad > 10) {
            particle.rad -= 0.3;
        }

        // If the particles is close to the mouse, stop it.
        if (Math.hypot(Math.abs(this.mouseX - particle.x), Math.abs(this.mouseY - particle.y)) < particle.rad) {
            particle.velX = 0;
            particle.velY = 0;

            // If particle hasn't yet been caught, mark as caught and style it.
            if (!particle.caught) {
                particle.caught = true;
                this.caughtCount ++;
            }
        }

        // If the particle is hitting the right side of the canvas, reverse its horizontal velocity.
        if (particle.x + particle.rad >= this.canvasWidth) {
            particle.velX = -Math.abs(particle.velX);
        }

        // If the particle is hitting the left side of the canvas, reverse its horizontal velocity.
        if (particle.x - particle.rad <= 0) {
            particle.velX = Math.abs(particle.velX);
        }

        // Move the particle according to its current horizontal velocity.
        particle.x += particle.velX;

        // If the particle is hitting the bottom of the canvas, reverse its vertical velocity.
        if (particle.y + particle.rad >= this.canvasHeight) {
            particle.velY = -Math.abs(particle.velY);
        }

        // If the particle is hitting the top of the canvas, reverse its vertical velocity.
        if (particle.y - particle.rad <= 0) {
            particle.velY = Math.abs(particle.velY);
        }

        // Move the particle according to its current vertical velocity.
        particle.y += particle.velY;
    }

    this.frame ++;
};

/**
 * Add particle to the system
 * @param {int} x
 * @param {int} y
 * @param {int} rad
 * @param {number} velX
 * @param {number} velY
 */
System.prototype.addParticle = function (x, y, rad, velX, velY) {
    this.particles.push(new Particle(x, y, rad, velX, velY));
};

/**
 * Return a random value between the two values passed in.
 * @param {number} low
 * @param {number} high
 * @returns {*}
 * @private
 */
System.prototype._randomBetween = function (low, high) {
    return Math.random() * (high - low) + low;
};

/**
 * Limit value passed in so that it is kept between specified min and max values.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @private
 */
System.prototype._clamp = function (value, min, max){
    return Math.max(min, Math.min(max, value))
};

/**
 * Set success to true if won, false if lost, null if in progress.
 */
System.prototype.updateState = function () {
    let timeElapsed = Math.floor((new Date() - this.startTime)/1000);
    let oldTime = this.timeLeft;
    this.timeLeft = this.totalTime - timeElapsed;
    this.newCountNumber = (oldTime !== this.timeLeft);
    let allCaught = this.caughtCount === this.totalCount;

    if (allCaught) {
        this.success = true;
    }

    if (!(this.timeLeft > 0) && !allCaught) {
        this.success = false;
    }
};

export default System;
