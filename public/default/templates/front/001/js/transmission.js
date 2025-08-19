////////////GSAP////// by GreenSock (https://codepen.io/GreenSock/pen/RwKwLWK)


gsap.registerPlugin(ScrollTrigger, Draggable);

let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

// set initial state of items
window.scrollTo(0, 0);
gsap.set('.cards li', {
    xPercent: 210,
    scale: 0.25
});

var cards = gsap.utils.toArray('.cards li');
var trigger;
var sp = (window.innerWidth > 1024) ? 210 : 180;
var dr = (window.innerWidth > 1024) ? 0.85 : 0.5;
var op = (window.innerWidth > 1024) ? 210 : 180;
const spacing = 0.105, // spacing of the cards (stagger)
    snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop

    // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
    animateFunc = element => {
        const tl = gsap.timeline();
        tl.fromTo(element, {
                scale: 0.25
            }, {
                scale: 1,
                zIndex: 100,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "power1.in",
                immediateRender: false
            })
            .fromTo(element, {
                xPercent: 210
            }, {
                xPercent: -210,
                duration: 1,
                ease: "none",
                immediateRender: true
            }, 0);
        return tl;
    },
    animateFunc2 = element => {
        const tl2 = gsap.timeline();
        tl2.fromTo(element.querySelector('.overlayer'), {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false
        });
        return tl2;
    };
var seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
    wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
    playhead = {
        offset: 0
    }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
    scrub = gsap.to(playhead, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
        offset: 0,
        onUpdate() {
            seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
        },
        duration: dr,
        ease: "power4",
        paused: true
    }),

    // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
    progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end),
    wrap = (iterationDelta, scrollTo) => {
        iteration += iterationDelta;
        trigger.scroll(scrollTo);
        trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
    };

// when the user stops scrolling, snap to the closest item.

//ScrollTrigger.addEventListener("scrollEnd", function(){scrollToOffset(scrub.vars.offset); incenter()});

// feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
function scrollToOffset(offset) { // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.

    let snappedTime = snapTime(offset);
    if (seamlessLoop == '') {
        return
    }
    let progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
        scroll = progressToScroll(progress);
    if (progress >= 1 || progress < 0) {
        return wrap(Math.floor(progress), scroll);
    }
    trigger.scroll(scroll);


}


function buildSeamlessLoop(items, spacing, animateFunc) {

    let rawSequence = gsap.timeline({
            paused: true
        }), // this is where all the "real" animations live
        seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
            paused: true,
            repeat: -1, // to accommodate infinite scrolling/looping
            onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
                this._time === this._dur && (this._tTime += this._dur - 0.01);
            },
            onReverseComplete() {
                this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
            }
        }),
        cycleDuration = spacing * items.length,
        dur; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

    // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
    items.concat(items).concat(items).concat(items).concat(items).forEach((item, i) => {
        let anim = animateFunc(items[i % items.length]);
        let anim2 = animateFunc2(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        rawSequence.add(anim2, i * spacing);
        dur || (dur = anim.duration());
    });

    // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
    seamlessLoop.fromTo(rawSequence, {
        time: cycleDuration + dur / 2
    }, {
        time: "+=" + cycleDuration,
        duration: cycleDuration,
        ease: "none"
    });


    return seamlessLoop;
}




var scrolY;
var scrollstop = false;
var is_scrolling = false;
var firstExecution = 0; // Store the first execution time
var interval = 1000; // 2 seconds
var count = 0;


function incenter() {

    if (window.scrollY != scrolY) {
        scrolY = window.scrollY;
        is_scrolling = true;
        scrollstop = false;
        count = 0;
    } else {

        count++;
        if (!scrollstop) {

            if (count > 10) {
                scrollstop = true;

                scrollToOffset(scrub.vars.offset);
                centerin();
            }

        }
        is_scrolling = false;
    }


    window.requestAnimationFrame(incenter);
}

function centerin() {

    if (scrollstop) {

        document.querySelectorAll('.element .card__img').forEach(function(elem) {
            var leftl = elem.getBoundingClientRect().left - 20;
            var rightl = elem.getBoundingClientRect().right + 20;
            var middle = window.innerWidth / 2;

            if (leftl < middle && rightl > middle) {
                elem.closest('.thumbnail-scroll').classList.add('in-center');

            } else {
                elem.closest('.thumbnail-scroll').classList.remove('in-center');
            }
        });


        setTimeout(function() {
            centerin()
        }, 50)
    }

}

function incenterout() {

    document.querySelectorAll('.element .card__img').forEach(function(elem) {

        elem.closest('.thumbnail-scroll').classList.remove('in-center');

    });
}

var ScrollSpeed = 0;
var ScrollDirection = 0;

