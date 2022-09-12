import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', onStartBtnClick);

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() > 0) {
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});

function onStartBtnClick() {
  inputEl.setAttribute('disabled', 'disabled');
  startBtn.setAttribute('disabled', 'disabled');

  const intervalId = setInterval(() => {
    const deltaTime = fp.selectedDates[0] - new Date();
    if (deltaTime <= 0) {
      Notiflix.Notify.success('УРА, ТАЙМЕР ВІДПРАЦЮВАВ');
      clearInterval(intervalId);
      inputEl.removeAttribute('disabled');
      startBtn.removeAttribute('disabled');
      return;
    }
    createMarkup(deltaTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function createMarkup(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
