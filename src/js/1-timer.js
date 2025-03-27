import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import icon from '../img/bi_x-octagon.svg';

const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate = '';

btn.disabled = true;
input.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() <= new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        theme: 'dark',
        iconUrl: icon,
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      console.log(userSelectedDate);
    }
  },
};

const setTimer = () => {
  let timeDifference = userSelectedDate.getTime() - new Date().getTime();

  let timeObject = convertMs(timeDifference);
  setTimeValues(timeObject);

  const intervalId = setInterval(() => {
    timeDifference -= 1000;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      return;
    }
    timeObject = convertMs(timeDifference);
    setTimeValues(timeObject);
  }, 1000);
};

const setTimeValues = object => {
  days.textContent = object.days;
  hours.textContent = object.hours;
  minutes.textContent = object.minutes;
  seconds.textContent = object.seconds;
};

const addLeadingZero = value => String(value).padStart(2, '0');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const fp = flatpickr('#datetime-picker', options);

btn.addEventListener('click', () => {
  btn.disabled = true;
  input.disabled = true;
  setTimer();
});