document.addEventListener("DOMContentLoaded", function(event) { //ready


    if (isIE()) {
        document.getElementById('IE11').style.display = 'block';
    }
    document.body.classList.add('DOMLoaded');

    function start() {
        if (document.body.classList.contains('endload') && document.body.classList.contains('ImagesLoaded')) {
            document.querySelector('.prcnt-loader').innerHTML = '100%';
            setTimeout(function() {
                document.body.classList.add('preload-out')
            }, 500);
            setTimeout(function() {
                document.body.classList.add('frst');
                document.querySelector('.ajax-content').classList.add('in-page');
            }, 1000)
        } else {
            setTimeout(function() {
                start();
            }, 50);
        }
    }
    start();
    Promise.all(Array.from(document.images).map(img => {
        if (img.complete)
            return Promise.resolve(img.naturalHeight !== 0);
        return new Promise(resolve => {
            img.addEventListener('load', () => resolve(true));
            img.addEventListener('error', () => resolve(false));
        });
    })).then(results => {
        if (results.every(res => res)) {
            document.body.classList.add('ImagesLoaded');
        } else {
            document.body.classList.add('ImagesLoaded');
            console.log('some images failed to load, all finished loading');
        }
    });

    document.querySelector('.page__header__navtrigger').addEventListener('click', function() {
        document.querySelector('.main').classList.add('onMenu');
        clearTimeout(changeS);
        setTimeout(function() {
            document.querySelector('.main').classList.remove('onMenu');
        }, 1000);
        document.querySelector('.main').classList.toggle('open-menu');
    })

    document.querySelector('.nav__link__mode').addEventListener('click', function() {
        document.querySelector('html').classList.toggle('alt');
    })

    window.history.pushState({
        'dir': window.location.href,
        'type': document.querySelector('.page__container').getAttribute('id')
    }, null);


    window.onpopstate = function(e) {

        if (window.history.state != null) {


            var url = window.history.state.dir;
            var fron = document.querySelector('.page__container').getAttribute('id');
            var type = window.history.state.type;



            document.querySelector('#backGhost').setAttribute('data-href', url);
            document.querySelector('#backGhost').setAttribute('data-type', type);
            document.querySelector('#backGhost').setAttribute('data-from', fron);
            document.querySelector('#backGhost').click();

        } else {
            window.location = history.back();
        }




    }


    ajaxNavigation()


    var type = document.querySelector('.page__container').getAttribute('id');
    setTimeout(function() {
        page(type)
    }, 50);


    //page info
    window.pax = [0, 0];
    document.addEventListener('mousemove', function(ev) {
        window.pax = [ev.x, ev.y]
        tim = 30;
    });


    window.addEventListener('resize', function() {

        if (document.querySelector('[data-scroll-container]') != null) {

            if (document.querySelector('html').classList.contains('has-scroll-smooth')) {
                window.scroll.destroy();
                window.scroll.init();
                if (type == 'about') {
                    window.scroll.on('scroll', (args) => {
                        navCheck2();
                    })
                }
            }
        }

    });


}) // fin de document ready


var mousex = 0;
var mousey = 0;
var touchx = 0;
var touchy = 0;

