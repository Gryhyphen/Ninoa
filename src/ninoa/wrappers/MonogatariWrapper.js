import monogatari from "@monogatari/core";

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

    addTypeSpeedUpdate(timeout, speed) {
        const element = this.engine.element(true, true);

        const waitForTextToRender = (e) => {
            // Always remove self so this only fires once.
            // each speedUpdate is their own function every time addTypeSpeedAnimation is called.
            element.removeEventListener('didRunAction', waitForTextToRender);
            
            // Add typespeed update.
            setTimeout(() => {
                this.engine.globals().textObject.typeSpeed = speed;
            }, timeout);

        };
        
        element.addEventListener('didRunAction', waitForTextToRender);

    }

    showCurrentText() {
        this.engine.run(this.text, false);
    }
}
