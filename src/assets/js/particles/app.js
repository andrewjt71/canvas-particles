import Painter from "./painter";
import System from "./system";

/**
 * Constructor.
 *
 * @param {Object} element
 */
let ParticlesApp = function (element) {
    this.element = element;
    this.painter = new Painter(element);
    this.system = new System(this.painter.context.canvas.width, this.painter.context.canvas.height);
};

/**
 * Initialisation method.
 */
ParticlesApp.prototype.init = function () {
    this._initiateSystem();
    this._initialiseLoop();
    this._initialiseEventListeners();
};

/**
 * Initialise the system (clear the system down)
 * @private
 */
ParticlesApp.prototype._initiateSystem = function () {
    let particleRad = 30;
    let particleGap = 40;
    let numberWidth = Math.floor(this.painter.context.canvas.width / ((particleRad * 2) + particleGap));
    let numberHeight = Math.floor(this.painter.context.canvas.height / ((particleRad * 2) + particleGap));
    let number = numberWidth * numberHeight;

    this.system.particles = [];
    this.system.caughtCount = 0;
    this.system.totalCount = number;
    this.system.startTime = new Date();
    this.system.success = null;
    this.system.timeLeft = this.system.totalTime;
    this.system.newCountNumber = true;

    for (let i = 0; i < number; i ++) {
        this.system.addParticle(
            i % numberWidth * (particleRad*2 + particleGap) + particleRad,
            Math.floor(i / numberWidth) * (particleRad * 2 + particleGap) + particleRad,
            particleRad,
            0,
            0
        );
    }
};

/**
 * Initialise event listeners for mouse movements.
 * @private
 */
ParticlesApp.prototype._initialiseEventListeners = function () {
    this.element.onmousemove = function (e) {
        this.system.mouseX = e.pageX;
        this.system.mouseY = e.pageY - this.painter.context.canvas.offsetTop;
    }.bind(this);

    // Add event listener for key ups
    document.onkeyup = function (e) {
        if (e.key === ' ') {
            this.system.particles = [];
            this._initiateSystem();
        }
    }.bind(this);

    this.element.ontouchmove = function (e) {
        this.system.mouseX = e.changedTouches[0].pageX;
        this.system.mouseY = e.changedTouches[0].pageY - this.element.offsetTop;
    }.bind(this);
};

/**
 * Initialise loop.
 * @private
 */
ParticlesApp.prototype._initialiseLoop = function () {
    setInterval(this._loop.bind(this), 1000 / 1000);
};

/**
 * Loop function.
 * @private
 */
ParticlesApp.prototype._loop = function () {
    this.painter.clear();
    this.system.updateParticles();
    this.system.updateState();
    this.painter.paintProgress(this.system);
    this.painter.paintParticles(this.system.particles);
    this.painter.paintPointer(this.system.mouseX, this.system.mouseY);
};

export default ParticlesApp;
