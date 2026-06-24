(function($) {
    "use strict";

    var nav_offset_top = $("header").height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

    //* Navbar Fixed
    function navbarFixed() {
        if ($(".header_area").length) {
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        }
    }
    navbarFixed();

    // Search Toggle
    $("#search_input_box").hide();
    $("#search").on("click", function() {
        $("#search_input_box").slideToggle("slow");
        $("#search_input").focus();
    });
    $("#close_search").on("click", function() {
        $("#search_input_box").slideUp("slow");
    });

    /*----------------------------------------------------*/
    /*  Course Slider
      /*----------------------------------------------------*/
    function active_course() {
        if ($(".active_course").length) {
            $(".active_course").owlCarousel({
                loop: true,
                margin: 20,
                items: 3,
                nav: true,
                autoplay: 2500,
                smartSpeed: 1500,
                dots: false,
                responsiveClass: true,
                thumbs: true,
                thumbsPrerendered: true,
                navText: ["<img src='img/prev.png'>", "<img src='img/next.png'>"],
                responsive: {
                    0: {
                        items: 1,
                        margin: 0
                    },
                    991: {
                        items: 2,
                        margin: 30
                    },
                    1200: {
                        items: 3,
                        margin: 30
                    }
                }
            });
        }
    }
    active_course();

    /*----------------------------------------------------*/
    /*  Event Slider
      /*----------------------------------------------------*/
    function active_event() {
        if ($(".active_event").length) {
            $(".active_event").owlCarousel({
                loop: true,
                margin: 30,
                items: 2,
                nav: false,
                autoplay: 2500,
                smartSpeed: 1500,
                dots: false,
                responsiveClass: true,
                thumbs: true,
                thumbsPrerendered: true
            });
        }
    }
    active_event();

    /*----------------------------------------------------*/
    /*  Testimonials Slider
      /*----------------------------------------------------*/
    function testimonials_slider() {
        if ($(".testi_slider").length) {
            $(".testi_slider").owlCarousel({
                loop: true,
                margin: 30,
                items: 2,
                autoplay: 2500,
                smartSpeed: 2500,
                dots: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    991: {
                        items: 2
                    }
                }
            });
        }
    }
    testimonials_slider();

    /*----------------------------------------------------*/
    /*  MailChimp Slider
      /*----------------------------------------------------*/
    function mailChimp() {
        $("#mc_embed_signup")
            .find("form")
            .ajaxChimp();
    }
    mailChimp();

    $("select").niceSelect();

    /*----------------------------------------------------*/
    /*  Scroll Reveal Animations (Intersection Observer)
      /*----------------------------------------------------*/
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
        
        if (revealElements.length === 0) return;
        
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }
    initScrollReveal();

    /*----------------------------------------------------*/
    /*  Counter Animation
      /*----------------------------------------------------*/
    function animateCounters() {
        $('.counter-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.text().replace(/,/g, ''));
            if (isNaN(target)) return;
            
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        $({ count: 0 }).animate({ count: target }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.count).toLocaleString());
                            },
                            complete: function() {
                                $this.text(target.toLocaleString());
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe($this[0]);
        });
    }
    animateCounters();

    /*----------------------------------------------------*/
    /*  Smooth Scroll for Anchor Links
      /*----------------------------------------------------*/
    $('a[href*="#"]:not([href="#"]):not([data-toggle])').on('click', function(e) {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });

    /*----------------------------------------------------*/
    /*  Navbar Active State Based on Scroll
      /*----------------------------------------------------*/
    function updateActiveNav() {
        var scrollPos = $(window).scrollTop();
        $('.nav-link[href^="#"]').each(function() {
            var target = $($(this).attr('href'));
            if (target.length) {
                var offset = target.offset().top - 100;
                if (scrollPos >= offset && scrollPos < offset + target.outerHeight()) {
                    $(this).closest('.nav-item').addClass('active').siblings().removeClass('active');
                }
            }
        });
    }
    $(window).on('scroll', updateActiveNav);

    /*----------------------------------------------------*/
    /*  Back to Top Button
      /*----------------------------------------------------*/
    var $backToTop = $('<a/>', {
        href: '#',
        class: 'scrollToTop',
        html: '<i class="ti-angle-up"></i>',
        style: 'display: none; position: fixed; bottom: 30px; right: 30px; background: rgb(0, 128, 111); color: #fff; width: 50px; height: 50px; line-height: 50px; text-align: center; border-radius: 50%; z-index: 999; font-size: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);'
    });
    $('body').append($backToTop);
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });
    
    $backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /*----------------------------------------------------*/
    /*  Parallax Effect on Mouse Move
      /*----------------------------------------------------*/
    $('.parallax-move').on('mousemove', function(e) {
        var x = (e.clientX / $(window).width() - 0.5) * 10;
        var y = (e.clientY / $(window).height() - 0.5) * 10;
        $(this).find('.parallax-layer').css('transform', 'translate(' + x + 'px, ' + y + 'px)');
    });

    /*----------------------------------------------------*/
    /*  Google map js
      /*----------------------------------------------------*/

    if ($("#mapBox").length) {
        var $lat = $("#mapBox").data("lat");
        var $lon = $("#mapBox").data("lon");
        var $zoom = $("#mapBox").data("zoom");
        var $marker = $("#mapBox").data("marker");
        var $info = $("#mapBox").data("info");
        var $markerLat = $("#mapBox").data("mlat");
        var $markerLon = $("#mapBox").data("mlon");
        var map = new GMaps({
            el: "#mapBox",
            lat: $lat,
            lng: $lon,
            scrollwheel: false,
            scaleControl: true,
            streetViewControl: false,
            panControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            zoom: $zoom,
            styles: [{
                    featureType: "water",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#dcdfe6"
                    }]
                },
                {
                    featureType: "transit",
                    stylers: [{
                            color: "#808080"
                        },
                        {
                            visibility: "off"
                        }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{
                            visibility: "on"
                        },
                        {
                            color: "#dcdfe6"
                        }
                    ]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffffff"
                    }]
                },
                {
                    featureType: "road.local",
                    elementType: "geometry.fill",
                    stylers: [{
                            visibility: "on"
                        },
                        {
                            color: "#ffffff"
                        },
                        {
                            weight: 1.8
                        }
                    ]
                },
                {
                    featureType: "road.local",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d7d7d7"
                    }]
                },
                {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                            visibility: "on"
                        },
                        {
                            color: "#ebebeb"
                        }
                    ]
                },
                {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [{
                        color: "#a7a7a7"
                    }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffffff"
                    }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#ffffff"
                    }]
                },
                {
                    featureType: "landscape",
                    elementType: "geometry.fill",
                    stylers: [{
                            visibility: "on"
                        },
                        {
                            color: "#efefef"
                        }
                    ]
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{
                        color: "#696969"
                    }]
                },
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{
                            visibility: "on"
                        },
                        {
                            color: "#737373"
                        }
                    ]
                },
                {
                    featureType: "poi",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                },
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry.stroke",
                    stylers: [{
                        color: "#d6d6d6"
                    }]
                },
                {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [{
                        visibility: "off"
                    }]
                },
                {},
                {
                    featureType: "poi",
                    elementType: "geometry.fill",
                    stylers: [{
                        color: "#dadada"
                    }]
                }
            ]
        });
    }
})(jQuery);