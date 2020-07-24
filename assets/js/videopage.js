{
    class Details {
        constructor() {
            this.DOM = {};

            const detailsTmpl = `
            <div class="details__bg details__bg--up"></div>
            <div class="details__bg details__bg--down"></div>
            <img class="details__img" src="" alt="img 01"/>
            <h2 class="details__title"></h2>
            <div class="details__deco"></div>
            <h3 class="details__subtitle"></h3>
            <div class="details__price"></div>
            <p class="details__description"></p>
            <button class="details__close"><svg class="icon icon--cross"><use xlink:href="#icon-cross"></use></svg></button>
            <button class="details__magnifier"><svg class="icon icon--magnifier"><use xlink:href="#icon-magnifier"></use></svg></button>
            `;

            this.DOM.details = document.createElement('div');
            this.DOM.details.className = 'details';
            this.DOM.details.innerHTML = detailsTmpl;
            DOM.content.appendChild(this.DOM.details);
            this.init();
        }
        init() {
            this.DOM.bgUp = this.DOM.details.querySelector('.details__bg--up');
            this.DOM.bgDown = this.DOM.details.querySelector('.details__bg--down');
            this.DOM.img = this.DOM.details.querySelector('.details__img');
            this.DOM.title = this.DOM.details.querySelector('.details__title');
            this.DOM.deco = this.DOM.details.querySelector('.details__deco');
            this.DOM.subtitle = this.DOM.details.querySelector('.details__subtitle');
            this.DOM.price = this.DOM.details.querySelector('.details__price');
            this.DOM.description = this.DOM.details.querySelector('.details__description');
            this.DOM.close = this.DOM.details.querySelector('.details__close');
            this.DOM.magnifier = this.DOM.details.querySelector('.details__magnifier');

            this.initEvents();
        }
        initEvents() {
            this.DOM.close.addEventListener('click', () => this.isZoomed ? this.zoomOut() : this.close());
            this.DOM.magnifier.addEventListener('click', () => this.zoomIn());
        }
        fill(info) {
            this.DOM.img.src = info.img;
            this.DOM.title.innerHTML = info.title;
            this.DOM.deco.style.backgroundColor = info.decoCol;
            this.DOM.title.style.fontSize = info.fonts;
            this.DOM.subtitle.innerHTML = info.subtitle;
            this.DOM.price.innerHTML = info.price;
            this.DOM.description.innerHTML = info.description;
            this.DOM.img.dataset.id = info.videoCode;
        }
        getvideoDetailsRect() {
            return {
                videoBgRect: this.DOM.videoBg.getBoundingClientRect(),
                detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
                videoImgRect: this.DOM.videoImg.getBoundingClientRect(),
                detailsImgRect: this.DOM.img.getBoundingClientRect()
            };
        }
        open(data) {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            this.DOM.details.classList.add('details--open');
            
            this.DOM.videoBg = data.videoBg;
            this.DOM.videoImg = data.videoImg;
            this.DOM.youtube = data.youtube;

            this.DOM.videoBg.style.opacity = 0;
            this.DOM.videoImg.style.opacity = 0;

            const rect = this.getvideoDetailsRect();

            this.DOM.bgDown.style.transform = `translateX(${rect.videoBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.videoBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.videoBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.videoBgRect.height/rect.detailsBgRect.height})`;
            this.DOM.bgDown.style.opacity = 1;
            
            this.DOM.img.style.transform = `translateX(${rect.videoImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.videoImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.videoImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.videoImgRect.height/rect.detailsImgRect.height})`;
            this.DOM.img.style.opacity = 1;

            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.magnifier],
                duration: 600,
                easing: 'easeOutExpo',
                delay: (target, index) => {
                    return index*60;
                },
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [50,0] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [0,1] : 1;
                },
                opacity: 1
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 1
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: ['100%',0],
                opacity: 1
            });

            anime({
                targets: DOM.hamburger,
                duration: 250,
                easing: 'easeOutSine',
                translateY: [0,'-100%']
            });
        }
        close() {
            console.log('close ran at least')
            if ( this.isAnimating ) {
                console.log('this is going')
                return false;
            }
            this.isAnimating = true;

            this.DOM.details.classList.remove('details--open');

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: '100%',
                opacity: 0
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 0
            });

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.magnifier],
                duration: 20,
                easing: 'linear',
                opacity: 0
            });

            const rect = this.getvideoDetailsRect();
            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: 250,
                easing: 'easeOutSine',
                translateX: (target, index) => {
                    return index ? rect.videoImgRect.left-rect.detailsImgRect.left : rect.videoBgRect.left-rect.detailsBgRect.left;
                },
                translateY: (target, index) => {
                    return index ? rect.videoImgRect.top-rect.detailsImgRect.top : rect.videoBgRect.top-rect.detailsBgRect.top;
                },
                scaleX: (target, index) => {
                    return index ? rect.videoImgRect.width/rect.detailsImgRect.width : rect.videoBgRect.width/rect.detailsBgRect.width;
                },
                scaleY: (target, index) => {
                    return index ? rect.videoImgRect.height/rect.detailsImgRect.height : rect.videoBgRect.height/rect.detailsBgRect.height;
                },
                complete: () => {
                    this.DOM.bgDown.style.opacity = 0;
                    this.DOM.img.style.opacity = 0;
                    this.DOM.bgDown.style.transform = 'none';
                    this.DOM.img.style.transform = 'none';
                    this.DOM.videoBg.style.opacity = 1;
                    this.DOM.videoImg.style.opacity = 1;
                    this.isAnimating = false;
                }
            });
        }
        zoomIn() {
            this.isZoomed = true;

            var iframe = document.createElement("iframe");
            var embed = "https://www.youtube.com/embed/ID?autoplay=1";
            iframe.setAttribute("src", embed.replace("ID", this.DOM.img.dataset.id));
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "1");
            iframe.setAttribute("class", "details__video");
            this.DOM.img.parentNode.appendChild(iframe);

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.magnifier, this.DOM.img],
                duration: 100,
                easing: 'easeOutSine',
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [0, index === 0 || index === 1 ? -50 : 50] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [1,0] : 1;
                },
                opacity: 0
            });

            anime({
                targets: '.details__video',
                duration: 1250,
                easing: 'easeInOutCubic',
                scale: [0,1],
            })

            const imgrect = this.DOM.img.getBoundingClientRect();
            const win = {w: window.innerWidth, h: window.innerHeight};

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1.3,
                rotate: 180
            });


        }
        zoomOut() {
	    if ( this.isAnimating ) return false;
            this.isAnimating = true;
            this.isZoomed = false;

            var videoDelete = document.querySelector('.details__video')
            if (videoDelete) {
                videoDelete.remove();
                console.log('Video deleted')
            }

            anime({
                targets: [this.DOM.title, this.DOM.deco, this.DOM.subtitle, this.DOM.price, this.DOM.description, this.DOM.magnifier, this.DOM.img],
                duration: 250,
                easing: 'easeOutCubic',
                translateY: 0,
                scale: 1,
                opacity: 1
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeInOutCubic',
                scale: 1,
                rotate: 0
            });

            this.isAnimating = false;
        }
    };

    class Item {
        constructor(el) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.video = this.DOM.el.querySelector('.video');
            this.DOM.videoBg = this.DOM.video.querySelector('.video__bg');
            this.DOM.videoImg = this.DOM.video.querySelector('.video__img');
            this.DOM.videoDeco = this.DOM.video.querySelector('.video__add');

            this.info = {
                img: this.DOM.videoImg.src,
                title: this.DOM.video.querySelector('.video__title').innerHTML,
                subtitle: this.DOM.video.querySelector('.video__subtitle').innerHTML,
                description: this.DOM.video.querySelector('.video__description').innerHTML,
                price: this.DOM.video.querySelector('.video__price').innerHTML,
                decoCol: this.DOM.videoDeco.style.backgroundColor,
                fonts: this.DOM.videoDeco.style.fontSize,
                videoCode: this.DOM.videoDeco.dataset.id,
            };

            this.initEvents();
        }
        initEvents() {
            this.DOM.video.addEventListener('click', () => this.open());
        }
        open() {
            DOM.details.fill(this.info);
            DOM.details.open({
                videoBg: this.DOM.videoBg,
                videoImg: this.DOM.videoImg,
            });
        }
    };

    const DOM = {};
    DOM.grid = document.querySelector('.grid');
    DOM.content = DOM.grid.parentNode;
    DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.grid__item'));
    let items = [];
    DOM.gridItems.forEach(item => items.push(new Item(item)));

    DOM.details = new Details();
};