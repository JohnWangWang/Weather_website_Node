const weatherFomr = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherFomr.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;

  messageOne.textContent = ' loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        const { error, location, foreCastData } = data;
        if (error) {
          messageOne.textContent = error;
        }

        messageOne.textContent = foreCastData;
        messageTwo.textContent = location;
      });
    }
  );
});
