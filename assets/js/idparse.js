let fail = false;
function grabID() {
  var inputText = document.getElementById('input').value;
  let finalText = document.getElementById('output');
  let finalBox = document.getElementById('outputBox');
  let copyButton = document.getElementById('copyButton');
  if (inputText.search(/(?<=id=")\d*(?=" video)/g) !== -1) {
    if (fail) {
      finalBox.classList.remove('bg-red-400');
      finalBox.classList.add('bg-green-400');
      copyButton.innerHTML = 'Copy & Close';
    }
    let copyText = inputText.split('id="')[1].split('" video=')[0];
    finalText.innerHTML = copyText;
  } else {
    finalBox.classList.remove('bg-green-400');
    finalBox.classList.add('bg-red-400');
    finalText.innerHTML = 'Invalid code';
    copyButton.innerHTML = 'Cancel';
    fail = true;
  }
  console.log(finalText.innerHTML);
}
function copy() {
  if (!fail) {
    let finalText = document.getElementById('output');
    const el = document.createElement('textarea');
    el.value = finalText.innerHTML;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
