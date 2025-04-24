import { createElement } from "./elements.js";

const signupForm = document.getElementById('signup__form');
const flashed = document.querySelectorAll('.login__form-field');

const addInputError = (element, error) => {
  element.classList.add('error');
  const error_label = createElement('label', {classes: ['error-text-container']});
  const small_text = createElement('small', {
    classes: ['error-text'],
    innerText: error.response.data.error_message
  });
  error_label.append(small_text);
  element.parentElement.append(error_label);
}

const getFormData = (signupFormElement) => {
  let data = {};
  const form_data = new FormData(signupFormElement);
  for (const [key, val] of form_data.entries()) { 
    data[key] = val; 
  }
  return data;
}

const updateSignupError = (error) => {
  error.response.data.error.forEach(error_id => { 
    const element = document.getElementById(error_id);
    const contains = element.classList.contains('error');
    if (!contains) {
      addInputError(element, error);
    }
    if (contains) {
      const elements = document.querySelectorAll('.error');
      elements.forEach(element => element.classList.add('flash'));
    }
  });
}

const removeInputError = (elements, classesToRemove = [], selectorToRemoveNode = []) => {
  classesToRemove.forEach(c => {
    for (const element of elements) { element.classList.remove(c); }
  });
  const elementsToRemove = document.querySelectorAll();
  elementsToRemove.forEach(e => {
    e.remove() 
  });
}

const getSignup = async (event) => {
  event.preventDefault();
  try {
    const data = getFormData(signupForm);
    removeInputError(event.target.elements, ['error'], ['error-text-container']);
    const payload = await axios.post('/account/signup', data, {'Content-Type': 'application/json; charset=UTF-8'});
    console.log(payload);
  } catch (e) {
    console.log(e);
    console.log(e.response.data);
    updateSignupError(e);
  }
}

const removeFlash = async (event) => {
  if (event.target.classList.contains('flash')) { event.target.classList.remove('flash'); }
}

signupForm.addEventListener('submit', getSignup);
flashed.forEach(f => f.addEventListener('animationend', removeFlash));