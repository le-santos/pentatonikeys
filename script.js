const makeSound = function (e) {
  if (e.type === "keypress") {
    let sound = document.querySelector(`audio[data-key="${e.key}"]`);
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
  } else if (e.type === "touchstart") {
    let sound = document.querySelector(
      `audio[data-key="${e.originalTarget.dataset.key}"]`
    );
    if (!sound) return;
    sound.currentTime = 0;
    sound.play();
  }
};

const moveButton = function (e) {
  let key;
  //check event type (keyboard or touch)
  if (e.type === "keypress") {
    key = document.querySelector(`button[data-key="${e.key}"]`);
  } else if (e.type === "touchstart") {
    key = document.querySelector(
      `button[data-key="${e.originalTarget.dataset.key}"]`
    );
  }

  // avoid multiple triggering
  if (
    key.className === "chord chord-playing" ||
    key.className === "note note-playing"
  ) {
    return;
    // add classlists to the movement effect
  } else if (key.className === "chord") {
    key.classList.add("chord-playing");
  } else {
    key.classList.add("note-playing");
  }
};

// remove classes when transform triggers transitionend event
const removeTransition = function (e) {
  if (e.propertyName !== "transform") {
    return;
  } else if (e.target.classList[1] === "note-playing") {
    e.target.classList.remove("note-playing");
  } else {
    e.target.classList.remove("chord-playing");
  }
};

// Adding listeners
window.addEventListener("keypress", makeSound);
window.addEventListener("keypress", moveButton);

const noteKeys = document.querySelectorAll(".note");
const chordKeys = document.querySelectorAll(".chord");

noteKeys.forEach((note) =>
  note.addEventListener("transitionend", removeTransition)
);
chordKeys.forEach((chord) =>
  chord.addEventListener("transitionend", removeTransition)
);

// Event listeners para touch devices

noteKeys.forEach((note) => note.addEventListener("touchstart", makeSound));
noteKeys.forEach((note) => note.addEventListener("touchstart", moveButton));
chordKeys.forEach((chord) => chord.addEventListener("touchstart", makeSound));
chordKeys.forEach((chord) => chord.addEventListener("touchstart", moveButton));

/* TO DO:
		+ Make responsive 
    + Check Script defer/async => html.index DOM seems to load only after page refresh, on a second load. 
*/