function page(type) {
    document.body.classList.add(type);
    document.querySelectorAll('.nav__main__item').forEach(function(e, i) {
        let t = e.getAttribute('data-type');
        if (t == type) {
            e.classList.add('current__item')
        } else {
            e.classList.remove('current__item')
        }
    })
    document.querySelectorAll('.ajax-link').forEach(function(e, i) {
        e.setAttribute('data-from', type);
    })
    if (type == 'home') { //home page

        function startMove() {

            if (document.body.classList.contains('frst') && document.querySelector('.ajax-content').classList.contains('in-page')) {
                setTimeout(function() {
                    document.getElementById('fed-cont').addEventListener("mousemove", function(event) {

                        clearTimeout(changeS);

                        if (Math.hypot(event.clientX - mousex, event.clientY - mousey) > window.innerWidth * 0.1) { //longitud total del movimiento
                            let actdc = document.querySelector('.featured__project.is-active');
                            let act = (actdc) ? document.querySelector('.featured__project.is-active').getAttribute('data-feat') : 0;
                            let tot = document.querySelectorAll('.featured__project').length;
                            let frst = parseInt(document.querySelector('.featured__project').getAttribute('data-feat'));
                            let next = (act != tot - 1 + frst) ? parseInt(act) + 1 : frst;

                            document.querySelectorAll('.featured__project').forEach(function(e) {
                                let ac = e.getAttribute('data-feat');
                                e.classList.remove('is-active');
                                if (ac == next) {
                                    e.classList.add('is-active');
                                }
                            })
                            mousex = event.clientX; // coordenada X Mouse
                            mousey = event.clientY; // coordenada Y Mouse
                            changeT = Date.now();
                        }

                    });

                    document.getElementById('fed-cont').addEventListener("touchmove", function(event) {
                        clearTimeout(changeS);
                        if (Math.hypot(event.touches[0].clientX - touchx, event.touches[0].clientY - touchy) > window.innerWidth * 0.1) { //longitud total del movimiento
                            let actdc = document.querySelector('.featured__project.is-active');
                            let frst = parseInt(document.querySelector('.featured__project').getAttribute('data-feat'));

                            let act = (actdc) ? document.querySelector('.featured__project.is-active').getAttribute('data-feat') : frst;

                            let tot = document.querySelectorAll('.featured__project').length;
                            let next = (act != tot - 1 + frst) ? parseInt(act) + 1 : frst;

                            document.querySelectorAll('.featured__project').forEach(function(e) {
                                let ac = e.getAttribute('data-feat');
                                e.classList.remove('is-active');
                                if (ac == next) {
                                    e.classList.add('is-active');
                                }
                            })
                            touchx = event.touches[0].clientX; // coordenada X Mouse
                            touchy = event.touches[0].clientY; // coordenada Y Mouse

                            changeT = Date.now();

                        }


                    });
                    changeSl()
                }, 1500)
            } else {
                setTimeout(function() {
                    startMove()
                }, 50)
            }
        }
        startMove();
        changeL = setTimeout(function() {
            changeLl()
        }, 3000);

        window.addEventListener('wheel', function() {
            if (document.querySelector('body').classList.contains('home')) {
                if (!document.querySelector('.main').classList.contains('open-menu')) {
                    document.querySelector('.page__header__navtrigger').click();
                }
            }
        })


    } else if (type == 'info') {


        var hi = document.querySelector('.fd4').offsetHeight;

        var css = '#s1-end2 { height: calc(' + hi + 'px - 100vh); } #ghost3{height:calc(' + hi + 'px + 100vh);}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        document.querySelector('#s1-end2').style.height = 'calc(' + hi + 'px - 100vh)';
        document.querySelector('.fd4').style.height = '100vh';


        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        if (document.querySelector('[data-scroll-container]') != null) { //iniciamos locomotive scroll si es necesario
            document.querySelectorAll('.play--btn-yt').forEach(function(e, i) {
                e.addEventListener('click', function() {

                    var sec = e.closest('section');
                    var vid = e.getAttribute('data-id');
                    sec.classList.add('video--open');
                    var vcontainer = sec.querySelector('.vidiFrame');
                    if (!sec.classList.contains('yt')) { //comprobamos si se ha activado alguna vez
                        sec.classList.add('yt');
                        window.YT.ready(function() {
                            var ytplayer = new window.YT.Player(vcontainer, {
                                videoId: vid,
                                events: {
                                    'onReady': onPlayerReady,
                                }
                            });
                        })
                    } else {
                        ytplayer[secId].loadVideoById({
                            videoId: Yid,
                            startSeconds: 0,
                            suggestedQuality: 'medium'
                        });
                    }
                })
            })

            window.scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
            });

            window.scroll.on('scroll', (args) => {

                if (typeof args.currentElements['el1'] === 'object') {
                    let progress = (args.currentElements['el1'].progress) * 0.8;

                    document.querySelector('.intro__overlay').style.opacity = 0.8 - Math.round(progress * 100) / 100;
                    document.querySelector('.info__sub__menu ').classList.remove('menu-in');

                } else {
                    document.querySelector('.intro__overlay').style.opacity = 0;
                    document.querySelector('.info__sub__menu ').classList.add('menu-in');
                };
                if (typeof args.currentElements['el2'] === 'object') {



                }; // Get all current elements : args.currentElements

                navCheck();

                animateHide();
            })

            document.querySelectorAll('[data-go]').forEach(function(e, i) {
                e.addEventListener('click', function() {
                    var go = e.getAttribute('data-go');

                    window.scroll.scrollTo('#' + go, {
                        offset: -window.innerWidth * 0.1
                    });

                })

            })
            document.querySelector('#sc__down').addEventListener('click', function() {
                window.scroll.scrollTo(window.innerHeight);
            })


        }
        parallaxt();
    } else if (type == 'about') {
        window.scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            getDirection: true,
            getSpeed: true,
            tablet: {
                breakpoint: 0,
                smooth: false
            }
        });
        window.scroll.on('scroll', (args) => {
            ScrollSpeed = args.speed;
            ScrollDirection = args.direction;
            navCheck2();
        })
        window.scroll.on('start', (args) => {

        })
        if (document.querySelector('html').classList.contains('has-scroll-smooth')) {
            markee('markee', 8, 1)
        }
        document.querySelector('.scroll__top').addEventListener('click', function(e) {
            window.scroll.scrollTo(0);
        })

    } else if (type == 'project__post') {

        if (document.querySelector('.related__link') != null) {
            document.querySelectorAll('.related__link').forEach(function(e) {
                e.addEventListener('mouseenter', function() {
                    document.querySelector('.related__project').classList.add('hover-link');
                })
                e.addEventListener('mouseleave', function() {
                    document.querySelector('.related__project').classList.remove('hover-link');
                })
            })
        }
        var pr = document.querySelector('#nParent').value;
        var lang = document.querySelector('header').getAttribute('data-lang');
        var purl = (lang == 'es') ? pr : '/' + lang + '/' + pr;
        document.querySelector('.backLevel__link').setAttribute('href', purl);
        document.querySelector('.backLevel__link').setAttribute('data-href', purl)

        window.scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: "horizontal",
            tablet: {
                breakpoint: 0,
                smooth: false
            }
        });
        setTimeout(function() {
            document.querySelector('.project__ghost').innerHTML = "";
        }, 440);

        setTimeout(function() {
            window.scroll.update();
        }, 200)

    } else if (type == 'projects') {

        document.querySelectorAll('.select__input-filter').forEach(function(e, i) {
            e.addEventListener('change', function() {
                let filt = e.getAttribute('name');
                addFilter('school');
            });
        })

        document.querySelector('#filter__overlayer').addEventListener('click', function() {
            document.querySelector('#projects').classList.remove('filters-open');
        })

        document.querySelector('.filter__trigger').addEventListener('click', function() {
            document.querySelector('#projects').classList.toggle('filters-open');
        })
        document.querySelector('.filter-edition').addEventListener('change', function() {
            document.getElementById(this.value).click();
        });
        document.addEventListener("keydown", (event) => {

            if (event.key == 'ArrowRight') {
                scrollToOffset(scrub.vars.offset + spacing)
            }
            if (event.key == 'ArrowLeft') {
                scrollToOffset(scrub.vars.offset - spacing)
            }
            if (event.key == 'Enter') {
                if (document.querySelector('.thumbnail-scroll.in-center')) {
                    document.querySelector('.thumbnail-scroll.in-center a').click();
                }
            }
        });

        document.querySelector('.view__mode').addEventListener('click', function() {
            if (document.querySelector('.page__container').classList.contains('carousel-mode')) {
                document.querySelector('.page__container').classList.add('list-mode');
                document.querySelector('.page__container').classList.remove('carousel-mode');
                window.scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true

                });
                if (window.innerWidth < 1024) {
                    document.querySelector('#project__scroll').scrollTop = 0;

                };

                setTimeout(function() {
                    window.scroll.update();
                }, 1000)

            } else {

                document.querySelector('.project__list').classList.add('fadeOut');
                setTimeout(function() {
                    document.querySelector('.page__container').classList.remove('list-mode');
                    document.querySelector('.page__container').classList.add('carousel-mode');
                    window.scroll.stop();
                    window.scroll.destroy();
                    trigger.enable();
                    document.querySelector('.project__list').classList.remove('fadeOut');
                    document.querySelector('#project__scroll').style = '';
                }, 650)

            }

        });

        createFilters();
        document.querySelectorAll('.project__list__item').forEach(function(e, i) {

            e.style.transitionDelay = 0.375 + 0.075 * i + 's';
            e.querySelector('.list-open').style.transitionDelay = 0.375 + 0.075 * i + 's';
        })


        followme();

        cards = gsap.utils.toArray('.cards li');
        seamlessLoop = '';
        gsap.timeline().clear();
        if (cards.length > 1) {
            let tot = document.querySelectorAll('.cards li').length;
            seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
            wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()),
                trigger = ScrollTrigger.create({
                    start: 0,
                    onUpdate(self) {
                        incenterout();
                        let scroll = self.scroll();
                        if (scroll > self.end - 1) {
                            wrap(1, 1);

                        } else if (scroll < 1 && self.direction < 0) {
                            wrap(-1, self.end - 1);

                        } else {
                            scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
                            scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.

                        }

                    },
                    end: "+=6000",
                    pin: ".projects__gallery"
                });


            trigger.refresh();

            // below is the dragging functionality (mobile-friendly too)...
            Draggable.create(".drag-proxy", {
                type: "x",
                trigger: ".cards",
                onPress() {

                    this.startOffset = scrub.vars.offset;
                },
                onDrag() {
                    incenterout();
                    var w = (window.innerWidth > 1024) ? 0.0006 : 0.001;

                    scrub.vars.offset = this.startOffset + (this.startX - this.x) * w
                    scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
                },
                onDragEnd() {
                    scrollToOffset(scrub.vars.offset);

                }
            });

            window.requestAnimationFrame(incenter);
        } else {

            cards[0].removeAttribute('style');
            cards[0].querySelector('.thumbnail-scroll').classList.add('in-center')
        } //end cards length

    } //end projects

}

