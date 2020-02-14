import Action from "../../../actions/Action"

export class NinoaText {
    constructor (props) {
        const {children} = props; // only has one child, but will be under children.

        this.text = children;
        this.timeline = "with"; // Forcing with mode for now.
        this.parent = null;
    }

    createEnterAction(engineWrapper) {
        // Calculate Apply - concatenates text
        let apply = () => engineWrapper.setText(engineWrapper.getText() + this.text);
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

export default function Text(props) {return new NinoaText(props)};