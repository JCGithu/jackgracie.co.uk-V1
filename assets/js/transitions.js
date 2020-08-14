if( document.readyState !== 'loading' ) {
    console.log('LOADING')
    transitionInit();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        transitionInit();
    });
}

function transitionInit (){
    let videoPage = document.getElementById("video");
    let designPage = document.getElementById("design");
    let graphicsPage = document.getElementById("graphics");

    function loadjs(file) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = file;
        script.onload = function(){
            console.log("Script is ready!"); 
        };
        document.body.appendChild(script);
    }

    let linkArray = [videoPage, designPage, graphicsPage];

    linkArray.forEach((eachLink) => {
        eachLink.addEventListener('click', () => {
            switch (eachLink) {
                case videoPage:
                    tran = 'v';
                    fetchPage('video.html');
                    break;
                case graphicsPage:
                    tran = 'm';
                    fetchPage('mograph.html');
                    break;
/*              case designPage:
                    tran = 'd';
                    fetchPage('design.html');
                    break; */
            }
        })
    })

    function fetchPage(page) {
        let baseURL = window.location.protocol + "//" + window.location.hostname;

        if (window.location.port) {
            baseURL += `:${window.location.port}`;
            console.log(window.location.port)
        };
    
        fetch (`${baseURL}/${page}`)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                let doc = new DOMParser().parseFromString(html, 'text/html');

            if (tran == 'd'){
                anime({
                    targets: ['#jfganimation', '#homeContent'],
                    scale: [1,0.8],
                    opacity: [1,0],
                    easing: "easeOutQuad",
                    duration: 1000,
                });
                anime({
                    targets: ['#jbganimation'],
                    scale: [1,7],
                    easing:  "easeInOutQuad",    
                    duration: 2000,
                    complete: function(anim) {
                        document.body.style.background = "linear-gradient(to top right, #525BE1, #D68FFC)";
                        document.querySelector('.hub').remove();
                        document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('body .hub'))
                        anime({
                            targets: '#jbganimation',
                            opacity: [1,0],
                            duration: 5000,
                            complete: function(){
                                document.querySelector('.swap').remove();
                            }
                        })
                        console.log('Homepage deleted')
                        history.pushState("https://jackgracie.co.uk", 'Design', '/design');
                    }
                });
            };

            if (tran == 'v') {
                anime({
                    targets: '#jfganimation',
                    scale: [1,5],
                    easing:  "easeInOutQuad",    
                    duration: 2000,
                    complete: function(anim) {
                        document.body.style.background = "linear-gradient(to top right, rgb(252,200,177), rgb(255,236,210))";
                        document.querySelector('.hub').remove();
                        document.querySelector('#jbganimation').remove();
                        document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('body .hub'));
                        document.querySelector('.new-content').style.opacity = 0;
                        file = './assets/js/videopage.js';
                        loadjs(file);
                        anime({
                            targets: '.new-content',
                            opacity: 1,
                            duration: 2000,
                            easing: 'easeOutSine',
                        })
                        anime({
                            targets: '#jfganimation',
                            opacity: 0,
                            duration: 1000,
                            complete: function(){
                                document.querySelector('#jfganimation').remove();
                            }
                        })
                        console.log('Homepage deleted');
                        history.pushState("https://jackgracie.co.uk", 'Video', '/video');
                    }
                });
            };

            if (tran == 'm'){
                anime({
                    targets: ['#jfganimation', '#homeContent'],
                    scale: [1,0.8],
                    opacity: [1,0],
                    easing: "easeOutQuad",
                    duration: 1000,
                });
                document.getElementById("jbganimation").style.transformOrigin = '0 100%';
                anime({
                    targets: ['#jbganimation'],
                    scale: [1,7],
                    easing:  "easeInOutQuad",    
                    duration: 2000,
                    complete: function(anim) {
                        document.body.style.background = "linear-gradient(to top right, #FFfff, #FF769A)";
                        document.body.style.backgroundAttachment = "fixed";
                        document.querySelector('.hub').remove();
                        document.querySelector('#jfganimation').remove();
                        document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('body .hub'));
                        document.querySelector('.new-content').style.opacity = 0;
                        InitCode();
                        loadjs('./assets/js/mopage.js');
                        loadjs('./assets/js/parallax.js');
                        anime({
                            targets: '.new-content',
                            opacity: 1,
                            duration: 2000,
                            easing: 'easeOutSine',
                        })
                        anime({
                            targets: '#jbganimation',
                            opacity: 0,
                            duration: 2000,
                            easing:  "easeInOutQuad",
                            complete: function(){
                                document.querySelector('#jbganimation').remove();
                                history.pushState("https://jackgracie.co.uk", 'Motion Graphics', '/mograph');
                            }
                        })
                        console.log('Homepage deleted')
                    }
                });
            };

        })
    };
}