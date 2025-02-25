let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const localStorageData = localStorage.getItem('feedback-form-state');

if (localStorageData) {
  formData = JSON.parse(localStorageData);
} else {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

emailInput.value = formData.email ?? '';
messageTextarea.value = formData.message ?? '';

form.addEventListener('input', event => {
  formData.email = emailInput.value;
  formData.message = messageTextarea.value;
  let jsonFormData = JSON.stringify(formData);
  localStorage.setItem('feedback-form-state', jsonFormData);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (
    event.target.elements.email.value === '' ||
    event.target.elements.message.value === ''
  ) {
    return alert('Fill please all fields');
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData = {
    email: '',
    message: '',
  };
});
