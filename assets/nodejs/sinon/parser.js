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
