console.log("This works")
var content = document.getElementById("mo_content");
var body = document.getElementById("mo_body");
var video = document.getElementById("mo_video");
var box = document.getElementById("content_box");

var gridItems = document.querySelectorAll("#mo_content > div.grid > div"), i;

body.addEventListener("scroll", function(){
    var value = body.scrollTop;

    video.style.top = value * 0.5 + 'px';
    
    for (i = 0; i < gridItems.length; ++i) {
        gridItems[i].style.marginTop = (value * (i+1))/500 * -1 + 'vh';
    };
});