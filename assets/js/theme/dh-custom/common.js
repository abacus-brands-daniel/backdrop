import superfish from 'superfish/dist/js/superfish.min';
import select2 from "select2/dist/js/select2";
import AOS from "aos/dist/aos";

export const makeSelect2Dropdowns = (selector = false) => {

    // Make the select2 dropdowns for dropdowns other than the sort by dropdowns
    $(selector ? selector : '.form-select:not(".category-sort-select")').each(function (e) {
        const $that = $(this);
        const isCountryOrState = $that.attr('data-field-type') === "Country" || $that.attr('data-field-type') === "State";
        $(this).select2({
            selectOnClose: false,
            dropdownParent: $that.closest('[data-product-attribute="set-select"]').length > 0
                ? $that.closest('[data-product-attribute="set-select"]')
                : ($that.closest('.form-field').length > 0 ? $that.closest('.form-field') : $that.closest('.estimator-form-input')),
            minimumResultsForSearch: isCountryOrState ? 5 : -1
        });
        let timeout = 0;
        $($that).on('select2:open', () => {
            if (isCountryOrState) {
                const searchElInput = $that.siblings('.select2-container:not(.select2)').find('.select2-search.select2-search--dropdown .select2-search__field');
                $that.siblings('.select2-container:not(.select2)').find('.select2-search.select2-search--dropdown').addClass('show-dropdown');
                if ($that.attr('data-field-type') === "Country") {
                    searchElInput.attr('placeholder', 'Search for a country');
                } else if ($that.attr('data-field-type') === "State") {
                    searchElInput.attr('placeholder', 'Search for a state');
                }
                timeout && clearTimeout(timeout);
                searchElInput.length > 0 && (timeout = setTimeout(() => searchElInput[0].focus(), 100));
            }
        })
    });

    // Make the select2 dropdowns for the sort by dropdowns with callback for the same
    !selector && $('.form-select.category-sort-select').each(function (e) {
        const $that = $(this);
        $(this).select2({
            selectOnClose: false,
            dropdownParent: $that.closest('[data-product-attribute="set-select"]').length > 0 ? $that.closest('[data-product-attribute="set-select"]') : $that.closest('.form-field'),
            minimumResultsForSearch: -1
        });
        // Call the below function only if without this function your sort by dropdown does not change the products
        // $that.on('select2:select', (event) => FacetedSearch.customSortByTrigger(event, event.target));
    });
}

