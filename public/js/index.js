// import axios from "axios";

const originalLinkElement = document.getElementById('link__form');

const createElement = async (element_name, options = {classes: [], id: null, value: null}) => {
  let element = document.createElement(element_name);
  options.classes.forEach(c => {element.classList.add(c)})
  if (options.id) { element.id = options.id; }
  if (options.value) { element.value = options.value }
  return element;
}

const generateShortLinkContainer = async (data) => {
  const anchorTagClass = 'short-link__anchor-container';
  let form = document.getElementById('link__form');
  let div = document.getElementById('link__short-link-container')
  if (!div) {
    div = document.createElement('div');
    div.classList.add = 'link__short-link-container';
    let a = document.createElement('a');
    a.id = 'link__short-link';
    div.appendChild(a);
    form.append(div);
  }
  let a = document.getElementById('link__short-link');
  a.innerText = data.link;
  a.href = data.link;
  a.classList.add(anchorTagClass);
  a.target = '_blank';
}

const returnShortLink = async (event) => {
  event.preventDefault();
  const data = { originalLink: document.getElementById('originalLink').value};
  const axios_data = await axios.post('/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
  generateShortLinkContainer(axios_data.data);
} 

originalLinkElement.addEventListener('submit', returnShortLink);
