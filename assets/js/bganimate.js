let bg;

console.log("fetch json");

bg = lottie.loadAnimation({
            wrapper: document.getElementById("jbganimation"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "./dist/backdrop.json",
    });

