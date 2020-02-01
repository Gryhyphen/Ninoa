export class NinoaScene {

    /**
     * @type *[]
     */
    children;

    constructor(props) {
        const {children, timeline = "with"} = props;

        // registering this instance as the parent of it's children.
        children.forEach(child => child.parent = this);

        this.children = children;
        this.timeline = timeline; // timeline not implemented for now.
        this.parent = null;
    }

    createAction(engineWrapper) {
        // Maybe I'll think of some action that a scene actually does at some point.
        return new Action(() => null, ()=> null);
    }

    next(head) {
        // Need to know which child we are currently processing.
        // returns -1 if head is not located in direct children.
        const current = this.children.findIndex(child => child === head.position);

        // escape hatch if no more children to process
        if (this.children.length === current + 1) {
            head.position = this;
            return this.parent.next();
        }

        // default
        // Note if current is not a direct child, then current + 1 will give 0.
        return this.children[current+1];
    }

    back(head) {
        // Need to know which child we are currently prcessing.
        const current = this.children.findIndex(child => child === head.position);

        // escape hatch if no more children to process backwards
        if (0 < current - 1) {
            head.position = this;
            return this.parent.back();
        }

        // default
        return this.children[current-1];        
    }

    onEnter(head) {
        // When the head is at a scene, it must move to a child as it cannot rest on a scene.
        // i.e. timeline "onClick" is invalid for scene.
        head.next();
        // I should throw error if no children/provide a better error message.
    }

    onLeave(head) {
        // Do nothing on leave
    }
}

export default function Scene(props) {
    return new NinoaScene(props);
}