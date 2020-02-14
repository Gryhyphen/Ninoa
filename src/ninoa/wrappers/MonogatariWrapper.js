export default class MonogatariWrapper {
    constructor(engine) {
        this.engine = engine;
        this.text = "";
    }
    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
    showCurrentText() {
        this.engine.run(this.text, false);
    }
}
