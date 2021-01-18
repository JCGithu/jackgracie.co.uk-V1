const { copy } = require('./utils');

//COMPONENTS
function runPlaceholder(target) {
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.innerHTML = 'Select quality';
  target.append(placeholder);
}

//MAIN FUNCTIONS
function success(data, dom) {
  dom.output.innerHTML = '';
  const select = document.createElement('select');
  const buttonsDiv = document.createElement('div');
  const link = document.createElement('button');
  const button = document.createElement('button');
  runPlaceholder(select);
  select.classList.add('p-2', 'm-3', 'rounded');
  link.classList.add('p-3', 'bg-green-400', 'text-white', 'font-bold', 'rounded', 'mx-4');
  button.classList.add('w-auto', 'bg-white', 'text-black', 'p-2', 'px-3', 'rounded', 'mx-4');
  buttonsDiv.classList.add('flex-row', 'm-4');
  button.setAttribute('x-on:click', 'open=false');
  button.innerHTML = 'Close';
  button.onclick = () => {
    dom.output.innerHTML = '';
  };
  let i = 0;
  select.onchange = () => {
    if (i == 0) {
      buttonsDiv.prepend(link);
    }
    link.innerHTML = 'Copy Link';
  };
  link.onclick = () => {
    copy(select.value);
  };
  for (var obj in data) {
    let result = data[obj];
    console.log(result);
    const option = document.createElement('option');
    option.innerHTML = result.text;
    option.value = result.url;
    select.append(option);
  }
  buttonsDiv.append(button);
  dom.output.append(select, buttonsDiv);
}

function fail(dom) {}

function loading(dom) {
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = 'Sourcing...';
  loadingDiv.classList.add('w-auto', 'text-black', 'py-4', 'px-5', 'rounded', 'mx-4');
  dom.output.append(loadingDiv);
}

module.exports = { success, fail, loading };
