const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = 0;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.setAttribute('disabled', 'disabled');

function onStartBtnClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