function checkfrst() {
    if (!document.body.classList.contains('frst')) {
        setTimeout(function() {
            checkfrst()
        }, 100)
    } else {
        return true;
    }
}


var tim = 20;

function followme() {

    document.querySelectorAll('.project__list__item').forEach(function(e, i) {
        let ig = e.getAttribute('data-img');
        e.addEventListener('mouseenter', function() {

            document.querySelector('.img-wrap[data-img="' + ig + '"] .list__img-container').style.visibility = "visible";
        })
        e.addEventListener('mouseleave', function() {

            document.querySelector('.img-wrap[data-img="' + ig + '"] .list__img-container').style.visibility = "hidden";
        })
    })

}





var changeS;
var changeL;
var changeT;

function changeSl() {

    let actdc = document.querySelector('.featured__project.is-active');
    let frst = parseInt(document.querySelector('.featured__project').getAttribute('data-feat'));
    let act = (actdc) ? document.querySelector('.featured__project.is-active').getAttribute('data-feat') : frst - 1;
    let tot = document.querySelectorAll('.featured__project').length;
    let next = (act != tot - 1 + frst) ? parseInt(act) + 1 : frst;
    document.querySelectorAll('.featured__project').forEach(function(e) {
        let ac = e.getAttribute('data-feat');
        e.classList.remove('is-active');
        if (ac == next) {
            e.classList.add('is-active');
        }
    })
    changeT = Date.now();
    changeS = setTimeout(function() {
        changeSl()
    }, 1500);
}

function changeLl() {
    var ahora = Date.now();
    if (ahora > changeT + 3000) {
        changeSl();
    }
    changeL = setTimeout(function() {
        changeLl()
    }, 3000);
}

function navCheck() {
    if (document.querySelectorAll('.section__text') != null) {
        document.querySelectorAll('.section__text').forEach(function(e, i) {

            if (isElementVisible(e)) {
                var g = e.getAttribute('id');
                document.querySelectorAll('.nav__link').forEach(function(e, i) {
                    e.classList.remove('in-view');
                });
                document.querySelector('.nav__link[data-go="' + g + '"]').classList.add('in-view');
            }

        })
    }
}

function navCheck2() {

    if (document.querySelectorAll('.nav__section') != null) {
        document.querySelectorAll('.nav__section').forEach(function(e, i) {
            var g = e.getAttribute('id');
            if (isElementVisible2(e)) {

                document.querySelectorAll('.about__nav__item').forEach(function(e, i) {
                    e.classList.remove('in-view');
                });
                document.querySelector('.about__nav__item[data-go="' + g + '"]').classList.add('in-view');
            } else {
                document.querySelector('.about__nav__item[data-go="' + g + '"]').classList.remove('in-view');
            }

        })
    }
}

function animateHide() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    document.querySelectorAll('.hide').forEach(function(el, i) {


        if (isElementVisible(el)) {
            if (el.classList.contains('hide')) {
                el.classList.remove('hide');
                el.classList.add('show');
            }

        }
    });
}

function isElementVisible(el) {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        topHe = (rect.height > vHeight) ? rect.height : vHeight;


    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight - 100) {
        return false;
    }
    // Return true if any of its four corners are visible
    return true;
}

function isElementVisible2(el) {
    var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        topHe = (rect.height > vHeight) ? rect.height : vHeight;

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
        return false;
    } else {
        // Return true if any of its four corners are visible
        if (rect.top < 50) {
            return true;
        } else {
            return false;
        }
    }
}

const map = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

