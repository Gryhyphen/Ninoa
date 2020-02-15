import Action from "../../../../actions/Action"

export class NinoaSpeed {
    constructor (props) {
        const {children, duration} = props; // only has one child, but will be under children.

        this.text = children[0];
        this.duration = duration;
        this.timeline = "with"; // Forcing with mode for now.
        this.parent = null;
    }

    /**
     * @TODO - implment something to strip richtext from speed...
     * Wait, speed can't be a leaf node as texteffects can be children of other text effects.
     * uhoh. think about that later.
     * @returns {string}
     */
    textWithoutRichText () {
        return this.text;
    }

    createEnterAction(engineWrapper) {
        // Calculate Apply - concatenates text
        let apply = () => {
            // calculate speed effect
            const length = this.textWithoutRichText().length;
            const speed = this.duration / length;

            // Figureout if playing with or after
            const startTime = engineWrapper.getDelay();
            const orignalSpeed = engineWrapper.getTypeSpeed();

            //if (this.timeline === "with") { //ignoring timeline
            setTimeout(() => {
                engineWrapper.setTypeSpeed(speed);
            }, startTime);

            setTimeout(() => {
                engineWrapper.setTypeSpeed(orignalSpeed);
            }, this.duration + startTime);

            engineWrapper.setDelay(startTime + this.duration);
            //}

            //monogatari.globals().textObject.typeSpeed = 500
            // speed = distance / time.

            //const startTime = t
            //setTimeout()

            engineWrapper.setText(engineWrapper.getText() + this.text);
        } 
        // Calculate Remove - reverts to prevous state
        const currentText = engineWrapper.getText();
        let remove = () => engineWrapper.setText(currentText);
        // return the action
        return new Action(apply, remove);
    }

    onEnter(head) {
        return this.createEnterAction(head.engine);
    }

    onLeave(head) {
        // TODO
        // If stoping on a text node
        if (this.timeline === "after") {} // Something like this to specify to render the dialog so far.
    }

    shouldAutoContinue() {
        return true; // ignoring timeline for now.
    }
}

export default function Speed(props) {return new NinoaSpeed(props)};