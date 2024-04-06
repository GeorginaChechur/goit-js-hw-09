const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startButton.addEventListener("click", () => {
  timerId = setInterval(() => {
      body.style.background = getRandomHexColor();
  }, 1000);
     startButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    clearTimeout(timerId);
    startButton.disabled = false;
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}