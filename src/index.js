import Monogatari from '@monogatari/core';
import {$_ready} from '@aegis-framework/artemis';


import createUN from "./ninoa/UNpragma.js";
import Dialog from './ninoa/elements/Dialog/Dialog.js';


export function testTree(){
    return <Dialog>Hello World!</Dialog>
}

console.log(testTree());


Monogatari.script ({
	// The game starts here.
	'Start': [
        "Hello!"
    ]
});


$_ready (() => {
	// 2. Inside the $_ready function:

	Monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

	});
});