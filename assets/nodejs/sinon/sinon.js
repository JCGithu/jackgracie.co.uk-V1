const callAPI = require('./parser.js');
const { updateValues } = require('./utils.js');
const { success, fail, loading } = require('./ui.js');

const dom = {
  input: document.getElementById('input'),
  output: document.getElementById('output'),
  run: document.getElementById('run'),
};

async function grabURL() {
  updateValues(dom);
  dom.inputText = dom.input.value;
  loading(dom);
  let data = await callAPI(dom);
  console.log(data);
  if (!data) {
    fail(dom);
  } else {
    success(data, dom);
  }
}

dom.run.addEventListener('click', grabURL);
