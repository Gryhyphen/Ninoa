import Action from "../actions/Action"; // using this for intellisense

export default class Head {
    constructor(position, engineWrapper) {
        this.position = position;
        this.engine = engineWrapper;
    }

    continue() {
        if (this.position === null) throw new Error("NO MORE NODES!");

        const localStack = [{ position: this.position, shouldLeave: false }];
        const actions = [];

        while (localStack.length > 0) {
            // Grab values from stack
            let { position: currentPos, shouldLeave: leave } = localStack.pop();

            // Check if reached end of nodes or attempting to enter nothing.
            if (currentPos === null) {
                // If reached the last node and not starting
                this.position = null;
                break;
            }

            // Calculating isThereSiblingsLeftToProcess
            // Also null checking on currentPos.parent in case this is the root.
            const parentLength = (currentPos.parent) ? currentPos.parent.children.length : null;
            const currentIndex = (currentPos.parent) ? currentPos.parent.children.findIndex(child => child === currentPos) : null;

            const isThereSiblingsLeftToProcess = (currentPos.parent) ? currentIndex + 1 < parentLength : false;

            if (isThereSiblingsLeftToProcess) {
                localStack.push({ position: currentPos.parent.children[currentIndex + 1], shouldLeave: false });
            } else {
                localStack.push({ position: currentPos.parent, shouldLeave: true });
            }

            // Performing lifecycle methods
            if (leave) {
                actions.push(currentPos.onLeave(this));
            } else if (currentPos.children) { // Check if you need to enter the children
                actions.push(currentPos.onEnter(this));
                localStack.push({ position: currentPos.children[0], shouldLeave: false });
            } else { // otherwise iterate through children
                actions.push(currentPos.onEnter(this));
                actions.push(currentPos.onLeave(this)); // current node must be a leaf node for this to be true.
            }

            // Break if should not process next item on stack based on current auto continue rules.
            const shouldAutoContinue = currentPos.shouldAutoContinue() || leave;
            if (!shouldAutoContinue) {
                this.position = localStack.pop().position;
                break;
            }
        }

        // Now applying actions
        this.applyActions(actions.filter(action => action !== undefined));
        this.engine.setDelay(0); // reset delay after done.
    }

    /**
     * 
     * @param {Action[]} actions 
     */
    applyActions(actions) {
        for (const action of actions) {
            action.apply();
        }
    }

}