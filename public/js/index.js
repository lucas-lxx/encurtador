const originalLinkElement = document.getElementById('originalLinkForm');

const returnShortLink = async (event) => {
  event.preventDefault();
  const data = { originalLink: document.getElementById('originalLink').value};
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  console.log(event);
  
  fetch('/link', fetchData)
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data);
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
    console.log(div);
  })
} 

originalLinkElement.addEventListener('submit', returnShortLink);
