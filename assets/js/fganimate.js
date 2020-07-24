console.log("Loading foreground animation");

lottie.loadAnimation({
        container: document.getElementById("jfganimation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "./dist/frontdrop.json",
        rendererSettings: {
                preserveAspectRatio: 'xMinYMin slice',
                overflow: 'auto',
        },
});


