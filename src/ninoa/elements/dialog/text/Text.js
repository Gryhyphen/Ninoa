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

    next(ninoaHead) {
        return this.parent.next(ninoaHead);
    }

    back(ninoaHead) {
        return this.parent.next(ninoaHead);
    }
}

export default function Text(props) {return new NinoaText(props)};