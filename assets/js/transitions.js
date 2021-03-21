if (document.readyState !== 'loading') {
  console.log('LOADING');
  transitionInit();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    transitionInit();
  });
}

function transitionInit() {
  let videoPage = document.getElementById('video');
  let designPage = document.getElementById('design');
  let graphicsPage = document.getElementById('graphics');

  function loadjs(file) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    script.onload = function () {
      console.log('Script is ready!');
    };
    document.body.appendChild(script);
  }

  let linkArray = [videoPage, designPage, graphicsPage];

  linkArray.forEach((eachLink) => {
    eachLink.addEventListener('click', () => {
      switch (eachLink) {
        case videoPage:
          fetchPage({
            name: 'Video',
            path: './pages/video.html',
            animTarget: '#jfganimation',
            animScale: [1, 5],
            animTime: 2000,
            scripts: ['./assets/js/videopage.js'],
            gradient: 'to top right, rgb(252,200,177), rgb(255,236,210)',
          });
          break;
        case graphicsPage:
          fetchPage('./pages/mograph.html', 'm');
          break;
      }
    });
  });

  function fetchPage({ name, path, animTarget, animScale, animTime, scripts, gradient }) {
    let baseURL = window.location.protocol + '//' + window.location.hostname;

    if (window.location.port) {
      baseURL += `:${window.location.port}`;
      console.log(window.location.port);
    }

    fetch(`${baseURL}/${path}`)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        let doc = new DOMParser().parseFromString(html, 'text/html');
        let hub = document.querySelector('.hub');
        let body = document.querySelector('body');
        anime({
          targets: animTarget,
          scale: animScale,
          easing: 'easeInOutQuad',
          duration: animTime,
          complete: function () {
            body.addEventListener('DOMNodeInserted', function () {
              document.querySelector('.new-content').style.opacity = 0;
              for (let script in scripts) {
                loadjs(scripts[script]);
              }
              anime({
                targets: '.new-content',
                opacity: 1,
                duration: 2000,
                easing: 'easeOutSine',
              });
              anime({
                targets: animTarget,
                opacity: 0,
                duration: 1000,
                complete: function () {
                  document.querySelector(animTarget).remove();
                },
              });
              console.log('Homepage deleted');
              history.pushState('https://jackgracie.co.uk', name, `/${name}`);
            });
            body.style.background = `linear-gradient(${gradient})`;
            hub.remove();
            document.querySelector(animTarget).remove();
            document
              .querySelector('body')
              .insertBefore(doc.querySelector('.new-content'), document.querySelector('body .hub'));
          },
        });

        if (tran == 'm') {
          anime({
            targets: ['#jfganimation', '#homeContent'],
            scale: [1, 0.8],
            opacity: [1, 0],
            easing: 'easeOutQuad',
            duration: 1000,
          });
          document.getElementById('jbganimation').style.transformOrigin = '0 100%';
          anime({
            targets: ['#jbganimation'],
            scale: [1, 7],
            easing: 'easeInOutQuad',
            duration: 2000,
            complete: function () {
              document.body.style.background = 'linear-gradient(to top right,#FCB69F, #FFAC99)';
              document.body.style.backgroundAttachment = 'fixed';
              document.querySelector('.hub').remove();
              document.querySelector('#jfganimation').remove();
              document
                .querySelector('body')
                .insertBefore(doc.querySelector('.new-content'), document.querySelector('body .hub'));
              document.querySelector('.new-content').style.opacity = 0;
              InitCode('mo');
              loadjs('./assets/js/mopage.js');
              loadjs('./assets/js/parallax.js');
              anime({
                targets: '.new-content',
                opacity: 1,
                duration: 2000,
                easing: 'easeOutSine',
              });
              anime({
                targets: '#jbganimation',
                opacity: 0,
                duration: 2000,
                easing: 'easeInOutQuad',
                complete: function () {
                  document.querySelector('#jbganimation').remove();
                  history.pushState('https://jackgracie.co.uk', 'Motion Graphics', '/mograph');
                },
              });
              console.log('Homepage deleted');
            },
          });
        }
      });
  }
}