function parallaxt() {
    let trz = {
        tX: 0,
        tY: 0
    };
    let trz2 = {
        tX: 0,
        tY: 0
    };
    let trz3 = {
        tX: 0,
        tY: 0
    };
    let evx = window.pax[0];
    let evy = window.pax[1];

    const render = function() {
        let cp = document.querySelector('#info__intro');
        if (cp) {
            if (isElementVisible(cp)) {
                let evx = window.pax[0];
                let evy = window.pax[1];
                let mx = (Math.abs(evx) > 0) ? evx : 1;
                let my = (Math.abs(evy) > 0) ? evy : 1;
                const bgX = map(mx, 0, window.innerWidth, -1, 10) * 20; // multiplicador longitud del movimiento
                const bgY = map(my, 0, window.innerHeight, -1, 10) * 20;

                const bgX2 = map(mx, 0, window.innerWidth, -6, 10) * 20; // multiplicador longitud del movimiento
                const bgY2 = map(my, 0, window.innerHeight, -6, 10) * 20;

                const bgX3 = map(mx, 0, window.innerWidth, -3, 10) * 20; // multiplicador longitud del movimiento
                const bgY3 = map(my, 0, window.innerHeight, -3, 10) * 20;
                document.querySelectorAll('.pax').forEach(function(e, i) {
                    trz.tX = math.lerp(trz.tX, bgX, 1 / 50); // a mayor numero más rapido frena
                    trz.tY = math.lerp(trz.tY, bgY, 1 / 50);
                    e.style.transform = 'translate3d(' + trz.tX + 'px, ' + trz.tY + 'px,0)';
                })
                document.querySelectorAll('.pax2').forEach(function(e, i) {
                    trz2.tX = math.lerp(trz2.tX, bgX2, 1 / 40); // a mayor numero más rapido frena
                    trz2.tY = math.lerp(trz2.tY, bgY2, 1 / 40);
                    e.style.transform = 'translate3d(' + trz2.tX + 'px, ' + trz2.tY + 'px,0)';
                })
                document.querySelectorAll('.pax3').forEach(function(e, i) {
                    trz3.tX = math.lerp(trz3.tX, bgX3, 1 / 40); // a mayor numero más rapido frena
                    trz3.tY = math.lerp(trz3.tY, bgY3, 1 / 40);
                    e.style.transform = 'translate3d(' + trz3.tX + 'px, ' + trz3.tY + 'px,0)';
                })

            }
            requestAnimationFrame(render);
        }
    }
    requestAnimationFrame(render);

}


var math = {
    lerp: function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    },
    norm: function norm(value, min, max) {
        return (value - min) / (max - min);
    }
};

function removeFromArray(arr, toRemove) {
    return arr.filter(item => toRemove.indexOf(item) === -1)
}

