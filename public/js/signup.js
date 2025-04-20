const signupForm = document.getElementById('signup__form');
const flashed = document.querySelectorAll('.login__form-field');

const getSignup = async (event) => {
  event.preventDefault();
  try {
    let data = {};
    const form_data = new FormData(signupForm);
    for (const [key, val] of form_data.entries()) data[key] = val;
    const payload = await axios.post('/account/signup', data, {'Content-Type': 'application/json; charset=UTF-8'});
    for (const element of event.target.elements) console.log(element);
    console.log(payload);
  } catch (e) {
    console.log(e.response.data);
    console.log(e);
    e.response.data.error.forEach(error_id => { 
      const element = document.getElementById(error_id);
      const contains = element.classList.contains('error');
      if (!contains) {
        element.classList.add('error');
        const error_label = document.createElement('label');
        const small_text = document.createElement('small');
        small_text.innerText = `${error_id} already taken`;
        small_text.classList.add('error-text');
        error_label.append(small_text);
        element.parentElement.append(error_label);
      }
      if (contains) {
        const elements = document.querySelectorAll('.error');
        elements.forEach(el => el.classList.add('flash'));
      }
    });
  }
}

const removeFlash = async (event) => {
  if (event.target.classList.contains('flash')) { event.target.classList.remove('flash'); }
  console.log(event.target);
  console.log('remove flash HITs');
}


signupForm.addEventListener('submit', getSignup);
flashed.forEach(f => f.addEventListener('animationend', removeFlash));