const originalLinkElement = document.getElementById('link__form');

const createElement = async (element_name, options = {classes: [], id: null, value: null}) => {
  let element = document.createElement(element_name);
  options.classes.forEach(c => {element.classList.add(c)})
  if (options.id) { element.id = options.id; }
  if (options.value) { element.value = options.value }
  return element;
}

const generateShortLinkContainer = async () => {
  let link_block = document.getElementById('link');
  let short_link_container = await createElement('div', {classes: ['link__short-link-container']});
  let short_link = await createElement('a', {classes: ['link__short-link'], id: 'link__short-link'});
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
  event.preventDefault();
  const data = { original_link: document.getElementById('original_link').value};
  const axios_data = await axios.post('/link', data, {'Content-Type': 'application/json; charset=UTF-8'});
  updateShortLink(axios_data.data.link);
} 

originalLinkElement.addEventListener('submit', returnShortLink);
