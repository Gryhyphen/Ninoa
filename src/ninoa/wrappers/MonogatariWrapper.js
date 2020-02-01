export default class MonogatariWrapper {
    constructor(engine) {
        this.engine = engine;
        this.text = "";
    }
    setText(text) {
        this.text = text;
    }
    getText(text) {
        this.text = text;
    }
    showCurrentText() {
        this.engine.run(this.text, false);
    }
}
