/**
 * A painter service for painting onto a canvas.
 */
let Particle = function (x, y, rad, velX, velY) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.velX = velX;
    this.velY = velY;
    this.caught = false;
};

export default Particle;
