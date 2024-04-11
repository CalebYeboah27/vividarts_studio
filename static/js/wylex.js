/*
  [JS Index]
  
  ---
  
  Template Name: Wylex - Photography Portfolio Template
  Author:  ex-nihilo
  Version: 1.0
*/


/*
  1. preloader
  2. fadeIn.element
  3. slick slider
    3.1. slick about / services slider
    3.2. slick fullscreen slideshow
  4. owl carousel
    4.1. owl works carousel
    4.2. owl news carousel
	4.3. owl home IMG carousel slider
  5. magnificPopup
  6. navigation
    6.1. close navigation
    6.2. navigation active state
  7. fullPage
  8. YouTube player
  9. toggle news content
  10. forms
    10.1. contact form
  11. contact modal
    11.1. contact modal additional CLOSER
  12. skills bar
  13. facts counter
  14. swiper slider
    14.1. swiper timeline slider
  15. clone function
    15.1. vertical lines
  16. section position reset
    16.1. news position reset
	16.2. contact position reset
*/


$(function() {
    "use strict";
	
	
    $(window).on("load", function() {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);
		
        // 2. fadeIn.element
        setTimeout(function() {
            $(".fadeIn-element").delay(600).css({
                display: "none"
            }).fadeIn(800);
        }, 0);
    });
	
    // 3. slick slider
    // 3.1. slick about / services slider
    $(".slick-about, .slick-services").slick({
        arrows: true,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: false,
        autoplay: false,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 500
    });
    // 3.2. slick fullscreen slideshow
    $(".slick-fullscreen-slideshow").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 1600,
        draggable: true,
        dots: false,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	
    // 4. owl carousel
    // 4.1. owl works carousel
    $("#works-page-img-carousel").owlCarousel({
        loop: false,
        center: false,
        items: 3,
        margin: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
    // 4.2. owl news carousel
    $("#news-page-img-carousel").owlCarousel({
        loop: true,
        center: false,
        items: 2,
        margin: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 2
            }
        }
    });
	// 4.3. owl home IMG carousel slider
    $("#home-page-img-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });
	
    // 5. magnificPopup
    $(".popup-photo").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
            tPrev: "",
            tNext: "",
            tCounter: "%curr% / %total%"
        },
        removalDelay: 300,
        mainClass: "mfp-fade"
    });
	
    // 6. navigation
    // 6.1. close navigation
    $(".menu-state").on("click", function() {
        $("#menu-mobile").removeClass("activated");
        $("#menu-mobile-caller").removeClass("lines-close");
    });
    // 6.2. navigation active state
    $("a.menu-state").on("click", function() {
        $("a.menu-state").removeClass("active");
        $(this).addClass("active");
    });
	
    // 7. fullPage
    $("#fullpage").fullpage({
        anchors: ["home", "about", "services", "works", "news", "contact"],
        navigation: true,
        navigationPosition: "right",
        navigationTooltips: ["Home", "About", "Services", "Works", "News", "Contact"],
        responsiveWidth: 900,
        autoScrolling: true,
        scrollBar: false,
        afterResponsive: function(isResponsive) {}
    });
	
    // 8. YouTube player
    $("#bgndVideo").YTPlayer();
	
    // 9. toggle news content
    $(".c-btn-news").on("click", function() {
        var divClass = $(this).attr("data-id");
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $("." + divClass).addClass("open");
        } else {
            $(this).addClass("open");
            $("." + divClass).addClass("open");
        }
    });
    $(".inverse-dark").on("click", function() {
        $(".panel-left, .panel-right").removeClass("open");
    });
	
    // 10. forms
    // 10.1. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
    // 11. contact modal
    $(".contact-modal-launcher, .contact-modal-closer").on("click", function() {
        if ($(".contact-modal").hasClass("open")) {
            $(".contact-modal").removeClass("open").addClass("close");
        } else {
            $(".contact-modal").removeClass("close").addClass("open");
        }
    });
    // 11.1. contact modal additional CLOSER
    $(".navigation-icon, .logo").on("click", function() {
        $(".contact-modal").removeClass("open").addClass("close");
    });
	
	// 12. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
    // 13. facts counter
    $(".facts-counter-number").appear(function() {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });
	
	// 14. swiper slider
    // 14.1. swiper timeline slider
    var timelineSwiper = new Swiper(".timeline .swiper-container", {
        direction: "vertical",
        autoplay: false,
        speed: 1600,
        spaceBetween: 0,
        loop: false,
        mousewheelControl: false,
        keyboardControl: true,
        pagination: ".swiper-pagination",
        paginationBulletRender: function(swiper, index, className) {
            var year = document.querySelectorAll(".swiper-slide")[index].getAttribute("data-year");
            return '<span class="' + className + '">' + year + '</span>';
        },
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        paginationClickable: true,
        breakpoints: {
            768: {
                direction: "horizontal",
            }
        }
    });
	
	// 15. clone function
    $.fn.duplicate = function(count, cloneEvents, callback) {
        var stack = [],
            el;
        while (count--) {
            el = this.clone(cloneEvents);
            callback && callback.call(el);
            stack.push(el.get()[0]);
        }
        return this.pushStack(stack);
    };
    // 15.1. vertical lines
    $("<div class='vertical-lines-wrapper'></div>").appendTo(".vertical-lines");
    $("<div class='vertical-effect'></div>").duplicate(4).appendTo(".vertical-lines-wrapper");
	
	
});


// 16. section position reset
// 16.1. news position reset
$(".c-btn-news").on("click", function() {
    target = $(".news-page-img-wrapper");
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 500);
});

// 16.2. contact position reset
$(".contact-modal-launcher").on("click", function() {
    target = $(".contact-reset");
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 500);
});