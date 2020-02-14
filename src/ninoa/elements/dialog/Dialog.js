import { NinoaText } from "./text/Text";
import Action from "../../actions/Action";

export class NinoaDialog {

    /**
     * @type {*[]}
     */
    children;

    constructor(props) {
        // Timeline should not equal null by default
        // But I'm having trouble merging props as currently the children are created before the parent
        // because I'm not lazily creating the children.
        // whoops!
        // I just need a value to say "not specified by user so I can be overwritten."
        const {timeline = null, children} = props;

        // Transforming strings into text nodes
        const finalChildren = children.map(child => {
            if (!(typeof child == "string")) return child; // escape hatch for non-strings
            return new NinoaText({children : child});
        });

        // registering this instance as the parent of it's children.
        finalChildren.forEach(child => child.parent = this);

        this.children = finalChildren;
        this.timeline = timeline; // timeline only partly implemented for autoContinue.
        this.parent = null;
    }

    createLeaveAction(engineWrapper) {
        const apply = () => {
            engineWrapper.showCurrentText();
            engineWrapper.setText("");
        }

        const remove = () => {
            // TODO - honestly dunno how to revert a dialog at this stage yet.
        }

        return new Action(apply, remove);
    }

    onEnter(head) {
        // do nothing on enter.
    }

    onLeave(head) {
        return this.createLeaveAction(head.engine);
    }

    shouldAutoContinue() {
        if (this.timeline === "with" || this.timeline === "after") {
            return true;
        }
        return false; // ignoring timeline for now
    }
    
}

export default function Dialog(props) {
    return new NinoaDialog(props);
}