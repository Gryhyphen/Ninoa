import Monogatari, {$_ready} from '@monogatari/core';

import createUN from "./ninoa/UNpragma.js";
import Dialog from './ninoa/elements/Dialog/Dialog.js';
import Scene from './ninoa/elements/scene/Scene.js';
import Head from './ninoa/head/Head.js';
import TestWrapper from './ninoa/wrappers/TestWrapper.js';
import MonogatariWrapper from './ninoa/wrappers/MonogatariWrapper';


function testTree(){
    return (
        <Scene>
            <Dialog>Hello world!</Dialog>
            <Dialog>Is this working?</Dialog>
            <Dialog>Please work</Dialog>
        </Scene>
    );
}

// console.log(testTree()); // This was used just to check if the tree was built correctly.

// Test wrappper tests
const proofTestHead = new Head(testTree(), new TestWrapper())
proofTestHead.continue();
proofTestHead.continue();
proofTestHead.continue();
// proofTestHead.continue(); crashes



const myHead = new Head(testTree(), new MonogatariWrapper(Monogatari));

function runNinoa() {
    myHead.continue();
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
        runNinoa,
        "A",
        "jump Ninoa_A"   
    ]
});


$_ready (() => {
	// 2. Inside the $_ready function:

	Monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

	});
});