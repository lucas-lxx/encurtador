import { createElement } from "./elements.js";

const originalLinkElement = document.getElementById('link__form');

const generateShortLinkContainer = async () => {
  let link_block = document.getElementById('link');
  let short_link_container = createElement('div', {classes: ['link__short-link-container']});
  let short_link = createElement('a', {classes: ['link__short-link'], id: 'link__short-link'});
  short_link_container.appendChild(short_link);
  link_block.append(short_link_container);
}

const updateShortLink = async (link) => {
  let short_link_container = document.getElementById('link__short-link-container')
  if (!short_link_container) { short_link_container = await generateShortLinkContainer(); }
  let short_link = document.getElementById('link__short-link');
  short_link.innerText = link;
  short_link.href = link;
  short_link.target = '_blank';
}

const returnShortLink = async (event) => {
  try {
    event.preventDefault();
    const data = { original_link: document.getElementById('original_link').value};
    const axios_data = await axios.post('/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
    updateShortLink(axios_data.data.link);
  } catch (e) {
    console.log(e)
  }
} 

originalLinkElement.addEventListener('submit', returnShortLink);
