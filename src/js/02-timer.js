import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('input[type="text"]');

const refs ={
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
startBtn.disabled = true;


//----------2-variant----
const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        //console.log(selectedDates[0]);
        
        if (selectedDates[0] <= new Date()) {
            Notify.failure('Please choose a date in the future!');
            return};
        if (selectedDates[0] > new Date()) {
            startBtn.disabled =  false;
         }
      }
    };

 const fp = flatpickr(input, options); 
 //console.log(fp.selectedDates[0].getTime());


startBtn.addEventListener('click', () => {
  intervalId = setInterval(()=>{
  const startData = fp.selectedDates[0].getTime() - Date.now();
  //console.log(startData);
  const time =  convertMs(startData);
  //console.log(time);
  
  overrwriteTime(time);
  
  
  if (startData < 1000) {
  startBtn.disabled =  false;
  clearInterval(intervalId);
  input.value = '';
  }
},1000);
})

//------------1-variant------------
// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       //console.log(selectedDates[0]);
            
//       if (selectedDates[0] <= new Date()) {
        
//         Notify.failure('Please choose a date in the future!');
//         return};
//       if (selectedDates[0] > new Date()) {
//         startBtn.disabled =  false;
//       }

//       startBtn.addEventListener('click', () => {
//         startBtn.disabled = true;
//         intervalId = setInterval(() => {
//           const startData = selectedDates[0] - new Date;
//           const time =  convertMs(startData);
//           //console.log(time);

//           overrwriteTime(time);
//           //console.log(startData);

//           if (startData < 1000) {
//             startBtn.disabled =  false;
//             clearInterval(intervalId);
//             input.value = '';
//           }
//         }, 1000);   
//       });
//     }
// };

// flatpickr(input, options); 

function overrwriteTime ({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  } 