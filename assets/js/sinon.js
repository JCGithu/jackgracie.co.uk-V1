let failed = false;
var inputText = document.getElementById('input').value;
let finalText = document.getElementById('output');
let finalBox = document.getElementById('outputBox');
let copyButton = document.getElementById('copyButton');

function failUndo() {
  finalBox.classList.remove('bg-red-400');
  finalBox.classList.add('bg-green-400');
  copyButton.innerHTML = 'Copy & Close';
}

function fail() {
  console.log('invalid URL');
  finalBox.classList.remove('bg-green-400');
  finalBox.classList.add('bg-red-400');
  finalText.innerHTML = 'Invalid code';
  copyButton.innerHTML = 'Cancel';
  failed = true;
}

function grabURL() {
  var inputText = document.getElementById('input').value;
  if (inputText.includes('pscp.tv')) {
    console.log('valid URL');
    if (failed) {
      failUndo();
    }
    var regex = /(?<=\/w\/)[0-9A-Za-z]+/g;
    var token = inputText.match(regex);
    let URL = `https://api.periscope.tv/api/v2/getAccessPublic?token=${token}`;
    fetch(URL, {
      referrer: '',
      method: 'GET',
      origin: '*',
      headers: {
        'Content-Type': 'application/json',
      },
      dataType: 'json',
    })
      .then((data) => {
        data.json();
      })
      .then((json) => {
        console.log(json);
        console.log(json.hls_url);
      });
    //finalText.innerHTML = copyText;
  } else {
    fail();
  }
  //console.log(finalText.innerHTML);
}
function copy() {
  if (!failed) {
    const el = document.createElement('textarea');
    el.value = finalText.innerHTML;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
