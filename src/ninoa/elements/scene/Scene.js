export class NinoaScene {

    /**
     * @type *[]
     */
    children;

    constructor(props) {
        const {children, timeline = "with"} = props;

        // registering this instance as the parent of it's children.
        children.forEach(child => child.parent = this);

        // TODO - fix this to work the correct way and not the hacky way.
        // Make first child have "with" timeline unless the child overwrites it //
        // Have to do it this way as I don't currently lazily create the children,
        // thus I can't leave it to a "prop" merge abstraction.
        if (children[0].timeline === null) {
            children[0].timeline = "with";
        }

        this.children = children;
        this.timeline = timeline; // timeline not implemented for now.
        this.parent = null;
    }

    createAction(engineWrapper) {
        // Maybe I'll think of some action that a scene actually does at some point.
        return new Action(() => null, ()=> null);
    }

    onEnter(head) {
        // TODO
        // When the head is at a scene, it must move to a child as it cannot rest on a scene.
        // i.e. timeline "onClick" is invalid for scene.
        // I should throw error if no children/provide a better error message.
        // UPDATE
        // Used to tell the head to move in this lifecycle but now I handle node traversing differently
        // The above comments are still important tho. Need to implement it elsewhere.
    }

    onLeave(head) {
        // Do nothing on leave
    }

    shouldAutoContinue() {
        return true;
    }
}

export default function Scene(props) {
    return new NinoaScene(props);
}