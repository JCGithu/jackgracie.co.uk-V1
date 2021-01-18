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
