export const createElement = (element_name, options = {
    classes: [], 
    id: null, 
    value: null,
    innerText: null
  }) => {
  let element = document.createElement(element_name);
  options.classes.forEach(c => {element.classList.add(c)})
  if (options.id) { element.id = options.id; }
  if (options.value) { element.value = options.value }
  if (options.innerText) { element.innerText = options.innerText }
  return element;
}