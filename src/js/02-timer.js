import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDate = document.querySelector('[data-days]');
const timerHour = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let endTime;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      endTime = selectedDates[0];
    }
  },
};

flatpickr(datePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function startTimer(duration) {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const remainingTime = duration - new Date();
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    updateDisplay(remainingTime);
  }, 1000);
}

function updateDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerDate.textContent = addLeadingZero(days);
  timerHour.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  if (!endTime) return;
  startTimer(endTime);
  startBtn.disabled = true;
});

startBtn.disabled = true;
