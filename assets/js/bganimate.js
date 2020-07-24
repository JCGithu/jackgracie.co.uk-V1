console.log("Loading background animation");
lottie.loadAnimation({
        container: document.getElementById("jbganimation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "./dist/backdrop.json",
        rendererSettings: {
                preserveAspectRatio: 'xMinYMin slice',
                overflow: 'auto',
        },
});