function ArrSort(arg) {
    arg.sort(function(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    return arg;
}

function createFilters() {

    var filters = ['school', 'tag'];
    filters.forEach(function(e, i) {
        let f = [];
        if (document.querySelector('.mk__' + e) != null) {
            document.querySelectorAll('.mk__' + e).forEach(function(el) {
                var v = el.value;
                f.push(v);
            });
            f = ArrSort(f);
            f = f.filter((valor, indice) => {
                return f.indexOf(valor) === indice;
            });
            f.forEach(function(es, is) {
                if (e == 'school') {
                    document.querySelector('.filter-' + e).innerHTML += '<option value="' + es + '">' + es.replaceAll('_', ' ') + '</option>';
                } else {
                    document.querySelector('.tag__cloud').innerHTML += '<div class="tag-wrp"><input type="checkbox" name="tag" value="' + es + '" onclick="erasecheck(this);" class="filter-tag"><div><span>' + es.replaceAll('_', ' ') + '</span></div></input></div>';
                }
            });
        }
    })
}

function createcloud(arg) {
    document.querySelector('.tag__cloud').innerHTML = "";
    let f = [];
    if (document.querySelector('.mk__tag') != null) {
        document.querySelectorAll('.project__list__item:not(.pr-disabled) .mk__tag').forEach(function(el) {

            var v = el.value;

            f.push(v);
        });

        f = ArrSort(f);
        f = f.filter((valor, indice) => {
            return f.indexOf(valor) === indice;
        });
        f.forEach(function(es, is) {
            document.querySelector('.tag__cloud').innerHTML += '<div class="tag-wrp"><input type="checkbox" name="tag" value="' + es + '" onclick="erasecheck(this);" class="filter-tag"><div><span>' + es.replaceAll('_', ' ') + '</span></div></input></div>';
        })

    }
    if (arg != '') {
        document.querySelector('.filter-tag[value="' + arg[0] + '"]').checked = true;
    };
}

function erasecheck(arg) {

    if (!arg.checked) {

        document.querySelectorAll('.filter-tag').forEach(function(e, i) {
            e.checked = false;
        })
    } else {
        document.querySelectorAll('.filter-tag').forEach(function(e, i) {
            e.checked = false;
        })
        arg.checked = true;
    }
    addFilter();
}

function addFilter(arg) {
    if (arg == 'school') {
        document.querySelectorAll('.filter-tag').forEach(function(e, i) {
            e.checked = false;
        })
    }
    var school = [document.querySelector('.filter-school').value];
    if (document.querySelector('.filter-tag:checked') != null) {
        var tag = [document.querySelector('.filter-tag:checked').value];
    } else {
        var tag = [];
    }

    var time = 650;
    var filAp = 0;
    let all = [];
    let all2 = [];
    var ptot;
    var container = document.querySelector('.project__carousel');
    var container2 = document.querySelector('.project__list');
    window.scrollTo(0, 0);
    if (trigger != null) {
        trigger.disable();
    }
    container.classList.add('fadeOut');

    document.querySelectorAll(".cloned").forEach(function(e) {
        e.remove()
    }) //eliminamos los elementos clonados
    var sel = document.querySelectorAll('.cards li');
    var est = document.querySelectorAll('.project__list__item');

    setTimeout(function() {
        if (school.length > 0 || tag.length > 0) {
            document.querySelector('.filter__select').classList.add('filter-applied')
        } else {
            document.querySelector('.filter__select').classList.remove('filter-applied')
        };

        sel.forEach(function(e, i) {
            e.classList.add('pr-disabled')
            let id = e.getAttribute('id');
            all.push(id);
        });
        est.forEach(function(e, i) {
            e.classList.add('pr-disabled')
            let id = e.getAttribute('id');
            all2.push(id);
        });
        ptot = all.length;
        if (school.length > 0 && school != '') {
            var arr = [];
            var arr2 = [];
            var ies = [];
            var ies2 = [];
            for (var i = 0; i < school.length; i++) {
                var sh = school[i];
                document.querySelectorAll('.element input[value="' + sh + '"]').forEach(function(e, i) {
                    var id = e.closest('li').getAttribute('id');
                    var pos = arr.indexOf(id);
                    arr.push(id);
                });
                document.querySelectorAll('.project__list__item input[value="' + sh + '"]').forEach(function(e, i) {
                    var id = e.closest('li').getAttribute('id');
                    var pos = arr2.indexOf(id);
                    arr2.push(id);
                });
            } // fin for cracion de arrays ids

            for (var i = 0; i < all.length; i++) {
                var pos = arr.indexOf(all[i]);
                var pos2 = arr2.indexOf(all2[i]);
                if (pos == -1) {
                    ies.push(i)
                };
                if (pos2 == -1) {
                    ies2.push(i)
                };
            } //fin for reduce arrays
            for (var i = ies.length - 1; i >= 0; i--) {
                all.splice(ies[i], 1);
                all2.splice(ies2[i], 1);
            } //fin for slice arrays

        } // fin if school
        if (tag.length != 0 && tag != '') {
            var arr = [];
            var arr2 = [];
            var ies = [];
            var ies2 = [];
            for (var i = 0; i < tag.length; i++) {
                var sh = tag[i];
                document.querySelectorAll('.element input[value="' + sh + '"]').forEach(function(e, i) {
                    var id = e.closest('li').getAttribute('id');
                    var pos = arr.indexOf(id);
                    arr.push(id);
                });
                document.querySelectorAll('.project__list__item input[value="' + sh + '"]').forEach(function(e, i) {
                    var id = e.closest('li').getAttribute('id');
                    var pos = arr2.indexOf(id);
                    arr2.push(id);
                });
            } //fin for cracion de arrays ids

            for (var i = 0; i < all.length; i++) {
                var pos = arr.indexOf(all[i]);
                var pos2 = arr2.indexOf(all2[i]);
                if (pos == -1) {
                    ies.push(i)
                };
                if (pos2 == -1) {
                    ies2.push(i)
                };
            } //fin for rfeduce arrays
            for (var i = ies.length - 1; i >= 0; i--) {
                all.splice(ies[i], 1);
                all2.splice(ies2[i], 1);
            } //fin for slice arrays
        } // fin if tag


        document.getElementById('num-projects').innerHTML = '(' + all2.length + ')'; //insertamos el numero de proyectos
        for (var i = 0; i < all.length; i++) {
            document.querySelectorAll('#' + all[i]).forEach(function(e, i) {
                e.classList.remove('pr-disabled')
            });
            document.querySelectorAll('#' + all2[i]).forEach(function(e, i) {
                e.classList.remove('pr-disabled')
            });
        } // activamos los proyectos filtrados

        window.cancelAnimationFrame(incenter);
        //clonamos los proyectos necesarios, se necesitan un mínimo de 6
        if (all2.length < 6 && all2.length >= 3) {
            document.querySelectorAll(".cards li:not(.pr-disabled)").forEach(function(e) {
                var p = e.cloneNode(true);
                p.classList.add('cloned');
                document.querySelector('.cards').appendChild(p);

            })
            var clon = document.querySelectorAll('.cards li.cloned .ajax-link');
            ajaxcloned(clon);

        } else if (all2.length == 2) {
            all2.forEach(function() {
                document.querySelectorAll(".cards li:not(.pr-disabled)").forEach(function(e) {
                    var p = e.cloneNode(true);
                    p.classList.add('cloned');
                    document.querySelector('.cards').appendChild(p);
                })
            })
            var clon = document.querySelectorAll('.cards li.cloned .ajax-link');
            ajaxcloned(clon);
        }

        if (arg == 'school') {
            createcloud(tag);
        } //solo se crean los tag si se cambia de escuela
        document.querySelectorAll(".cards li").forEach(function(e) {
            e.style = ''
        });
        //clear gsap
        window.scrollTo(0, 0);
        if (trigger != null) {
            trigger.disable();
            trigger.kill();

        }
        seamlessLoop = '';
        wrapTime = '';

        gsap.timeline().clear();

        if (all2.length > 1) {
            document.querySelector('.project__carousel').classList.remove('tt-fx');
            cards = gsap.utils.toArray('.cards li:not(.pr-disabled)');

            seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
            wrapTime = gsap.utils.wrap(0, seamlessLoop.duration())

            window.requestAnimationFrame(incenter);


            if (document.querySelector('.page__container').classList.contains('list-mode')) {
                window.scroll.update();

            } else {
                var tot = document.querySelectorAll(".cards li:not(.pr-disabled)").length;

                var sc = (tot < 10) ? 3000 : 6000;
                trigger = ScrollTrigger.create({
                    start: 0,
                    onUpdate(self) {
                        incenterout();
                        let scroll = self.scroll();
                        if (scroll > self.end - 1) {
                            wrap(1, 1);

                        } else if (scroll < 1 && self.direction < 0) {
                            wrap(-1, self.end - 1);

                        } else {
                            scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
                            scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.

                        }

                    },
                    end: "+=" + sc,
                    pin: ".projects__gallery"
                });

            }
        } else {
            window.scrollTo(0, 0);
            document.querySelector('.project__carousel').classList.add('tt-fx');
        }


        container.classList.remove('fadeOut');

    }, time); //fin set timeout
}

function getComputedTranslateX(obj) {

    if (!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
}


function markee(id, sp, direction) {

    var obj = document.getElementById(id);


    function render() {
        var objB = obj.getBoundingClientRect();
        var limit = -objB.width / 3;

        if (document.getElementById(id) != null) {
            var r = getComputedTranslateX(obj);
            var dir = (ScrollDirection == 'up') ? -1 : 1;
            var spe = sp * dir;
            var ss = Math.abs(ScrollSpeed);
            var spem = parseFloat(ss) * 10;
            var ve1 = parseFloat((sp + spem) * dir).toFixed(3);
            var vel = parseFloat(r - (ve1) * 0.15).toFixed(3);


            if (ve1 > 0) {

                if (vel <= limit) {

                    var el = obj.style.transform = 'translateX(0px)';
                } else {


                    var el = obj.style.transform = 'translateX(' + vel + 'px)';

                }
            } else {

                if (vel >= 0) {
                    var el = obj.style.transform = 'translateX(' + limit + 'px)';
                } else {

                    if (vel <= limit) {


                    } else {

                        var el = obj.style.transform = 'translateX(' + vel + 'px)';
                    }
                }
            };
            requestAnimationFrame(render)
        }
    }
    requestAnimationFrame(render)
};




//////////////////////AJAX NAVIGATION/////////////////////////

var ajaxReady = true;
window.onpopstate = function(event) {
    window.location.href = document.location;
};
/*
function handlePopState(event) {

    if (event.state.dir) {
    	window.location.assign(event.state.dir);
    }
};*/
function ajaxcloned(args) {
    args.forEach(function(e, i) {
        e.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            //funcion de salida
            if (ajaxReady) {
                ajaxReady = false;
                var id = e.getAttribute('data-id');
                var type = e.getAttribute('data-type');
                var dir = e.getAttribute('data-href');
                var from = e.getAttribute('data-from');
                var smooth = (document.querySelector('html').classList.contains('has-scroll-smooth') ? true : false);
                var args = [id, dir, type, from, smooth];

                document.querySelectorAll('.nav__main__item').forEach(function(e, i) {
                    let t = e.getAttribute('data-type');
                    if (t == type) {
                        e.classList.add('current__item')
                    } else {
                        e.classList.remove('current__item')
                    }
                })
                if (document.querySelector('.main').classList.contains('open-menu')) {
                    document.querySelector('.page__header__navtrigger').click();
                }
                if (type == 'project__post' && smooth && from == 'project__post') {

                    document.body.classList.add('to-post');
                    window.scroll.scrollTo(50000, {
                        callback: function() {
                            var content = document.querySelector('.ajax-content');
                            content.classList.remove('in-page');
                            content.classList.add('page-out');
                            var tr = content.querySelector('.related-img1').getAttribute('style');
                            var src = content.querySelector('.related-img1').getAttribute('src');
                            var gs = document.querySelector('.project__ghost');
                            var gsth = '<div class="ghost__mask"><div class="ghost-img__container"><div class="ghost-img__wrp"><img class="ofc__img" src="' + src + '" style="' + tr + '"></div></div></div>';

                            setTimeout(function() {
                                gs.innerHTML = gsth;
                            }, 600);

                            onExitAjax(args);
                        },
                        disableLerp: true,
                        duration: 500
                    });
                } else {
                    window.clearTimeout(changeS);
                    window.clearTimeout(changeL);
                    window.cancelAnimationFrame(incenter);

                    document.querySelector('.ajax-content').classList.remove('in-page');
                    document.querySelector('.ajax-content').classList.add('page-out');
                    document.querySelector('.ajax__ghost').classList.add('ajax-out');
                    setTimeout(function() {
                        if (from == 'projects') {
                            window.scrollTo(0, 0);
                            seamlessLoop = '';
                            gsap.timeline().clear();
                            if (trigger != null) {
                                trigger.disable();
                                trigger.kill();
                            }

                        }
                        onExitAjax(args);
                    }, 1000);

                }

            }

        })
    })
}

function ajaxNavigation() {

    document.querySelectorAll('a.ajax-link').forEach(function(e, i) {
        e.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            //funcion de salida
            if (ajaxReady) {
                ajaxReady = false;
                var history = e.getAttribute('data-history') || '';
                var id = e.getAttribute('data-id');
                var type = e.getAttribute('data-type');
                var dir = e.getAttribute('data-href');
                var from = e.getAttribute('data-from');
                var smooth = (document.querySelector('html').classList.contains('has-scroll-smooth') ? true : false);
                var args = [id, dir, type, from, smooth, history];

                document.querySelectorAll('.nav__main__item').forEach(function(e, i) {
                    let t = e.getAttribute('data-type');
                    if (t == type) {
                        e.classList.add('current__item')
                    } else {
                        e.classList.remove('current__item')
                    }
                })
                if (document.querySelector('.main').classList.contains('open-menu')) {
                    document.querySelector('.page__header__navtrigger').click();
                }
                if (type == 'project__post' && smooth && from == 'project__post' && history != 'none') {

                    document.body.classList.add('to-post');
                    window.scroll.scrollTo(50000, {
                        callback: function() {
                            var content = document.querySelector('.ajax-content');
                            content.classList.remove('in-page');
                            content.classList.add('page-out');
                            var tr = content.querySelector('.related-img1').getAttribute('style');
                            var src = content.querySelector('.related-img1').getAttribute('src');
                            var gs = document.querySelector('.project__ghost');
                            var gsth = '<div class="ghost__mask"><div class="ghost-img__container"><div class="ghost-img__wrp"><img class="ofc__img" src="' + src + '" style="' + tr + '"></div></div></div>';

                            setTimeout(function() {
                                gs.innerHTML = gsth;
                            }, 400);

                            setTimeout(function() {
                                onExitAjax(args)
                            }, 550);
                        },
                        disableLerp: true,
                        duration: 500
                    });
                } else {
                    window.clearTimeout(changeS);
                    window.clearTimeout(changeL);
                    window.cancelAnimationFrame(incenter);

                    document.querySelector('.ajax-content').classList.remove('in-page');
                    document.querySelector('.ajax-content').classList.add('page-out');
                    document.querySelector('.ajax__ghost').classList.add('ajax-out');
                    setTimeout(function() {
                        if (from == 'projects') {
                            window.scrollTo(0, 0);
                            seamlessLoop = '';
                            gsap.timeline().clear();
                            if (trigger != null) {
                                trigger.disable();
                                trigger.kill();
                            }

                        }
                        onExitAjax(args);
                    }, 1000);

                }

            }

        })

    })


}

