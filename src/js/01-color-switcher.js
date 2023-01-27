function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const backgroundColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
};

btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener('click', () => {
  timerId = setInterval(backgroundColorSwitcher, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
});

// stop changing color

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
});
