import Monogatari from '@monogatari/core';
import {$_ready} from '@aegis-framework/artemis';


import createUN from "./ninoa/UNpragma.js";
import Dialog from './ninoa/elements/Dialog/Dialog.js';
import Scene from './ninoa/elements/scene/Scene.js';
import Head from './ninoa/head/Head.js';


class MonogatariWrapper {
    constructor(engine) {
        this.engine = engine;
        this.text = "";
    }

    setText(text) {
        this.text = text;
    }

    getText(text) {
        this.text = text;
    }

    showCurrentText() {
        engine.run(this.text, false);
    }

}

class TestWrapper {
    constructor() {
        this.text = "";
    }

    setText(text) {
        this.text = text;
    }

    getText() {
        return this.text;
    }

    showCurrentText() {
        console.log(this.text);
    }
}

export function testTree(){
    return (
        <Scene>
            <Dialog>Hello world!</Dialog>
            <Dialog>Is this working?</Dialog>
            <Dialog>Please work</Dialog>
        </Scene>
    );
}

// Test wrappper tests
const proofTestHead = new Head(testTree(), new TestWrapper())
proofTestHead.continue();
proofTestHead.continue();
proofTestHead.continue();
// proofTestHead.continue(); crashes

console.log(testTree());

const myHead = new Head(testTree(), new MonogatariWrapper(Monogatari));

function runNinoa() {
    myHead.next();
    return false; // please pause Monogatari after I finish.
}

Monogatari.script ({
	// The game starts here.
	'Start': [
        "Hello!",
        "jump Ninoa_A"
    ],
    // Ninoa injection or whatever this is called
    'Ninoa_A' : [
        function () { runNinoa(); },
        "jump Ninoa_A"   
    ]
});


$_ready (() => {
	// 2. Inside the $_ready function:

	Monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

	});
});