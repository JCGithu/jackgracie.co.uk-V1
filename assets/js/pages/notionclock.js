const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let clock24 = false;

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

window.onload = displayClock();
var urlParams;
(window.onpopstate = function () {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
    query = window.location.search.substring(1);

  urlParams = {};
  while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function uptimeNowClock() {
  let timeNow = new Date();
  var time = formatAMPM(timeNow);
  if (clock24) {
    time = `${timeNow.getHours().toLocaleString('en-GB', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${timeNow.getMinutes().toLocaleString('en-GB', { minimumIntegerDigits: 2, useGrouping: false })}`;
  }
  let day = timeNow.getDay();
  let mDay = ordinal_suffix_of(timeNow.getDate());
  let month = timeNow.getMonth();
  var year = timeNow.getFullYear();
  let source = document.getElementById('time');
  source.innerHTML = `<span class='text-2xl font-bold tracking-wide'>${time}</span><br><span class='text-sm font-regular'>${days[day]}, ${mDay} ${months[month]}, ${year} </span>`;
  setTimeout(uptimeNowClock, 1000);
}
function displayClock() {
  let timeDiv = document.createElement('div');
  timeDiv.classList.add('w-full', 'flex', 'text-left', 'justify-start');
  timeDiv.id = 'timeDiv';
  let spanSet = document.createElement('span');
  spanSet.id = 'time';
  timeDiv.appendChild(spanSet);
  document.body.appendChild(timeDiv);
  uptimeNowClock();
}
setTimeout(function () {
  if (urlParams.format) {
    if (urlParams.format == 24) {
      clock24 = true;
    }
  }
  if (urlParams.bg) {
    document.body.style.backgroundColor = urlParams.bg;
  }
  if (urlParams.bghex) {
    document.body.style.backgroundColor = `#${urlParams.bghex}`;
  }
  if (urlParams.text) {
    document.body.style.color = urlParams.text;
  }
  if (urlParams.texthex) {
    document.body.style.color = `#${urlParams.texthex}`;
  }
  if (urlParams.align) {
    let timeDiv = document.getElementById('timeDiv');
    if (urlParams.align != 'left') {
      timeDiv.classList.remove('text-left', 'justify-start');
    }

    if (urlParams.align == 'right') {
      timeDiv.classList.add('text-right', 'justify-end');
    }
    if (urlParams.align == 'center') {
      timeDiv.classList.add('text-center', 'justify-center');
    }
  }
}, 1000);
