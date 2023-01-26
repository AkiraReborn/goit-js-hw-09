function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const backgroundColorSwitcher = function () {
  body.style.backgroundColor = getRandomHexColor();
};

btnStart.addEventListener('click', () => {
  colorInterval = setInterval(() => {
    backgroundColorSwitcher();
  }, 1000);
  btnStart.disabled = true;
});

btnStop.addEventListener('click', () => {
  clearInterval(colorInterval);
  btnStart.disabled = false;
});
