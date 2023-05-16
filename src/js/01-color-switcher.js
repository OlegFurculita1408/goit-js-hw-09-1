const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onChangeColor);
btnStop.addEventListener('click', onBtnStop);

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

function onChangeColor() {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        btnStart.disabled = true;
    }, 1000);
};

function onBtnStop() {
    clearInterval(intervalId);
    btnStart.disabled = false;
}