import {createUN} from './UNpragma';



class Game {
    constructor(text) {
        // Current text of the 'dialog' box.
        this.text = text;
    }
}

// Kind of like a wrapper I guess actually, as it maps things to the game.
class GameWrapper {
    constructor(game) {
        this.game = game;
    }

    getText() {
        return this.game.text;
    }

    setText(text) {
        this.game.text = text;
    }
}

export class TestHead {
    constructor(position, gameWrapper) {
        this.position = position;
    }

    next() {
        this.onLeave(this.position);
        this.position = this.position.next(this);
        this.onEnter(this.position);
    }

    back() {
        this.position = this.position.back(this);
    }

    getAction(gameWrapper) {
        return this.position.createAction(gameWrapper);
    }
}





class NinoaScene {
    constructor() {

    }
}



/**
 * @TODO in order to implement this, the gameWrapper either needs to keep track of time or
 * have a mechanism to chain callbacks/events on previous actions.
 * 
 * I'm thinking the callbacks/event chaining makes more sense because of the timeline
 * property 'with', 'after', 'onClick'.
 */
class NinoaSpeed {
    constructor() {

    }
}