

const phrases = ['Webdiste', 'illustrations', 'pancakes']

let phraseChosen
let count = 0;
let index = 0;
let currentText = '';
let letterToType = '';


//use an infinite loop function to do the typing
const type = function () {

    //Pick a random phrase
    let phraseChosen = phrases[Math.floor((Math.random() * (phrases.length)))];

    console.log(phraseChosen + ' MEM')

    //Decide first letter, then first 2 letters, then first 3...
    lettersToType = phraseChosen.slice(0,++index);

    document.querySelector('.changingText').textContent = lettersToType;

    //If we dont hit the length of the chosen phrase, keep going
    if(lettersToType.length != phraseChosen.length) {
        setTimeout(() => {
            index++
            type();
        }, 150);
    }else {
        index = 0;
    }

    

   

}
//Begin the loop
type();