function onExitAjax(args) {
    if (!document.querySelector('.main').classList.contains('open-menu') && !document.querySelector('.ajax-content').classList.contains('in-page')) {
        var id = args[0];
        var dir = args[1];
        var type = args[2];
        var from = args[3];
        var smooth = args[4];
        var history = args[5];

        if (type == 'project__post' && smooth && from == 'project__post') {
            ajaxLoadPost(args)
        } else {
            ajaxLoad(args)
        };
    } else {
        setTimeout(function() {
            onExitAjax(args);
        }, 50);
    }
}


function ajaxLoad(args) {

    var content = document.querySelector('.ajax-content');
    if (window.scroll.smooth) {

        window.scroll.destroy();
    }

    if (!ajaxReady) {

        ajaxReady = false;
        var id = args[0];
        var dir = args[1];
        var type = args[2];
        var from = args[3];
        var data = {
            'id': id,
            'dir': dir,
            'type': type,
            'args': JSON.stringify(args)
        }
        document.body.classList.remove('projects');
        document.body.classList.remove('home');
        document.body.classList.remove('info');
        if (type == 'project__post' && from == 'project__post') {} else {
            document.body.classList.remove('project__post');
        }
        var url = dir;

        function success(response) {

            if (response == 0 || response == undefined || response.length == 0) {
                alert('error');

            } else {

                const promise = new Promise((resolve, reject) => {


                    var rr = response.split('<!--ajax-->');
                    content.innerHTML = '';



                    resolve(content.innerHTML = rr[1]);


                })
                promise.then(() => { //in plain js

                    window.scrollTo(0, 0);
                    if (args[5] != 'none') {
                        history.pushState(data, null, dir);
                    }
                    content.classList.remove('page-out');
                    content.classList.add('ajaxComplete');

                    onAjax(type, from);

                })
                //*************sliders*********/

                setTimeout(function() {}, 200);

            }


        }

        function ajaxerror() {
            alert('ajax error');
            window.location.href = dir;
        }


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                success(this.responseText);
            }
        };
        xhttp.open("POST", dir, true);
        xhttp.send();

    }
}

