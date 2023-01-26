import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const dateChosen = document.querySelector('#datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

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
      startBtn.addEventListener('click', countdownTime);

      function countdownTime() {
        timer = setInterval(() => {
          startBtn.disabled = true;
          const chosenDate = new Date(dateChosen.value).getTime();
          const now = new Date().getTime();
          const timeRemaing = chosenDate - now;
          const { days, hours, minutes, seconds } = convertMs(timeRemaing);

          day.innerHTML = days < 10 ? addingZero(days) : days;
          hour.innerHTML = hours < 10 ? addingZero(hours) : hours;
          minute.innerHTML = minutes < 10 ? addingZero(minutes) : minutes;
          second.innerHTML = seconds < 10 ? addingZero(seconds) : seconds;

          //   dateChosen.disabled = true;

          if (timeRemaing < 1000) {
            clearInterval(timer);
            startBtn.disabled = false;
          }
          console.log(timeRemaing);
        }, 1000);
      }
      function addingZero(value) {
        const stringValue = String(value);
        return stringValue.padStart(2, '0');
      }
    }
  },
};

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

flatpickr(dateChosen, options);
