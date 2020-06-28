
//** DOM Variables **/
const headerSection = document.querySelector(".header");
const mainHeader = document.querySelector(".main-header");
const menuButtons = document.querySelector('.menu-bar');
const techButton = document.querySelector('.tech');
const contactButton = document.querySelector('.contact');
const closeButtons = document.querySelectorAll('.close-icon');
const background = document.querySelector('.background-image');
const preloader = document.querySelector('.preloader');

//Plugin to allow blur values for GSAP
(function () {
    const blurProperty = gsap.utils.checkPrefix("filter"),
        blurExp = /blur\((.+)?px\)/,
        getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

    gsap.registerPlugin({
        name: "blur",
        get(target) {
            return +(getBlurMatch(target)[1]) || 0;
        },
        init(target, endValue) {
            let data = this,
                filter = gsap.getProperty(target, blurProperty),
                endBlur = "blur(" + endValue + "px)",
                match = getBlurMatch(target)[0],
                index;
            if (filter === "none") {
                filter = "";
            }
            if (match) {
                index = filter.indexOf(match);
                endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
            } else {
                endValue = filter + endBlur;
                filter += filter ? " blur(0px)" : "blur(0px)";
            }
            data.target = target;
            data.interp = gsap.utils.interpolate(filter, endValue);
        },
        render(progress, data) {
            data.target.style[blurProperty] = data.interp(progress);
        }
    });
})();


//Preloader Code
// const preloaderStart = function() {
    
//     // gsap.to(preloader, 0.8, {webkitClipPath: "circle(150% at 10% 10%)"});

//     // gsap.fromTo(preloader, 0.8, {
//     //     webkitClipPath: "circle(0% at -40% -40%)"
//     // }, {
//     //     webkitClipPath:'circle(250% at 10% 10%)'
//     // })

//     // preloader.classList.style.animation = 'preLoader 0.8s'
    
// };


//Handles starting animation of header and background
const startupHeader =  function() {
    
   let trueHeight = mainHeader.offsetHeight;
   mainHeader.style.height= 0;

    setTimeout(() => {

        const tl = new gsap.timeline;
        tl.to(mainHeader, {height:trueHeight,duration:0.7, ease:'power1.out'});
        tl.fromTo(mainHeader.firstChild, { y:'-30',opacity:0},{y:0,opacity:'100%', duration:0.5},"-=0.5");
        tl.to(background, {opacity:'1', duration:3,ease:"none"})
    }, 800);

};


// tl.fromTo($element, $duration, $startpropertyOBJ, $endpropertiesOBJ)

//Hides header
const hideHeader = function () {

    blurBackground();

    gsap.to(headerSection, 0.3, {
        rotation: 0.01, scale: 0.90, opacity: 0, onComplete: function(){
        headerSection.style.display = 'none'
    }});
};

//Shows Header
const showHeader = function(){

    removeBlurBackground();

    headerSection.style.display = 'flex';
    
    gsap.fromTo(headerSection, 0.4, { rotation: 0.01, scale: 0.8, opacity: '0%' }, { scale: 1, opacity: '100%', rotation: 0.01});
};


//Shows Cards
const showCard = function(cardSelected){

    gsap.fromTo(cardSelected, 0.4, { rotation: 0.01, display: 'block', opacity: 0, scale: '1' }, { rotation: 0.01, display:'block', opacity:'100%', scale:'1'});
};

//Hides Cards
const hideCard = function(cardSelected){

    gsap.to(cardSelected, 0.3, {rotation:0.01,scale:1, opacity:0,  onComplete: function(){
        cardSelected.style.display = "none"
    }});
};


const eventListeners = function() {
    //Opening Cards
    menuButtons.addEventListener('click', function (event) {
        
        let elementClicked = event.target;
        let cardToOpen;
        
        if(elementClicked.tagName === "H3"){
            cardToOpen = elementClicked.parentElement.className;
            cardToOpen = document.getElementById(cardToOpen);
    
        }else {
            cardToOpen = elementClicked.className;
            cardToOpen = document.getElementById(cardToOpen);
        };

        hideHeader();
            setTimeout(() => {
                showCard(cardToOpen);
            }, 300);
        
    });


    //Closing Cards
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            let elementClicked = event.target;
            let cardToClose;

            //Gets the card
            if (elementClicked.tagName === "IMG") {
                cardToClose = elementClicked.parentElement.parentElement.id;
                cardToClose = document.getElementById(cardToClose);
            } else {
                cardToClose = elementClicked.parentElement.id;
                cardToClose = document.getElementById(cardToClose);
            };

            hideCard(cardToClose);
            setTimeout(() => {
                showHeader()
            }, 300);
        })
    });
};


//Background Blurs
const blurBackground = function() {
    gsap.to(background,  {
        duration:0.5,
        scale: 1.1,
        blur:2
    })
}

const removeBlurBackground = function () {
    gsap.to(background, {
        duration: 0.5,
        scale: 1.2,
        blur: 0
    })
}





//Self typing section
const phrases = ['The Cake is a Lie', 'Taking your ideas online', 'Hire this guy', 'Sometimes you just take the leap', 'Do or do not. There is no try']

let count = 0;
let index = 0;
let currentText = '';
let letterToType = '';
let phraseChosen = phrases[Math.floor((Math.random() * (phrases.length)))];

//use an infinite loop function to do the typing
const type = function () {

    //Decide first letter, then first 2 letters, then first 3...
    lettersToType = phraseChosen.slice(0,index);

    document.querySelector('.changing-text').textContent = lettersToType;

    //If we dont hit the length of the chosen phrase, keep going
    if(lettersToType.length != phraseChosen.length) {
        setTimeout(() => {
            index++
            type();
        }, 100);
    }else {
        index = 0;
    }

}

//Begin the Typing loop
setTimeout(() => {
    type()
}, 2000);







//Add event listeners and calls on page load here
const app = function() {
    // preloaderStart();
    startupHeader();
    eventListeners();
};

//Begin everything
app();