export default class MonogatariWrapper {
    constructor(engine) {
        this.engine = engine;
        this.text = "";
        this.delay = 0;
    }
    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }

    setDelay(delay) {
        this.delay = delay;
    }
    getDelay() {
        return this.delay;
    }

    getTypeSpeed() {
        return this.engine.globals().textObject.typeSpeed;
    }

    setTypeSpeed(speed) {
        this.engine.globals().textObject.typeSpeed = speed;
    }

    showCurrentText() {
        this.engine.run(this.text, false);
    }
}
