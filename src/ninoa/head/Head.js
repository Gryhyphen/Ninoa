export default class Head {
    constructor(position, engineWrapper) {
        this.position = position;
        this.engine = engineWrapper;
    }

    init() {
        this.position.onEnter(this);
    }

    next() {
        this.position.onLeave(this);
        this.position = this.position.next(this);
        this.position.onEnter(this);
    }

    continue() { // Continue might be a better semantic? Like a debugger.
        this.next();
        // this.position.onHalt(); // Need to add an onHalt() lifecycle method to elements
        // Maybe not, didn't seem to help
    }

    back() {
        this.position = this.position.back(this);
    }
}