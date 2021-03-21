/* Light YouTube Embeds by @labnol */
if (document.readyState !== 'loading') {
  InitCode();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    InitCode();
  });
}

function InitCode() {
  var div,
    n,
    v = document.getElementsByClassName('video-player');
  for (n = 0; n < v.length; n++) {
    let id = v[n].dataset.id;
    div = document.createElement('div');
    let thumb = document.createElement('img');
    thumb.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
    div.append(thumb);
    console.log(thumb);
    console.log('what');
    div.onclick = () => {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${id}?autoplay=1`);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '1');
      div.replaceChild(iframe, thumb);
    };
    v[n].appendChild(div);
  }
}

function labnolThumb(id, page) {
  let playAnimation = './dist/webm/reel.webm';
  if (page == 'mo') {
    playAnimation = './dist/webm/Motion.webm';
  }
  return thumb.replace('ID', id) + `<video src="${playAnimation}" autoplay loop alt="img 01" class="play"></video>`;
}
