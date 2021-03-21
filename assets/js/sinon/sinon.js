(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { loading } = require('./ui.js');
const sites = require('./sites.js');

async function regexTrigger(site, inputText) {
  for (let attempts in site.regex) {
    let regex = site.regex[attempts];
    var token = inputText.match(regex);
    if (token === null) {
      if (attempts < Object.keys(site.regex).length) {
        continue;
      } else {
        return false;
      }
    } else {
      site.token = token;
      return site;
    }
  }
}

async function triggerGate(site, inputText) {
  for (let items in site.triggers) {
    let trigger = site.triggers[items];
    if (inputText.includes(trigger) == true) {
      let results = await regexTrigger(site, inputText);
      if (results) {
        return results;
      }
    } else {
      if (items == Object.keys(site.triggers).length) {
        return false;
      }
    }
  }
}

async function gate(inputText) {
  for (let items in sites) {
    let site = sites[items];
    let results = await triggerGate(site, inputText);
    if (!results) {
      if (items == Object.keys(sites).length) {
        return false;
      }
    } else {
      results.page = items;
      return results;
    }
  }
}

async function callAPI(dom) {
  let site = await gate(dom.inputText);
  if (!site) {
    return false;
  } else {
    let URL = `https://sinon-api.herokuapp.com/${site.page}/${site.token}`;
    var response = await fetch(URL);
    var body = await response.json();
    return body;
  }
}

module.exports = callAPI;

},{"./sites.js":3,"./ui.js":4}],2:[function(require,module,exports){
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

},{"./parser.js":1,"./ui.js":4,"./utils.js":5}],3:[function(require,module,exports){
const sites = {
  youtube: {
    triggers: ['youtube.com', 'youtu.be'],
    regex: [/(?<=\/|v\=)([^".&?\/\s]{11})/gi],
  },
  periscope: {
    triggers: ['pscp.tv'],
    regex: [/(?<=\/w\/)[0-9A-Za-z]+/g, /(?<=\/)[0-9A-Za-z]{13}(?![\/\.])/g],
  },
  parliament: {
    triggers: ['parliament.tv'],
    regex: [/[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+-[0-9A-Za-z]+/g],
  },
};

module.exports = sites;

},{}],4:[function(require,module,exports){
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

},{"./utils":5}],5:[function(require,module,exports){
async function updateValues(dom) {
  dom.inputText = document.getElementById('input').value;
  dom.finalText = document.getElementById('output');
  dom.finalBox = document.getElementById('outputBox');
  dom.copyButton = document.getElementById('copyButton');
}

function copy(url) {
  const el = document.createElement('textarea');
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

module.exports = {
  updateValues,
  copy,
};

},{}]},{},[2]);