function ajaxLoadPost(args) {
    var content = document.querySelector('.ajax-content');


    if (!ajaxReady) {

        ajaxReady = false;
        var id = args[0];
        var dir = args[1];
        var type = args[2];
        var from = args[3];
        var data = {
            'id': id,
            'dir': dir,
            'type': type,
            'args': JSON.stringify(args)
        }
        var url = dir;

        fetch(url, {
                method: 'post',
                headers: {
                    "Content-type": "text/plain"
                },
                body: "text"
            })
            .then(function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }



                // Examine the text in the response
                response.text().then(function(data) {

                    success(data);
                })
            })
            .catch(function(error) {
                console.log('Request failed', error);
            });

    }

    function success(response) {
        //content.classList.remove('ghosta');
        if (response == 0 || response == undefined || response.length == 0) {
            alert('error');
            //window.location.href = dir;
        } else {

            var tr = content.querySelector('.related-img1').getAttribute('style');


            const promise = new Promise((resolve, reject) => {


                var rr = response.split('<!--ajax-->');
                window.scroll.destroy();
                content.innerHTML = '';

                content.innerHTML = rr[1]


                resolve();


            })
            promise.then(() => { //in plain js????
                window.scrollTo(0, 0);
                if (args[5] != 'none') {
                    history.pushState(data, null, dir);
                }

                content.classList.remove('page-out');
                content.classList.add('ajaxComplete');
                content.querySelector('.f-img1').setAttribute('style', tr);
                onAjaxPost(type, from);

            })
            //*************sliders*********/

            setTimeout(function() {}, 200);

        }


    }

    function ajaxerror() {
        alert('ajax error');
        window.location.href = dir;
    }
}

function onAjax(type, from) {

    if (document.querySelector('.ajax-content').classList.contains('ajaxComplete')) {

        var content = document.querySelector('.ajax-content');



        ajaxReady = true;
        setTimeout(function() {
            content.classList.add('in-page');
            content.classList.remove('ajaxComplete');
        }, 250);

        page(type);
        document.querySelector('.ajax__ghost').classList.remove('ajax-out');

        document.querySelectorAll('.nav__main__item').forEach(function(e) {
            e.classList.remove('current')
            var t = e.getAttribute('data-type');
            if (t == type) {
                e.classList.add('current')
            }
        })
        document.title = document.querySelector('#nTitle').value;

        ajaxNavigation();
        document.body.classList.add(type);
        dataLayer.push({
            event: 'pageview',
            page: {
                path: window.location.href,
                title: document.title
            }
        });

        //


    }
}

function onAjaxPost(type, from) {

    if (document.querySelector('.ajax-content').classList.contains('ajaxComplete')) {

        ajaxReady = true;


        page(type)
        setTimeout(function() {

            document.querySelector('.ajax-content').classList.add('in-page');
            if (document.querySelector('html').classList.contains('has-scroll-smooth')) {
                document.body.classList.remove('to-post');

            }
            document.querySelector('.ajax__ghost').classList.remove('ajax-out');

        }, 200);


        document.querySelector('.ajax-content').classList.remove('ajaxComplete');
        document.title = document.querySelector('#nTitle').value;
        ajaxNavigation();
        document.body.classList.add(type);
        dataLayer.push({
            event: 'pageview',
            page: {
                path: window.location.href,
                title: document.title
            }
        });


    }
}

function isIE() {
    const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    const msie = ua.indexOf('MSIE '); // IE 10 or older
    const trident = ua.indexOf('Trident/'); //IE 11

    return (msie > 0 || trident > 0);
}

function onPlayerReady(event) {
    event.target.playVideo();
}


if ('serviceWorker' in navigator) {
    console.log('sw');
    window.addEventListener('load', function() {

        navigator.serviceWorker.register('sw.js')
            .then((reg) => {
                // registration worked
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // registration failed
                console.log('Registration failed with ' + error);
            });
    })
}