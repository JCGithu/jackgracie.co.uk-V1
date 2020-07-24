var textWrapper = document.querySelector('.jack');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

window.addEventListener("load", function() {
    anime.timeline()
    .add({
        targets: '.jack .letter',
        opacity: [0,1],
        easing: "easeInOutSine",
        duration: 2250,
        delay: (el, i) => 150 * (i+1)
    })
    .add({
        targets: '.line',
        width: ['0%', '92%'],
        background: ['white', 'linear-gradient(90deg, #ffffff 30%, #bdbdbd 39%, #ffffff 48% )'],
        easing: "easeOutCirc",
        duration: 2000,
    })
});
