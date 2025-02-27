import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconOk from '../img/bi_check2-circle.svg';
import iconError from '../img/bi_x-octagon.svg';

const btn = document.querySelector('button');
const fieldset = document.querySelector('fieldset');
const radioInput = document.querySelectorAll('[type="radio"]');
const delayInput = document.querySelector('[type="number"]');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayValue = Number(delayInput.value);
  const selectedRadio = Array.from(radioInput).find(radio => radio.checked);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio.value === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  delayInput.value = '';

  promise
    .then(value => {
      iziToast.show({
        message: `Fulfilled promise in ${value}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#59a10d',
        theme: 'dark',
        iconUrl: iconOk,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `Rejected promise in ${error}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        theme: 'dark',
        iconUrl: iconError,
        position: 'topRight',
      });
    });
});
