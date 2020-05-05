"use strict"

/* TO DO:
		+ Setup de event para mudar cores do background 
		+ Tornar responsive para web mobile 
*/


const makeSound = function(e) {
	console.log(e);
	if (e.type === 'keypress'){
		let sound = document.querySelector(`audio[data-key="${e.key}"]`);
		if(!sound) return;
		sound.currentTime = 0;
		sound.play();

	} else if (e.type === 'touchstart' || e.type === 'touchmove'  ) {
		let sound = document.querySelector(`audio[data-key="${e.originalTarget.dataset.key}"]`);
		if(!sound) return;
		sound.currentTime = 0;
		sound.play();
	}

}

const moveButton = function(e) {
	let key
	console.log(e.type)

	if (e.type === "keypress" ){
		key = document.querySelector(`button[data-key="${e.key}"]`);
	} else if (e.type === "touchstart"){
		key = document.querySelector(`button[data-key="${e.originalTarget.dataset.key}"]`);
	}

	if (key.className === 'chord chord-playing' || key.className === 'note note-playing'){
		return
	} else if (key.className === 'chord'){
		key.classList.add('chord-playing');
	} else {
		key.classList.add('note-playing');
	}
}

const removeTransition = function(e) {

	if (e.propertyName !== 'transform' ){
		return;

	} else if (e.target.classList[1] === 'note-playing'){
		e.target.classList.remove('note-playing');

	} else {
		e.target.classList.remove('chord-playing');
	}
} 


window.addEventListener('keypress', makeSound);
window.addEventListener('keypress', moveButton);

const noteKeys = document.querySelectorAll('.note')
const chordKeys = document.querySelectorAll('.chord')

noteKeys.forEach( note => note.addEventListener('transitionend', removeTransition) )
chordKeys.forEach( chord => chord.addEventListener('transitionend', removeTransition) )

// Event listeners para touch devices

noteKeys.forEach( note => note.addEventListener('touchstart', makeSound) )
noteKeys.forEach( note => note.addEventListener('touchstart', moveButton) )

chordKeys.forEach( chord => chord.addEventListener('touchstart', makeSound) )
chordKeys.forEach( chord => chord.addEventListener('touchstart', moveButton) )

