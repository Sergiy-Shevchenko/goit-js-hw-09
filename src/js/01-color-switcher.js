
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]'); 

// console.log(startBtn);
// console.log(stopBtn);

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
     document.body.style.backgroundColor = getRandomHexColor();
     }, 1000);
     startBtn.setAttribute('disabled', true)
     stopBtn.removeAttribute('disabled') 
    console.log('click')

});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    console.log('click')
    startBtn.removeAttribute('disabled')
    stopBtn.setAttribute('disabled', true)
});

