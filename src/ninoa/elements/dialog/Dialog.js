import { NinoaText } from "./text/Text";
import Action from "../../actions/Action";

export class NinoaDialog {

    /**
     * @type {*[]}
     */
    children;

    constructor(props) {
        const {timeline = "onClick", children} = props;

        // Transforming strings into text nodes
        const finalChildren = children.map(child => {
            if (!(typeof child == "string")) return child; // escape hatch for non-strings
            return new NinoaText({children : child});
        });

        // registering this instance as the parent of it's children.
        finalChildren.forEach(child => child.parent = this);

        this.children = finalChildren;
        this.timeline = timeline; // timeline not implemented for now.
        this.parent = null;
    }

    createAction(engineWrapper) {
        // Maybe I'll think of some action that a dialog actually does at some point.
        // Like clearing text or something.
        return new Action(() => null, ()=> null);
    }

    next(head) {
        // Need to know which child we are currently prcessing.
        const current = this.children.findIndex(child => child === head.position);

        // escape hatch if no more children to process
        if (this.children.length === current + 1) {
            return this.parent.next();
        }

        // default
        return this.children[current+1];
    }

    back(head) {
        // Need to know which child we are currently prcessing.
        const current = this.children.findIndex(child => child === head.position);

        // escape hatch if no more children to process backwards
        if (0 < current - 1) {
            return this.parent.back();
        }

        // default
        return this.children[current-1];        
    }
}

export default function Dialog(props) {
    return new NinoaDialog(props);
}