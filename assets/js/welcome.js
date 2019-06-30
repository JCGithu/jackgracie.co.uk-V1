window.onload = function(){

    function noScroll() {
        window.scrollTo(0, 0);
      }

    window.addEventListener('scroll', noScroll);

    var delaytime = 4600;

    setTimeout(function(){
        window.removeEventListener('scroll', noScroll);
    }, delaytime);

    anime.timeline({
        targets: '#jackg',
        delay: 5000,
        autoplay:true,
        loop:false,
        easing: 'easeOutExpo',
    }) 

    .add({
        translateX: '100vw',
        duration: 1000,
        //borderRadius:['0%','50%'],
    })

    let boondog;

    console.log("fetch json");
        boondog = lottie.loadAnimation({
            wrapper: document.getElementById("jackg"),
            renderer: "svg",
            loop: false,
            autoplay: true,
            path: "./dist/jack.json",
            width: "100%",
            height: "100%"
    })

}



