let failed = false;

var inputText = document.getElementById('input').value;
let finalText = document.getElementById('output');
let finalBox = document.getElementById('outputBox');
let copyButton = document.getElementById('copyButton');

function updateValues() {
  inputText = document.getElementById('input').value;
  finalText = document.getElementById('output');
  finalBox = document.getElementById('outputBox');
  copyButton = document.getElementById('copyButton');
}

function failUndo() {
  finalBox.classList.remove('bg-red-400');
  finalBox.classList.add('bg-green-400');
  copyButton.innerHTML = 'Copy & Close';
}

function fail() {
  finalBox.classList.remove('bg-green-400');
  finalBox.classList.add('bg-red-400');
  finalText.innerHTML = 'Invalid code';
  copyButton.innerHTML = 'Cancel';
  failed = true;
}

async function periscope() {
  var regex = /(?<=\/w\/)[0-9A-Za-z]+/g;
  var token = inputText.match(regex);
  if (token === null) {
    regex = /(?<=\/)[0-9A-Za-z]{13}(?![\/\.])/g;
    token = inputText.match(regex);
  }
  console.log(token);
  let URL = `https://sinon-api.herokuapp.com/periscope/${token}`;
  finalText.innerHTML = 'Sourcing...';
  var response = await fetch(URL);
  var body = await response.json();
  console.log(body);
  finalText.innerHTML = body;
}

async function parliament() {
  var regex = /[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+/g;
  var token = inputText.match(regex)[0];
  console.log(token);
  let URL = `http://videoplayback.parliamentlive.tv/Player/Live/${token}`;
  finalText.innerHTML = 'Sourcing...';
  var response = await fetch(URL);
  var body = await response.json();
  console.log(body);
  finalText.innerHTML = body;
}

async function grabURL() {
  updateValues();
  var inputText = document.getElementById('input').value;
  if (failed) {
    failUndo();
  }
  if (inputText.includes('pscp.tv')) {
    await periscope();
  } else if (inputText.includes('parliamentlive.tv')) {
    await parliament();
  } else {
    fail();
  }
}
function copy() {
  updateValues();
  if (!failed) {
    const el = document.createElement('textarea');
    el.value = finalText.innerHTML;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
