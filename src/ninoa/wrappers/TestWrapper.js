export default class TestWrapper {
    constructor() {
        this.text = "";
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    showCurrentText() {
        console.log(this.text);
    }
}