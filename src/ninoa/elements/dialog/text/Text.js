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
     /*    const apply = () => {
            // NOTE FOR THE TIMEOUT BELOW THAT UPDATES DURRATION
            // put it in a timeout as a hack to cause this to execute after the continue()
            // has finished.
            // TODO - keeping the above as a note to remember that the child text node speed
            // may not bee the default speed
            //setTimeout(() => { 
                //
            //}, 0);

            // calculate durration
            const speed = 200; // 200 is a hack as the deault monogatari speed.
            const duration = text.length[0] / speed;
            // update delay
            const startTime = engineWrapper.getDelay();
            engineWrapper.setDelay(startTime + duration);
            
            // concat text
            engineWrapper.setText(engineWrapper.getText() + this.text);
            
        }; */

        const apply = () => {
            // calculate durration
            const speed = 1 / 20; // 20 is a hack as the deault monogatari speed. 1char per 20 miliseconds
            const duration = this.text.length / speed;

            // update delay
            const startTime = engineWrapper.getDelay();
            engineWrapper.setDelay(startTime + duration);

            engineWrapper.setText(engineWrapper.getText() + this.text);
        };


        // Calculate Remove - reverts to prevous state
        const currentText = engineWrapper.getText();
        const remove = () => engineWrapper.setText(currentText);
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