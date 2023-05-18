import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {timerSpanValue: document.querySelectorAll('.timer span.value'),};

const timeInputPicker = document.querySelector('[datetime-picker]');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

  
  btnStart.disabled = true;
  let intervalId = null;
  
  const options = {
    enableTime: true, // Enables time picker
    time_24hr: true, // Displays time picker in 24 hour mode without AM/PM selection when enabled.
    defaultDate: new Date(), // Sets the initial selected date(s).
    minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
    // clouse calendare, function start.
    onClose(selectedDates) {
      if (selectedDates[0] > new Date()) {
        Notify.success('Press START to start the countdown timer');
        btnStart.disabled = false;
      } else {
        Notify.failure('Please choose a date in the future').disabled = true;
      }
    },
  };
  
  flatpickr('input#datetime-picker', options);
  
  btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    intervalId = setInterval(count, 1000);
  });

  function count() {
    const endTime = new Date(timeInputPicker.value);
    const startTime = new Date();
    const countdown = endTime - startTime;

    const countdownObj = convertMs(countdown);

    if (countdown >= 0) {
      days.textContent = addLeadingZero(countdownObj.days);
      hours.textContent = addLeadingZero(countdownObj.hours);
      minutes.textContent = addLeadingZero(countdownObj.minutes);
      seconds.textContent = addLeadingZero(countdownObj.seconds);
      refs.timerSpanValue.forEach(elm => {
        elm.style.color = 'MediumSeaGreen';
      });
      if (countdown <= 11000) {
        refs.timerSpanValue.forEach(elm => {
          elm.style.color = 'tomato';
        });
      }
    } else {
      Notify.success('The countdown is complete! RELOAD the page!');
      clearInterval(intervalId);
  
      refs.timerSpanValue.forEach(elm => {
        elm.style.color = 'black';
      });
    }
  };
  
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days, hours, minutes and seconds
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  };