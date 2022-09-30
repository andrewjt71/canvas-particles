import "../css/variables.scss";
import "../css/base.scss";
import "../css/header.scss";
import "../css/particles.scss";
import ParticlesApp from "./particles/app";

window.onload = function () {
    if (document.getElementsByClassName("particles-app").length) {
        let particles = new ParticlesApp(document.getElementsByClassName("particles-app")[0]);
        particles.init();
    }
};
