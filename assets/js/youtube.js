/* Light YouTube Embeds by @labnol */
if (document.readyState !== 'loading') {
    console.log('Youtube.js logs loading state')
    makePage();
    InitCode(page);
} else {
    document.addEventListener("DOMContentLoaded", function() {
        makePage().then(page => InitCode(page));
        console.log('Youtube.js logs DOMContentLoaded')
    });
}

async function makePage(){
    if (document.title == 'Jack Gracie'){var page = 'init';} else {page = 'mo'};
    return page;
};

function InitCode(page){
    var div, n, v = document.getElementsByClassName("video-player");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id, page);
        div.onclick = labnolIframe;
        v[n].appendChild(div);
    }
};

function labnolThumb(id, page) {
    console.log ('page recorded is: ', page);
    var thumb = '<img src="https://i.ytimg.com/vi/ID/maxresdefault.jpg" >';
    if (page == 'init'){
        var play = '<video src="./dist/reel.webm" autoplay loop alt="img 01" class="play"></video>';
    } else if (page == 'mo') {
        var play = '<video src="./dist/Motion.webm" autoplay loop alt="img 01" class="playMo"></video>';
    } 
    return thumb.replace("ID", id) + play;
}
function labnolIframe() {
    var iframe = document.createElement("iframe");
    noGrow = document.getElementById('homeVideo');
    noGrow.classList.remove("grow");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
};