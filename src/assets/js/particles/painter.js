/**
 * A painter service for painting onto a canvas.
 */
let Painter = function (element) {
    // Create a context with a canvas.
    this.context = function () {
        let canvas = document.createElement('canvas');
        element.append(canvas);
        canvas.width = element.offsetWidth;
        canvas.height = element.offsetHeight;

        return canvas.getContext('2d');
    }();

    this.countSize = 80;
};

/**
 * @param {array} particles
 */
Painter.prototype.paintParticles = function (particles) {
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        this._paintParticle(particle);
    }
};

/**
 * Paint a ring on the canvas.
 * @private
 */
Painter.prototype._paintParticle = function (particle) {
    this.context.beginPath();
    this.context.lineWidth = '1';

    this.context.arc(particle.x, particle.y, particle.rad, 0,2*Math.PI);

    if (particle.caught) {
        this.context.fillStyle = 'orange';
    } else {
        this.context.fillStyle = '#8ED6FF';
    }

    this.context.strokeStyle = 'blue';
    this.context.fill();
    this.context.stroke();
};

/**
 * Paint the game progress on the screen.
 * @param {int} count
 * @param {int} total
 * @param {int} timeLeft
 * @param {int} newCountNumber
 */
Painter.prototype._paintCount = function (count, total, timeLeft, newCountNumber) {
    let text = count.toString() + '/' + total.toString();
    this.context.lineWidth = '1';
    this.context.font = "100px Fredoka One";
    this.context.fillStyle = 'grey';
    this.context.textAlign = 'center';
    this.context.fillText(text, this.context.canvas.width/2, this.context.canvas.height/2 - 50);

    this.countSize = newCountNumber ? 100 : this.countSize - 0.1;
    this.context.font = this.countSize.toString() + "px Fredoka One";
    this.context.fillStyle = timeLeft > 10 ? '#7f8793' : '#f02e2e';
    this.context.textAlign = 'center';
    this.context.fillText(timeLeft.toString(), this.context.canvas.width/2, this.context.canvas.height/2 + 50);
};

/**
 * @param {boolean} success
 * @private
 */
Painter.prototype._paintResult = function (success) {
    this.context.fillStyle = success ? '#98B280' : '#FF7259';
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    let textResult = success ? 'YAY!' : 'BOO!';
    this.context.fillStyle = 'white';
    this.context.lineWidth = '1';
    this.context.font = "150px Fredoka One";
    this.context.textAlign = 'center';
    this.context.fillText(textResult, this.context.canvas.width/2, this.context.canvas.height/2);

    this.context.font = "40px Fredoka One";
    let textRetry1 = 'hit space or refresh';
    let textRetry2 = 'to retry';
    this.context.fillText(textRetry1, this.context.canvas.width/2, this.context.canvas.height/2 + 100);
    this.context.fillText(textRetry2, this.context.canvas.width/2, this.context.canvas.height/2 + 200);
};

/**
 * @param {System} system
 */
Painter.prototype.paintProgress = function (system) {
    if (system.success == null) {
        this._paintCount(system.caughtCount, system.totalCount, system.timeLeft, system.newCountNumber);

        return;
    }

    this._paintResult(system.success);
};

/**
 * Paint the mouse pointer
 * @param {int} x
 * @param {int} y
 */
Painter.prototype.paintPointer = function (x, y)
{
    this.context.beginPath();
    this.context.arc(x, y, 20, 0,2*Math.PI);
    this.context.fillStyle = '#f02e2e';
    this.context.strokeStyle = 'black';
    this.context.lineWidth = '2';
    this.context.fill();
    this.context.stroke();
};

/**
 * Clear the canvas.
 */
Painter.prototype.clear = function () {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

export default Painter;
