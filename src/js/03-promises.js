import Notiflix from 'notiflix';


const form = document.querySelector('.form');

  form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  
let mainDelay = event.currentTarget.delay.valueAsNumber;
const delayStep = event.currentTarget.step.valueAsNumber;
const amountOfPromise = event.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= amountOfPromise; position += 1) {
    if (mainDelay <= 0 && delayStep <= 0) {
      Notiflix.Notify.failure('Please enter a valid value!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      createPromise(position, mainDelay);
        mainDelay += delayStep;
    }
  };
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise.then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};