"use strict"

/* TO DO:
		+ Setup de event para mudar cores do background 
    	+ TEstar pagina em mobile - fuciona com touch? 
*/


const makeSound = function(e) {
    
    const sound = document.querySelector(`audio[data-key="${e.key}"]`);

    const key = document.querySelector(`button[data-key="${e.key}"]`);

    if(!sound) return;
    sound.currentTime = 0;
    sound.play();

}

const moveButton = function(e) {
	const key = document.querySelector(`button[data-key="${e.key}"]`);

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



const noteKeys = document.querySelectorAll('.note')
const chordKeys = document.querySelectorAll('.chord')


noteKeys.forEach( note => note.addEventListener('transitionend', removeTransition)	)
chordKeys.forEach( chord => chord.addEventListener('transitionend', removeTransition)	)

window.addEventListener('keypress', makeSound);
window.addEventListener('keypress', moveButton);

