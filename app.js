const typingText = document.querySelector('.typing-text');
const inpField = document.querySelector('.inp-field');
let mistakeCount = document.querySelector('.mistake-span');
let time = document.querySelector('.time-span b');
let cpm = document.querySelector('.cpm-span');
let wpmtag = document.querySelector('.wpm-span');
let tryAgainBtn = document.querySelector('.try-again')
let characterIndex = 0;
let mistakes = 0;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
isTyping = false;


function randomParagraph (){
    const randomParagraph = randomParagraphs[Math.floor(Math.random() * randomParagraphs.length)];
    typingText.innerHTML = ''
    randomParagraph.split("").forEach(span => {
        let spantag = `<span>${span}</span>`;
        typingText.innerHTML += spantag;
    });
    document.addEventListener('keydown', () => {
        inpField.focus();
    })
    typingText.addEventListener('click', () => {
        inpField.focus();
    })
}

randomParagraph()

inpField.addEventListener("input", () =>{
    const character = typingText.querySelectorAll("span");
    const typedchar = inpField.value.split('')[characterIndex];
    if(characterIndex < character.length-1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(() => {
                if(timeLeft > 0){
                    timeLeft--;
                    time.textContent = timeLeft
                } else {
                    clearInterval(timer)
                };
               
            },1000);
            isTyping = true;
        }
        if(typedchar == null) {
            characterIndex--;
            if(character[characterIndex].classList.contains('incorrect')) {
                mistakes--;
            }
            character[characterIndex].classList.remove('correct','incorrect');
        } else {
            if(character[characterIndex].textContent === typedchar) {
                character[characterIndex].classList.add('correct');
            } else {
                mistakes++;
                character[characterIndex].classList.add('incorrect');
            }
            characterIndex++;
        }
        character.forEach(span => { span.classList.remove('active')});
        character[characterIndex].classList.add('active');
        mistakeCount.textContent = mistakes;
        cpm.textContent = characterIndex - mistakes
        let wpm = Math.round((((characterIndex - mistakes) / 5) / (maxTime - timeLeft))*60)
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        wpmtag.textContent = wpm
    }else{
        inpField.value = ''
        clearInterval(timer)
    }
})


tryAgainBtn.addEventListener('click', () => {
    alert('button clicked')
    inpField.value = ''
    clearInterval(timer)
    randomParagraph()
    mistakes = 0;
    characterIndex = 0;
    timeLeft = maxTime;
    isTyping = false;
    time.textContent = 60
    mistakeCount.textContent = 0;
    cpm.textContent = 0;
    wpmtag.textContent = 0;
})