export default function (context) {
    $(document).ready(function () {
        //Initiate Select2 Dropdown
        makeSelect2Dropdowns();
        checkWidth();
        mobilesort();
        /*======= Tree view =======*/
        $(window).width() > 1024 && $('ul.navPages-list.sf-menu').superfish({
            speedOut: 'fast',
            delay: 100
        });
        //Superfish menu

        //AOS init
        setTimeout(() => {
            AOS.init({
                once: true,
                duration: 500
            });
        },600)
        

        // Back to menu
        $('.back-menu').on('click', function(){
            $(this).parents('.navPage-subMenu').siblings('a[data-collapsible]').trigger('click');
        })

        // Redirect main category in desktop
        $('.navPages-action').each(function(){
            $(this).on('click',function(){
              if($(window).width() > 1024){
                var navPagesLink = $(this).attr('href');
                 var getTarget = $(this).attr('target');
                
                if(getTarget == '_blank'){
                  window.open(navPagesLink,'_blank');
                }else{
                    window.location.href = navPagesLink;
                }
                //window.location.href = navPagesLink;
              }
            })  
          })

        //Home accordian script
        $(".accordian-sub-box:not(:first-of-type) .content").css("display", "none");

        $(".accordian .accordian-sub-box:first-child .title-content").addClass("open");

        $(".title-content").click(function () {
            $(".open").not(this).removeClass("open").next().slideUp(300);
            $(this).toggleClass("open").next().slideToggle(300);
        });

        // Custom Accordion
        // (Optional) Active an item if it has the class "is-active"	
        $(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();

        $(".accordion > .accordion-item .accordion-thumb").click(function () {
            // Cancel the siblings
            //$(this).parents('.accordion').find('.accordion-thumb').not(this).parent(".accordion-item").children(".accordion-panel").slideUp().removeClass("is-active");
            // Toggle the item
            $(this).siblings(".accordion-panel").slideToggle("ease-out");
            $(this).parent().toggleClass("is-active");
        });
        // Sticky Header
        headerSticky();
        // About page: Viewport trigger script
        var $animationElements = $('.about-animation');
        var $window = $(window);
        if($animationElements.length && $window.width() > 1024){
            $animationElements.each(function(){
                $(this).attr("data-aos-offset","300");
            })
        }
        function checkIfInView() {
            var elementOffset = $(window).width() < 1025 ? 0 : 300;
            var windowHeight = $window.height();
            var windowTopPosition = $window.scrollTop();
            var windowBottomPosition = (windowTopPosition + windowHeight) - elementOffset;

            $.each($animationElements, function () {
                var $element = $(this);
                var elementHeight = $element.outerHeight();
                var elementTopPosition = $element.offset().top;
                var elementBottomPosition = (elementTopPosition + elementHeight);

    //check to see if this current container is within viewport
                if ((elementBottomPosition >= windowTopPosition) &&
                    (elementTopPosition <= windowBottomPosition)) {
                        if($(this).hasClass('in-view') == 0){
                            setTimeout(() => {
                            var speed = 75;
                            var animatedText = $element.find('.text-animation');
                            typeEffect(animatedText, speed);
                            },1100)
                        }
                    $element.addClass('in-view');
                    $element.parents('.about-row--inner').addClass('in-view');
                } 
            });
        }

        $window.on('scroll resize', checkIfInView);
        $window.trigger('scroll');
        $('.clickToScroll').on('click', function(e){
            e.preventDefault();
            
            setTimeout(() => {
                var getAttr = $(this).attr('href');
                var getScrollOffset = $(getAttr).offset().top;
                $('html, body').animate({
                    scrollTop: getScrollOffset - $('.header').outerHeight(),
                }, 100);
            },300)
        });
    });
    //Text type animation
    function typeEffect(element, speed) {
        var eWidth = element.width();
        element.css({"min-width":eWidth});
        var text = element.text();
        element.text("");
        element.css({"opacity":"1"});
        var i = 0;
        var timer = setInterval(function () {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Design tutorial change functions
    $(".design-columns button").on('click', (evt) => {
        let currentElement = $(evt.target);
        if (currentElement.hasClass('focused')) {
            return;
        } else {
            $(".design-columns button").removeClass('focused');
            $(".design-videos .design-video-wrapper").removeClass('focused');

            $(".design-videos .design-video-wrapper .design-video").each(function(index, element) {
                element.pause()
            })

            currentElement.addClass('focused');
            $(`div.design-video-wrapper[data-type="${currentElement.data('type')}"]`).addClass('focused')
        };
    });

    $(".design-video-wrapper").each(function(index, element) {
        let overlay = $(element).find('.design-overlay');
        let playBtn = $(element).find('.design-play-btn');
        let video = $(element).find('.design-video');

        video.on("play", (event) => {
            overlay.hide();
            playBtn.hide();
        });

    });





    function headerSticky() {
        const headerEl = $(".header");
        const stickyH = headerEl.outerHeight();
        const HeaderTag = $(".header");
        const menuEl = $("#menu");

        let lastPos;
        let filterStickyOffect

        let shouldRemove = () => {
            return headerEl.hasClass("header--sticky--remove");
        }

        let isMobile = () => {
            return $(window).width() < 1025 ? true : false;
        }

        $(window).on("scroll", () => {
            let pos = window.pageYOffset;
            let shipping_banner = $(`[data-content-region="header_bottom--global"]`)?.length ? $(`[data-content-region="header_bottom--global"]`).outerHeight() : 0;
            let headerHeight = $(".header").outerHeight() + shipping_banner;
            let h = parseInt(headerEl.outerHeight());

            if (lastPos > pos) {
                //up

                if (pos < headerHeight - 36) {

                    if (!$("body").hasClass("has-activeNavPages")) {
                        headerEl.removeClass("header--sticky");
                        $("body").removeClass("head-sticky-added").css("padding-top", "0px");
                    }

                }

            } else {

                if (pos > headerHeight + 30 && !headerEl.hasClass("header--sticky")) {
                    $("body").addClass("head-sticky-added").css("padding-top", h + "px");
                    headerEl.addClass("header--sticky");
                    if (shouldRemove()) {
                        !isMobile() && headerEl.removeClass("header--sticky");
                    }

                }
            }
            lastPos = pos > 0 ? pos : 0;
        });
    }

    // Wave Function
    window.addEventListener("scroll", function () {
        waveOnScroll('.wave', 'animating', $(window).scrollTop());
    });
  
    function waveOnScroll(elem, classToAdd, distanceFromTop) {

        $(elem).each(function (_,el) {
            var winH = window.innerHeight,
                ElemH = $(this).outerHeight(),
                distTop = $(this).offset().top,
                rect = el.getBoundingClientRect().y,
                distBottom = distTop + ElemH,
                distPixels = Math.round(distTop);
            if (distPixels <= distanceFromTop + (winH - ElemH) && distPixels >= distanceFromTop) {
                if (!$(this).hasClass(classToAdd)) {
                    $(this).addClass(classToAdd);

                }
                if(distPixels < winH){
                    $(this).css("background-position-x", distanceFromTop);
                }else{
                    $(this).css("background-position-x", (distanceFromTop + (winH - ElemH)) - distTop);
                }
                //console.log(distTop - distanceFromTop);
            } else if (distBottom => distanceFromTop) {
                $(this).removeClass(classToAdd);
                //$(this).css("background-position-x",0);

            } else {
                $(this).removeClass(classToAdd);
                //$(this).css("background-position-x",0);
            }
        })
    }
    /* ============ FOOTER SCRIPT ============ */
    $(window).width() <= 1025 && $(".footer .footer-info-heading.active").next(".footer-info-list").slideDown();
    $('.footer .footer-info-heading').click(function () {
        if ($(window).width() <= 1025) {
            //$('.footer .footer-info-heading').removeClass('active').next('.footer-info-list').slideUp();
            if ($(this).next('.footer-info-list').is(':hidden')) {
                $(this).addClass('active');
                $(this).next('.footer-info-list').slideDown();
            } else {
                $(this).removeClass('active');
                $(this).next('.footer-info-list').slideUp();
            }
        }
    });
    $(".product-list-mobile-top-bar .filter-by").on("click", function () {
        $("#faceted-search-container").toggle();
        $('.filter-by').toggleClass('active');
    })
    $(window).resize(() => {
        checkWidth();
        mobilesort();
        //drawermenu();
      if ($(window).width() < 1024) {
        $('body').addClass('lt-1023');
        $('body').removeClass('gt-1023');
        $('.footer .footer-info-heading').not('.active').siblings('.footer-info-list').hide();

        //Destroy Superfish menu
        $('ul.navPages-list.sf-menu').superfish('destroy');

      } else if ($(window).width() > 1024 && !$('body').hasClass('gt-1023')) {
        $('body').addClass('gt-1023');
        $('body').removeClass('lt-1023');
        $('.footer .footer-toggle-title').removeClass('active');
        $('.footer .footer-info-list').show();

        if($('.productView-description').length){
          $('.accordion-content').removeAttr('style');
        }
        // Re-Initialize superfish menu
        setTimeout(() => {
          $('.navPages-list.sf-menu').superfish();
        });
      }
      $(window).width() < 1025 && $(".footer .footer-info-heading.active").next(".footer-info-list").slideDown();
    });
    function checkWidth() {
        setTimeout(() => {
            if ($(window).width() <= 1023) {
                $(".shopByCategory .shopByCategory-list").not(".shopByCategory .shopByCategory-list.slick-initialized").not(".shopByCategory .shopByCategory-list.slick-dots").slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    infinite: true,
                    pauseOnHover:false,
                    pauseOnFocus:false,
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
                $('.slick-slider').on( 'touchend touchcancel touchmove', function() { $(this).slick('slickPlay'); } );
            } else {
                $('.shopByCategory .shopByCategory-list.slick-initialized').slick("unslick");
            }
            if ($(window).width() <= 1023) {
                $(".home-blog-list-wrap .blog-grid-style").not(".home-blog-list-wrap .blog-grid-style.slick-initialized").not(".home-blog-list-wrap .blog-grid-style.slick-dots").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    infinite: true,
                    pauseOnHover:false,
                    pauseOnFocus:false,
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                pauseOnHover:false,
                                pauseOnFocus:false
                            }
                        }
                    ]
                });
            } else {
                $('.home-blog-list-wrap .blog-grid-style.slick-initialized').slick("unslick");
            }
            // if ($(window).width() <= 1023) {
            //     $(".category-block").insertBefore("#facetedSearch-navList .accordion--navList"); 
            // } else {
            //     $(".category-block").insertBefore("#facetedSearch"); 

            // }



        }, 500);
    }
}
export function mobilesort() {
    if ($(".mobile-sort-box").length) {
        if ($(window).width() < 1025) {
            if ($('.filter').find('.actionBar').length) {
                let sortBox = $('.filter').find('.actionBar').detach();
                $(".mobile-sort-box").html(sortBox);
                $('#faceted-search-container').hide();
                //document.getElementById('faceted-search-container').style.display = "none";
            }
        }
        else {
            if ($(".mobile-sort-box").find('.actionBar').length) {
                let sortBox = $(".mobile-sort-box").find('.actionBar').detach();
                $(".filter").append(sortBox);
                $('.page-sidebar').removeAttr('style');
            }
        }
    }
    if($('.page-sidebar').length == 0){
        $('.mobile-filter-box').hide();
    }
  }
