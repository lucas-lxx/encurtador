// import axios from "axios";

const originalLinkElement = document.getElementById('originalLinkForm');

const createElement = async (element_name, options = {classes: [], id: null, value: null}) => {
  let element = document.createElement(element_name);
  options.classes.forEach(c => {element.classList.add(c)})
  if (options.id) { element.id = options.id; }
  if (options.value) { element.value = options.value }
  return element;
}

const generateShortLinkContainer = async (data) => {
  data = data.data;
  const anchorTagClass = 'short-link__anchor-container';
  let form = document.getElementById('originalLinkForm');
  let div = document.getElementById('shortLinkDiv');
  if (!div) {
    div = document.createElement('div');
    div.id = 'shortLinkDiv';
    let a = document.createElement('a');
    a.id = 'shortLink';
    div.appendChild(a);
    form.append(div);
  }
  let a = document.getElementById('shortLink');
  a.innerText = data.link;
  a.href = data.link;
  a.classList.add(anchorTagClass);
  a.target = '_blank';
  console.log(div);
}

const returnShortLink = async (event) => {
  event.preventDefault();
  const data = { originalLink: document.getElementById('originalLink').value};
  const axios_data = await axios.post('/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
  generateShortLinkContainer(axios_data);
} 

originalLinkElement.addEventListener('submit', returnShortLink);
