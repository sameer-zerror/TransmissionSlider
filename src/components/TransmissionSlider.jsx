import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Draggable from "gsap/dist/Draggable";
gsap.registerPlugin(ScrollTrigger, Draggable);
const projects = [
  {
    id: "pr0",
    name: "Yol Meoded",
    href: "",
    img: "/default/imagenes/2021/11/7222_en-yol-meoded-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Material", "Craftsmanship"],
  },
  {
    id: "pr1",
    name: "Gal Josef",
    href: "",
    img: "/default/imagenes/2021/11/8066_en-gal-josef-home-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr2",
    name: "Ran Graber",
    href: "",
    img: "/default/imagenes/2021/11/8068_en-ran-graber-home-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: [],
  },
  {
    id: "pr3",
    name: "Roi Bardas",
    href: "",
    img: "/default/imagenes/2021/11/7320_en-roi-bardas-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr4",
    name: "Yulie Toledano",
    href: "",
    img: "/default/imagenes/2021/11/7220_en-yulie-toledano-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr5",
    name: "Akiho Ka",
    href: "",
    img: "/default/imagenes/2022/02/8227_en-akiho-ka-index-Real.jpg",
    school: "Osaka_Institute_of_Fashion",
    tags: ["Shape", "Sustainability"],
  },
  {
    id: "pr6",
    name: "Yol Meoded",
    href: "",
    img: "/default/imagenes/2021/11/7222_en-yol-meoded-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Material", "Craftsmanship"],
  },
  {
    id: "pr7",
    name: "Gal Josef",
    href: "",
    img: "/default/imagenes/2021/11/8066_en-gal-josef-home-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr8",
    name: "Ran Graber",
    href: "",
    img: "/default/imagenes/2021/11/8068_en-ran-graber-home-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: [],
  },
  {
    id: "pr9",
    name: "Roi Bardas",
    href: "",
    img: "/default/imagenes/2021/11/7320_en-roi-bardas-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr10",
    name: "Yulie Toledano",
    href: "",
    img: "/default/imagenes/2021/11/7220_en-yulie-toledano-index-Real.jpg",
    school: "Shenkar_College_of_Engineering,_Design_and_Arts",
    tags: ["Tailoring"],
  },
  {
    id: "pr11",
    name: "Akiho Ka",
    href: "",
    img: "/default/imagenes/2022/02/8227_en-akiho-ka-index-Real.jpg",
    school: "Osaka_Institute_of_Fashion",
    tags: ["Shape", "Sustainability"],
  },
];
const TransmissionSlider = () => {
  //   useEffect(() => {
  //     let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.

  //     // set initial state of items
  //     window.scrollTo(0, 0);
  //     gsap.set(".cards li", {
  //       xPercent: 210,
  //       scale: 0.25,
  //     });

  //     var cards = gsap.utils.toArray(".cards li");
  //     var trigger;
  //     var sp = window.innerWidth > 1024 ? 210 : 180;
  //     var dr = window.innerWidth > 1024 ? 0.85 : 0.5;
  //     var op = window.innerWidth > 1024 ? 210 : 180;
  //     const spacing = 0.105, // spacing of the cards (stagger)
  //       snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop
  //       // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
  //       animateFunc = (element) => {
  //         const tl = gsap.timeline();
  //         tl.fromTo(
  //           element,
  //           {
  //             scale: 0.25,
  //           },
  //           {
  //             scale: 1,
  //             zIndex: 100,
  //             duration: 0.5,
  //             yoyo: true,
  //             repeat: 1,
  //             ease: "power1.in",
  //             immediateRender: false,
  //           }
  //         ).fromTo(
  //           element,
  //           {
  //             xPercent: 210,
  //           },
  //           {
  //             xPercent: -210,
  //             duration: 1,
  //             ease: "none",
  //             immediateRender: true,
  //           },
  //           0
  //         );
  //         return tl;
  //       },
  //       animateFunc2 = (element) => {
  //         const tl2 = gsap.timeline();
  //         tl2.fromTo(
  //           element.querySelector(".overlayer"),
  //           {
  //             opacity: 0,
  //           },
  //           {
  //             opacity: 1,
  //             duration: 0.5,
  //             yoyo: true,
  //             repeat: 1,
  //             ease: "power1.in",
  //             immediateRender: false,
  //           }
  //         );
  //         return tl2;
  //       };
  //     var seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
  //       wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration)
  //       playhead = {
  //         offset: 0,
  //       }, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
  //       scrub = gsap.to(playhead, {
  //         // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
  //         offset: 0,
  //         onUpdate() {
  //           seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
  //         },
  //         duration: dr,
  //         ease: "power4",
  //         paused: true,
  //       }),
  //       // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
  //       progressToScroll = (progress) =>
  //         gsap.utils.clamp(
  //           1,
  //           trigger.end - 1,
  //           gsap.utils.wrap(0, 1, progress) * trigger.end
  //         ),
  //       wrap = (iterationDelta, scrollTo) => {
  //         iteration += iterationDelta;
  //         trigger.scroll(scrollTo);
  //         trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update().
  //       };

  //     // when the user stops scrolling, snap to the closest item.

  //     //ScrollTrigger.addEventListener("scrollEnd", function(){scrollToOffset(scrub.vars.offset); incenter()});

  //     // feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
  //     function scrollToOffset(offset) {
  //       // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.

  //       let snappedTime = snapTime(offset);
  //       if (seamlessLoop == "") {
  //         return;
  //       }
  //       let progress =
  //           (snappedTime - seamlessLoop.duration() * iteration) /
  //           seamlessLoop.duration(),
  //         scroll = progressToScroll(progress);
  //       if (progress >= 1 || progress < 0) {
  //         return wrap(Math.floor(progress), scroll);
  //       }
  //       trigger.scroll(scroll);
  //     }

  //     function buildSeamlessLoop(items, spacing, animateFunc) {
  //       let rawSequence = gsap.timeline({
  //           paused: true,
  //         }), // this is where all the "real" animations live
  //         seamlessLoop = gsap.timeline({
  //           // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
  //           paused: true,
  //           repeat: -1, // to accommodate infinite scrolling/looping
  //           onRepeat() {
  //             // works around a super rare edge case bug that's fixed GSAP 3.6.1
  //             this._time === this._dur && (this._tTime += this._dur - 0.01);
  //           },
  //           onReverseComplete() {
  //             this.totalTime(this.rawTime() + this.duration() * 100); // seamless looping backwards
  //           },
  //         }),
  //         cycleDuration = spacing * items.length,
  //         dur; // the duration of just one animateFunc() (we'll populate it in the .forEach() below...

  //       // loop through 3 times so we can have an extra cycle at the start and end - we'll scrub the playhead only on the 2nd cycle
  //       items
  //         .concat(items)
  //         .concat(items)
  //         .concat(items)
  //         .concat(items)
  //         .forEach((item, i) => {
  //           let anim = animateFunc(items[i % items.length]);
  //           let anim2 = animateFunc2(items[i % items.length]);
  //           rawSequence.add(anim, i * spacing);
  //           rawSequence.add(anim2, i * spacing);
  //           dur || (dur = anim.duration());
  //         });

  //       // animate the playhead linearly from the start of the 2nd cycle to its end (so we'll have one "extra" cycle at the beginning and end)
  //       seamlessLoop.fromTo(
  //         rawSequence,
  //         {
  //           time: cycleDuration + dur / 2,
  //         },
  //         {
  //           time: "+=" + cycleDuration,
  //           duration: cycleDuration,
  //           ease: "none",
  //         }
  //       );

  //       return seamlessLoop;
  //     }

  //     var scrolY;
  //     var scrollstop = false;
  //     var is_scrolling = false;
  //     var firstExecution = 0; // Store the first execution time
  //     var interval = 1000; // 2 seconds
  //     var count = 0;

  //     function incenter() {
  //       if (window.scrollY != scrolY) {
  //         scrolY = window.scrollY;
  //         is_scrolling = true;
  //         scrollstop = false;
  //         count = 0;
  //       } else {
  //         count++;
  //         if (!scrollstop) {
  //           if (count > 10) {
  //             scrollstop = true;

  //             scrollToOffset(scrub.vars.offset);
  //             centerin();
  //           }
  //         }
  //         is_scrolling = false;
  //       }

  //       window.requestAnimationFrame(incenter);
  //     }

  //     function centerin() {
  //       if (scrollstop) {
  //         document
  //           .querySelectorAll(".element .card__img")
  //           .forEach(function (elem) {
  //             var leftl = elem.getBoundingClientRect().left - 20;
  //             var rightl = elem.getBoundingClientRect().right + 20;
  //             var middle = window.innerWidth / 2;

  //             if (leftl < middle && rightl > middle) {
  //               elem.closest(".thumbnail-scroll").classList.add("in-center");
  //             } else {
  //               elem.closest(".thumbnail-scroll").classList.remove("in-center");
  //             }
  //           });

  //         setTimeout(function () {
  //           centerin();
  //         }, 50);
  //       }
  //     }

  //     function incenterout() {
  //       document.querySelectorAll(".element .card__img").forEach(function (elem) {
  //         elem.closest(".thumbnail-scroll").classList.remove("in-center");
  //       });
  //     }

  //     var ScrollSpeed = 0;
  //     var ScrollDirection = 0;

  //     var mousex = 0;
  //     var mousey = 0;
  //     var touchx = 0;
  //     var touchy = 0;

  //     function page(type) {
  //       document.body.classList.add(type);
  //       document.querySelectorAll(".nav__main__item").forEach(function (e, i) {
  //         let t = e.getAttribute("data-type");
  //         if (t == type) {
  //           e.classList.add("current__item");
  //         } else {
  //           e.classList.remove("current__item");
  //         }
  //       });
  //       document.querySelectorAll(".ajax-link").forEach(function (e, i) {
  //         e.setAttribute("data-from", type);
  //       });
  //       if (type == "home") {
  //         //home page

  //         function startMove() {
  //           if (
  //             document.body.classList.contains("frst") &&
  //             document
  //               .querySelector(".ajax-content")
  //               .classList.contains("in-page")
  //           ) {
  //             setTimeout(function () {
  //               document
  //                 .getElementById("fed-cont")
  //                 .addEventListener("mousemove", function (event) {
  //                   clearTimeout(changeS);

  //                   if (
  //                     Math.hypot(event.clientX - mousex, event.clientY - mousey) >
  //                     window.innerWidth * 0.1
  //                   ) {
  //                     //longitud total del movimiento
  //                     let actdc = document.querySelector(
  //                       ".featured__project.is-active"
  //                     );
  //                     let act = actdc
  //                       ? document
  //                           .querySelector(".featured__project.is-active")
  //                           .getAttribute("data-feat")
  //                       : 0;
  //                     let tot =
  //                       document.querySelectorAll(".featured__project").length;
  //                     let frst = parseInt(
  //                       document
  //                         .querySelector(".featured__project")
  //                         .getAttribute("data-feat")
  //                     );
  //                     let next = act != tot - 1 + frst ? parseInt(act) + 1 : frst;

  //                     document
  //                       .querySelectorAll(".featured__project")
  //                       .forEach(function (e) {
  //                         let ac = e.getAttribute("data-feat");
  //                         e.classList.remove("is-active");
  //                         if (ac == next) {
  //                           e.classList.add("is-active");
  //                         }
  //                       });
  //                     mousex = event.clientX; // coordenada X Mouse
  //                     mousey = event.clientY; // coordenada Y Mouse
  //                     changeT = Date.now();
  //                   }
  //                 });

  //               document
  //                 .getElementById("fed-cont")
  //                 .addEventListener("touchmove", function (event) {
  //                   clearTimeout(changeS);
  //                   if (
  //                     Math.hypot(
  //                       event.touches[0].clientX - touchx,
  //                       event.touches[0].clientY - touchy
  //                     ) >
  //                     window.innerWidth * 0.1
  //                   ) {
  //                     //longitud total del movimiento
  //                     let actdc = document.querySelector(
  //                       ".featured__project.is-active"
  //                     );
  //                     let frst = parseInt(
  //                       document
  //                         .querySelector(".featured__project")
  //                         .getAttribute("data-feat")
  //                     );

  //                     let act = actdc
  //                       ? document
  //                           .querySelector(".featured__project.is-active")
  //                           .getAttribute("data-feat")
  //                       : frst;

  //                     let tot =
  //                       document.querySelectorAll(".featured__project").length;
  //                     let next = act != tot - 1 + frst ? parseInt(act) + 1 : frst;

  //                     document
  //                       .querySelectorAll(".featured__project")
  //                       .forEach(function (e) {
  //                         let ac = e.getAttribute("data-feat");
  //                         e.classList.remove("is-active");
  //                         if (ac == next) {
  //                           e.classList.add("is-active");
  //                         }
  //                       });
  //                     touchx = event.touches[0].clientX; // coordenada X Mouse
  //                     touchy = event.touches[0].clientY; // coordenada Y Mouse

  //                     changeT = Date.now();
  //                   }
  //                 });
  //               changeSl();
  //             }, 1500);
  //           } else {
  //             setTimeout(function () {
  //               startMove();
  //             }, 50);
  //           }
  //         }
  //         startMove();
  //         changeL = setTimeout(function () {
  //           changeLl();
  //         }, 3000);

  //         window.addEventListener("wheel", function () {
  //           if (document.querySelector("body").classList.contains("home")) {
  //             if (
  //               !document.querySelector(".main").classList.contains("open-menu")
  //             ) {
  //               document.querySelector(".page__header__navtrigger").click();
  //             }
  //           }
  //         });
  //       } else if (type == "projects") {
  //         document
  //           .querySelectorAll(".select__input-filter")
  //           .forEach(function (e, i) {
  //             e.addEventListener("change", function () {
  //               let filt = e.getAttribute("name");
  //               addFilter("school");
  //             });
  //           });

  //         document
  //           .querySelector("#filter__overlayer")
  //           .addEventListener("click", function () {
  //             document
  //               .querySelector("#projects")
  //               .classList.remove("filters-open");
  //           });

  //         document
  //           .querySelector(".filter__trigger")
  //           .addEventListener("click", function () {
  //             document
  //               .querySelector("#projects")
  //               .classList.toggle("filters-open");
  //           });
  //         document
  //           .querySelector(".filter-edition")
  //           .addEventListener("change", function () {
  //             document.getElementById(this.value).click();
  //           });
  //         document.addEventListener("keydown", (event) => {
  //           if (event.key == "ArrowRight") {
  //             scrollToOffset(scrub.vars.offset + spacing);
  //           }
  //           if (event.key == "ArrowLeft") {
  //             scrollToOffset(scrub.vars.offset - spacing);
  //           }
  //           if (event.key == "Enter") {
  //             if (document.querySelector(".thumbnail-scroll.in-center")) {
  //               document.querySelector(".thumbnail-scroll.in-center a").click();
  //             }
  //           }
  //         });

  //         document
  //           .querySelector(".view__mode")
  //           .addEventListener("click", function () {
  //             if (
  //               document
  //                 .querySelector(".page__container")
  //                 .classList.contains("carousel-mode")
  //             ) {
  //               document
  //                 .querySelector(".page__container")
  //                 .classList.add("list-mode");
  //               document
  //                 .querySelector(".page__container")
  //                 .classList.remove("carousel-mode");
  //               window.scroll = new LocomotiveScroll({
  //                 el: document.querySelector("[data-scroll-container]"),
  //                 smooth: true,
  //               });
  //               if (window.innerWidth < 1024) {
  //                 document.querySelector("#project__scroll").scrollTop = 0;
  //               }

  //               setTimeout(function () {
  //                 window.scroll.update();
  //               }, 1000);
  //             } else {
  //               document.querySelector(".project__list").classList.add("fadeOut");
  //               setTimeout(function () {
  //                 document
  //                   .querySelector(".page__container")
  //                   .classList.remove("list-mode");
  //                 document
  //                   .querySelector(".page__container")
  //                   .classList.add("carousel-mode");
  //                 window.scroll.stop();
  //                 window.scroll.destroy();
  //                 trigger.enable();
  //                 document
  //                   .querySelector(".project__list")
  //                   .classList.remove("fadeOut");
  //                 document.querySelector("#project__scroll").style = "";
  //               }, 650);
  //             }
  //           });

  //         createFilters();
  //         document
  //           .querySelectorAll(".project__list__item")
  //           .forEach(function (e, i) {
  //             e.style.transitionDelay = 0.375 + 0.075 * i + "s";
  //             e.querySelector(".list-open").style.transitionDelay =
  //               0.375 + 0.075 * i + "s";
  //           });

  //         followme();

  //         cards = gsap.utils.toArray(".cards li");
  //         seamlessLoop = "";
  //         gsap.timeline().clear();
  //         if (cards.length > 1) {
  //           let tot = document.querySelectorAll(".cards li").length;
  //           seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
  //           (wrapTime = gsap.utils.wrap(0, seamlessLoop.duration())),
  //             (trigger = ScrollTrigger.create({
  //               start: 0,
  //               onUpdate(self) {
  //                 incenterout();
  //                 let scroll = self.scroll();
  //                 if (scroll > self.end - 1) {
  //                   wrap(1, 1);
  //                 } else if (scroll < 1 && self.direction < 0) {
  //                   wrap(-1, self.end - 1);
  //                 } else {
  //                   scrub.vars.offset =
  //                     (iteration + self.progress) * seamlessLoop.duration();
  //                   scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
  //                 }
  //               },
  //               end: "+=6000",
  //               pin: ".projects__gallery",
  //             }));

  //           trigger.refresh();

  //           // below is the dragging functionality (mobile-friendly too)...
  //           Draggable.create(".drag-proxy", {
  //             type: "x",
  //             trigger: ".cards",
  //             onPress() {
  //               this.startOffset = scrub.vars.offset;
  //             },
  //             onDrag() {
  //               incenterout();
  //               var w = window.innerWidth > 1024 ? 0.0006 : 0.001;

  //               scrub.vars.offset = this.startOffset + (this.startX - this.x) * w;
  //               scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate
  //             },
  //             onDragEnd() {
  //               scrollToOffset(scrub.vars.offset);
  //             },
  //           });

  //           window.requestAnimationFrame(incenter);
  //         } else {
  //           cards[0].removeAttribute("style");
  //           cards[0]
  //             .querySelector(".thumbnail-scroll")
  //             .classList.add("in-center");
  //         } //end cards length
  //       } //end projects
  //     }

  //     function checkfrst() {
  //       if (!document.body.classList.contains("frst")) {
  //         setTimeout(function () {
  //           checkfrst();
  //         }, 100);
  //       } else {
  //         return true;
  //       }
  //     }

  //     var tim = 20;

  //     function followme() {
  //       document
  //         .querySelectorAll(".project__list__item")
  //         .forEach(function (e, i) {
  //           let ig = e.getAttribute("data-img");
  //           e.addEventListener("mouseenter", function () {
  //             document.querySelector(
  //               '.img-wrap[data-img="' + ig + '"] .list__img-container'
  //             ).style.visibility = "visible";
  //           });
  //           e.addEventListener("mouseleave", function () {
  //             document.querySelector(
  //               '.img-wrap[data-img="' + ig + '"] .list__img-container'
  //             ).style.visibility = "hidden";
  //           });
  //         });
  //     }

  //     function animateHide() {
  //       var h = window.innerHeight;
  //       var w = window.innerWidth;
  //       document.querySelectorAll(".hide").forEach(function (el, i) {
  //         if (isElementVisible(el)) {
  //           if (el.classList.contains("hide")) {
  //             el.classList.remove("hide");
  //             el.classList.add("show");
  //           }
  //         }
  //       });
  //     }

  //     function isElementVisible(el) {
  //       var rect = el.getBoundingClientRect(),
  //         vWidth = window.innerWidth || doc.documentElement.clientWidth,
  //         vHeight = window.innerHeight || doc.documentElement.clientHeight,
  //         topHe = rect.height > vHeight ? rect.height : vHeight;

  //       // Return false if it's not in the viewport
  //       if (
  //         rect.right < 0 ||
  //         rect.bottom < 0 ||
  //         rect.left > vWidth ||
  //         rect.top > vHeight - 100
  //       ) {
  //         return false;
  //       }
  //       // Return true if any of its four corners are visible
  //       return true;
  //     }

  //     function isElementVisible2(el) {
  //       var rect = el.getBoundingClientRect(),
  //         vWidth = window.innerWidth || doc.documentElement.clientWidth,
  //         vHeight = window.innerHeight || doc.documentElement.clientHeight,
  //         topHe = rect.height > vHeight ? rect.height : vHeight;

  //       // Return false if it's not in the viewport
  //       if (
  //         rect.right < 0 ||
  //         rect.bottom < 0 ||
  //         rect.left > vWidth ||
  //         rect.top > vHeight
  //       ) {
  //         return false;
  //       } else {
  //         // Return true if any of its four corners are visible
  //         if (rect.top < 50) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       }
  //     }

  //     const map = (x, a, b, c, d) => ((x - a) / (b - a)) * (d - c) + c;

  //     function parallaxt() {
  //       let trz = {
  //         tX: 0,
  //         tY: 0,
  //       };
  //       let trz2 = {
  //         tX: 0,
  //         tY: 0,
  //       };
  //       let trz3 = {
  //         tX: 0,
  //         tY: 0,
  //       };
  //       let evx = window.pax[0];
  //       let evy = window.pax[1];

  //       const render = function () {
  //         let cp = document.querySelector("#info__intro");
  //         if (cp) {
  //           if (isElementVisible(cp)) {
  //             let evx = window.pax[0];
  //             let evy = window.pax[1];
  //             let mx = Math.abs(evx) > 0 ? evx : 1;
  //             let my = Math.abs(evy) > 0 ? evy : 1;
  //             const bgX = map(mx, 0, window.innerWidth, -1, 10) * 20; // multiplicador longitud del movimiento
  //             const bgY = map(my, 0, window.innerHeight, -1, 10) * 20;

  //             const bgX2 = map(mx, 0, window.innerWidth, -6, 10) * 20; // multiplicador longitud del movimiento
  //             const bgY2 = map(my, 0, window.innerHeight, -6, 10) * 20;

  //             const bgX3 = map(mx, 0, window.innerWidth, -3, 10) * 20; // multiplicador longitud del movimiento
  //             const bgY3 = map(my, 0, window.innerHeight, -3, 10) * 20;
  //             document.querySelectorAll(".pax").forEach(function (e, i) {
  //               trz.tX = math.lerp(trz.tX, bgX, 1 / 50); // a mayor numero más rapido frena
  //               trz.tY = math.lerp(trz.tY, bgY, 1 / 50);
  //               e.style.transform =
  //                 "translate3d(" + trz.tX + "px, " + trz.tY + "px,0)";
  //             });
  //             document.querySelectorAll(".pax2").forEach(function (e, i) {
  //               trz2.tX = math.lerp(trz2.tX, bgX2, 1 / 40); // a mayor numero más rapido frena
  //               trz2.tY = math.lerp(trz2.tY, bgY2, 1 / 40);
  //               e.style.transform =
  //                 "translate3d(" + trz2.tX + "px, " + trz2.tY + "px,0)";
  //             });
  //             document.querySelectorAll(".pax3").forEach(function (e, i) {
  //               trz3.tX = math.lerp(trz3.tX, bgX3, 1 / 40); // a mayor numero más rapido frena
  //               trz3.tY = math.lerp(trz3.tY, bgY3, 1 / 40);
  //               e.style.transform =
  //                 "translate3d(" + trz3.tX + "px, " + trz3.tY + "px,0)";
  //             });
  //           }
  //           requestAnimationFrame(render);
  //         }
  //       };
  //       requestAnimationFrame(render);
  //     }

  //     var math = {
  //       lerp: function lerp(a, b, n) {
  //         return (1 - n) * a + n * b;
  //       },
  //       norm: function norm(value, min, max) {
  //         return (value - min) / (max - min);
  //       },
  //     };

  //     function getComputedTranslateX(obj) {
  //       if (!window.getComputedStyle) return;
  //       var style = getComputedStyle(obj),
  //         transform =
  //           style.transform || style.webkitTransform || style.mozTransform;
  //       var mat = transform.match(/^matrix3d\((.+)\)$/);
  //       if (mat) return parseFloat(mat[1].split(", ")[13]);
  //       mat = transform.match(/^matrix\((.+)\)$/);
  //       return mat ? parseFloat(mat[1].split(", ")[4]) : 0;
  //     }

  //     function markee(id, sp, direction) {
  //       var obj = document.getElementById(id);

  //       function render() {
  //         var objB = obj.getBoundingClientRect();
  //         var limit = -objB.width / 3;

  //         if (document.getElementById(id) != null) {
  //           var r = getComputedTranslateX(obj);
  //           var dir = ScrollDirection == "up" ? -1 : 1;
  //           var spe = sp * dir;
  //           var ss = Math.abs(ScrollSpeed);
  //           var spem = parseFloat(ss) * 10;
  //           var ve1 = parseFloat((sp + spem) * dir).toFixed(3);
  //           var vel = parseFloat(r - ve1 * 0.15).toFixed(3);

  //           if (ve1 > 0) {
  //             if (vel <= limit) {
  //               var el = (obj.style.transform = "translateX(0px)");
  //             } else {
  //               var el = (obj.style.transform = "translateX(" + vel + "px)");
  //             }
  //           } else {
  //             if (vel >= 0) {
  //               var el = (obj.style.transform = "translateX(" + limit + "px)");
  //             } else {
  //               if (vel <= limit) {
  //               } else {
  //                 var el = (obj.style.transform = "translateX(" + vel + "px)");
  //               }
  //             }
  //           }
  //           requestAnimationFrame(render);
  //         }
  //       }
  //       requestAnimationFrame(render);
  //     }
  //   }, []);

  useEffect(() => {
    let iteration = 0;
    let trigger;
    let playhead = { offset: 0 }; // Actual target offset
    let lerpedOffset = { value: 0 };
    gsap.set(".cards li", {
      xPercent: 210,
      scale: 0.25,
    });

    const cards = gsap.utils.toArray(".cards li");
    const spacing = 0.105;
    const snapTime = gsap.utils.snap(spacing);
    const sp = window.innerWidth > 1024 ? 210 : 180;
    const dr = window.innerWidth > 1024 ? 0.85 : 0.5;

    const animateFunc = (element) => {
      return gsap
        .timeline()
        .fromTo(
          element,
          { scale: 0.25 },
          {
            scale: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          }
        )
        .fromTo(
          element,
          { xPercent: 210 },
          {
            xPercent: -210,
            duration: 1,
            ease: "none",
            immediateRender: true,
          },
          0
        );
    };

    const buildSeamlessLoop = (items, spacing, animateFunc) => {
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 100);
        },
      });

      const cycleDuration = spacing * items.length;
      let dur;

      items.concat(items, items, items, items).forEach((item, i) => {
        const anim = animateFunc(items[i % items.length]);
        rawSequence.add(anim, i * spacing);
        if (!dur) dur = anim.duration();
      });

      seamlessLoop.fromTo(
        rawSequence,
        { time: cycleDuration + dur / 2 },
        {
          time: `+=${cycleDuration}`,
          duration: cycleDuration,
          ease: "none",
        }
      );

      return seamlessLoop;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate: () => {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: dr,
      ease: "power4.out",
      paused: true,
    });
    var math = {
      lerp: function lerp(a, b, n) {
        return (1 - n) * a + n * b;
      },
      norm: function norm(value, min, max) {
        return (value - min) / (max - min);
      },
    };

    // Define progressToScroll correctly
    const progressToScroll = (progress) => {
      // Example of how you might calculate scroll progress:
      return gsap.utils.clamp(
        1,
        seamlessLoop.duration() - 1,
        gsap.utils.wrap(0, seamlessLoop.duration(), progress) *
          seamlessLoop.duration()
      );
    };

    function smoothLerpRender() {
      lerpedOffset.value = math.lerp(lerpedOffset.value, playhead.offset, 0.05);
      seamlessLoop.time(wrapTime(lerpedOffset.value));
      // Determine which card is centered
      let centerIndex = Math.round(lerpedOffset.value / spacing) % cards.length;
      // Normalize negative index
      if (centerIndex < 0) centerIndex += cards.length;
      cards.forEach((card, index) => {
        if (index === centerIndex) {
          card.classList.add("in-center");
        } else {
          card.classList.remove("in-center");
        }
      });
      requestAnimationFrame(smoothLerpRender);
    }
    requestAnimationFrame(smoothLerpRender);

    // 👇 Fix: Better drag handling
    Draggable.create(".drag-proxy", {
      type: "x",
      trigger: ".cards",
      onPress() {
        this.startOffset = playhead.offset;
        this.startX = this.x;
      },
      onDrag() {
        const sensitivity = window.innerWidth > 1024 ? 0.0015 : 0.003;
        const deltaX = this.x - this.startX;
        const offsetChange = -deltaX * sensitivity;

        playhead.offset = this.startOffset + offsetChange;
      },
      onRelease() {
        const finalOffset = playhead.offset;
        // Delay snap until after some time (e.g., 300ms)
        setTimeout(() => {
          playhead.offset = snapTime(finalOffset);
        }, 300);
      },
    });
  }, []);

  return (
    <>
      <div className="project__carousel">
        <input type="hidden" id="nTitle" />
        <section className="projects__gallery bw">
          <ul className="cards__container cards">
            {projects.map((project) => (
              <li key={project.id} className="element">
                <div className="thumbnail-scroll">
                  <a
                    className="ajax-link"
                    href={project.href}
                    data-href={project.href}
                    data-type="project__post"
                    data-from="projects"
                  >
                    <div className="inner__name">
                      <span className="pr-name">
                        <span className="pr-name-big">{project.name}</span>
                      </span>
                    </div>
                    <div className="card__img is-portrait">
                      <div className="overlayer tt-ab" />
                      <img src={project.img} alt={`${project.name}-Index`} />
                    </div>
                  </a>
                  <div className="outer__name">
                    <span className="pr-name cb">
                      <span className="pr-name-big">{project.name}</span>
                    </span>
                  </div>
                </div>
                <div className="props">
                  <input
                    type="hidden"
                    name="school"
                    defaultValue={project.school}
                    data-val={project.school}
                  />
                  {project.tags.map((tag, idx) => (
                    <input
                      key={idx}
                      type="hidden"
                      name="tag"
                      defaultValue={tag}
                      data-val={tag}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <div
          className="drag-proxy"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            cursor: "grab",
          }}
        />
      </div>
    </>
  );
};

export default TransmissionSlider;
