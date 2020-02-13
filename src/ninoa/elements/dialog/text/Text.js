import Action from "../../../actions/Action"

export class NinoaText {
    constructor (props) {
        const {children} = props; // only has one child, but will be under children.

        this.text = children;
        this.timeline = "with"; // Forcing with mode for now.
        this.parent = null;
    }

    createAction(engineWrapper) {
        // Calculate Apply - concatenates text
        let apply = () => engineWrapper.setText(engineWrapper.getText() + this.text);
        // Calculate Remove - reverts to prevous state
        const currentText = engineWrapper.getText();
        let remove = () => engineWrapper.setText(currentText);
        // return the action
        return new Action(apply, remove);
    }

    onEnter(head) {
        head.engine.setText(head.engine.getText() + this.text); // ignoring history for now
    }

    onLeave(head) {
        // do nothing on leave
    }

    shouldAutoContinue() {
        return true; // ignoring timeline for now.
    }
}

export default function Text(props) {return new NinoaText(props)};