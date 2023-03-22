 /**
  * jquery.custom.js
  * 
  * Custom scripts for Camden WordPress Theme by WebsiteSmash.
  * 
  * Copyright 2017 WebsiteSmash
  * http://www.websitesmash.com
  * http://themeforest.net/user/websitesmash/portfolio
  *
  **/

 jQuery(document).ready(function($) {

     "use strict";


     /* --------------------------------------------------
     	Social Drop down
     -------------------------------------------------- */

     $('.shareButtons').on('touchstart', function(e) {

         $('body').toggleClass('share-buttons-open');

     });

     $('.cart-button').on('touchstart', function(e) {

         $('body').toggleClass('cart-dropdown-open');

     });

     $('body').on('touchstart', function(e) {


         if ($('.share-buttons-open').length) {
             $('body').removeClass('share-buttons-open');
         }

         if ($('.cart-dropdown-open').length) {
             $('body').removeClass('cart-dropdown-open');
         }

     });


     /* --------------------------------------------------
     	FadeIn Images
     -------------------------------------------------- */

     $('.featuredContent, .postList, .productList').imagesLoaded()
         .progress(function(instance, image) {
             $(image.img).addClass('loaded');
         });

     $('.content-bg-image, .content-background').imagesLoaded({
         background: true
     }, function() {
         $('.content-bg-image, .content-background').addClass('loaded');
     });


     /* --------------------------------------------------
     	Search Overlay
     -------------------------------------------------- */

     $('.js-search-toggle').click(function() {

         $('body').toggleClass('search-open');

     });


     /* --------------------------------------------------
     	Navigation Toggle
     -------------------------------------------------- */

     $('.js-menu-toggle').click(function() {

         var menu = $('.wp-custom-menu-main');

         if (menu.is(":visible") == true) {
             $('.wp-custom-menu-main').slideUp();
         } else {
             $('.wp-custom-menu-main').slideDown();
         }

     });


     /* --------------------------------------------------
     	Footer Scroll Button
     -------------------------------------------------- */

     $('.siteFooter-scroll .camden-icon-arrow-up').click(function() {

         $('html, body').animate({
             scrollTop: 0
         }, 1000);

     });


     /* --------------------------------------------------
     	Archive Header Scroll Button
     -------------------------------------------------- */

     $('.scrollButton .camden-icon-arrow-down').click(function() {

         var offsetY = $('.siteContent').offset();
         $('html, body').animate({
             scrollTop: offsetY.top
         }, 1000);

     });


     /* --------------------------------------------------
     	Header Content Fading
     -------------------------------------------------- */

     $(window).scroll(function() {

         $('.archiveHeader > .postContent').each(function(indexChild, item) {
             var st = $(window).scrollTop() - $(item).offset().top + 200;
             var opacity = (1 - st / 200);

             if (opacity > 1) {
                 opacity = '';
             } else if (opacity < 0) {
                 opacity = 0;
             }

             $(item).css({
                 'opacity': opacity
             });

         });

     });


     /* --------------------------------------------------
     	NavBar Hide / Show
     -------------------------------------------------- */

     var navBar = $('.navbar--fixed');
     var menuHeight = 0;

     if ($('.js-menu-toggle').is(':visible')) {
         menuHeight = $('.wp-custom-menu-main').height();
     }

     var navHeight = $(navBar).height();

     $('.siteHeader').css({
         'min-height': navHeight - menuHeight
     });

     $(window).resize(function() {

         navHeight = $(navBar).height();
         $('.siteHeader').css({
             'min-height': navHeight - menuHeight
         });

     });


     var lastY = $(window).scrollTop();

     $(window).scroll(function() {

         var navTop = parseInt($(navBar).css('top'));
         var currentY = $(window).scrollTop();

         if (currentY < lastY) {

             $(navBar).removeClass('navbar--hidden');

         } else {

             if (!$(navBar).hasClass('navbar--hidden') && currentY >= navHeight) {
                 $(navBar).addClass('navbar--hidden');
             }
         }

         lastY = currentY;

     });


     /* --------------------------------------------------
     	Masonry
     -------------------------------------------------- */

     if (jQuery.isFunction(jQuery.fn.masonry)) {
         $('.gallery').not('.gallery-columns-1').masonry({
             itemSelector: '.gallery-item'
         });
     }


     /* --------------------------------------------------
     	Select2 (if woocommerce is active)
     -------------------------------------------------- */

     if (jQuery.isFunction(jQuery.fn.select2)) {
         $('select').not("#rating").select2();
     }


     /* --------------------------------------------------
     	Owl Slider
     -------------------------------------------------- */

     if (jQuery.isFunction(jQuery.fn.owlCarousel)) {
         $('.js-postPagination-owl-carousel').owlCarousel({
             animateOut: 'fadeOut',
             loop: false,
             startPosition: 0,
             margin: 0,
             nav: true,
             items: 1,
             navText: ['<span class="owl-nav-text"><span class="camden-icon-arrow-left"></span></span>', '<span class="owl-nav-text"><span class="camden-icon-arrow-right"></span></span>']
         });
     }

     CamdenResizeOwlSlider();


     /* --------------------------------------------------
     	Resize Functions
     -------------------------------------------------- */

     $(window).resize(function() {

         CamdenResizeOwlSlider();

         if (!$('.js-menu-toggle').is(':visible')) {
             $('.wp-custom-menu-main').css('display', '');
         }

     });


     /* --------------------------------------------------
     	AJAX - Archive Post Loading
     -------------------------------------------------- */

     if (
         $('.js-ajax-pagination .archivePagination .next').length ||
         $('.js-ajax-pagination .woocommerce-pagination .next').length
     ) {

         var lastLink, nextLink, paginationHolder, max, pageNum;

         if ($('.archivePagination').length) {
             paginationHolder = $('.archivePagination').first();
         } else if ($('.woocommerce-pagination').length) {
             paginationHolder = $('.woocommerce-pagination').first();
         }

         pageNum = parseInt($(paginationHolder).find('.current').text(), 10) + 1;
         nextLink = $(paginationHolder).find('.next').attr('href').replace(/\/$/, "");
         lastLink = $(paginationHolder).find('.next').prev('a').attr('href').replace(/\/$/, "");

         // Get page number from pagination link
         lastLink = lastLink.match(/\d+/);
         lastLink = lastLink[0];

         max = lastLink.match(/[0-9]+/);
         max = max[0];

         if (pageNum <= max) {

             $(paginationHolder).after('<div class="archivePagination"><a class="js-ajax-load-button" href="#">' + camden_load_posts.load_more_button_text + '</a></div>');

             // Remove pagination links and add "load more" button
             $(paginationHolder).remove();

             // When load more button is clicked
             $('.js-ajax-load-button').click(function() {

                 // If there are pages to load
                 if (pageNum <= max) {

                     // Change "load more" button text
                     $(this).html('');
                     $(this).attr('data-loader', 'circle-side');

                     // Load new content to variable
                     var newContent = $('<div>');

                     // Load items from next page.
                     $(newContent).load(nextLink + ' .js-ajax-item', function() {

                         pageNum++;
                         nextLink = nextLink.replace(/\d+/, pageNum);

                         $(newContent).find('.js-ajax-item').addClass('js-Preview--hidden');

                         if ($('.js-ajax-holder').length) {

                             // Append and fade in new items
                             $('.js-ajax-holder').append($(newContent).find('.js-ajax-item'));
                             setTimeout(fadeInFirstAJAXItem, 100);

                         }

                         // Remove the loading animation
                         $('.js-ajax-load-button').attr('data-loader', '');

                         // Update woocommerce results count
                         if ($('.woocommerce-result-count').length) {

                             var regex = /\–[0-9]*/;
                             var str = $('.woocommerce-result-count').text();
                             var subst = String($('.js-ajax-item').length);
                             var result = str.replace(regex, "–" + subst);
                             $('.woocommerce-result-count').text(result);

                         }

                         // Change Load More button text back or remove button if there are no more pages to load
                         if (pageNum <= max) {
                             $('.js-ajax-load-button').html(camden_load_posts.load_more_button_text);
                         } else {
                             $('.archivePagination').remove();
                         }

                     });

                 } else {

                     $(paginationHolder).remove();

                 }

                 return false;

             });

         }

     }

     /* --------------------------------------------------
     	Sticky Sidebar
     -------------------------------------------------- */

     if ($(".js-sticky").length) {

         var margin = 0;
         var headerH = 0;

         margin = margin + headerH;

         $('.js-sticky').theiaStickySidebar({
             additionalMarginTop: margin
         });

     }

     /* --------------------------------------------------
     	Fancybox
     -------------------------------------------------- */

     if ($.isFunction($.fn.fancybox)) {

         jQuery('[data-fancybox]').fancybox({
             buttons: [
                 'share',
                 'close'
             ],
             btnTpl: {
                 arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
                     '<span class="camden-icon-arrow-left"></span>' +
                     '</button>',

                 arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
                     '<span class="camden-icon-arrow-right"></span>' +
                     '</button>'
             }
         });

     }



 });

 function CamdenResizeOwlSlider() {

     jQuery(".panel-grid:first-child .panel-grid-cell:first-child .widget:first-child .owl-carousel:first-child .owl-carousel-slide").each(function() {

         var headerHeight = jQuery(".siteHeader").height();
         var wHeight = jQuery(window).height();

         jQuery(this).height(wHeight - headerHeight);

     });

 }


 // Detecting IE more effectively : http://msdn.microsoft.com/en-us/library/ms537509.aspx
 function getInternetExplorerVersion() {
     // Returns the version of Internet Explorer or -1 (other browser)
     var rv = -1; // Return value assumes failure.
     if (navigator.appName == 'Microsoft Internet Explorer') {
         var ua = navigator.userAgent;
         var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
         if (re.exec(ua) != null)
             rv = parseFloat(RegExp.$1);
     };
     return rv;
 };


 function fadeInFirstAJAXItem() {

     var hiddenPosts, firstPost = null;
     hiddenPosts = jQuery('.js-Preview--hidden');

     if (hiddenPosts.length) {

         firstPost = hiddenPosts.first();
         jQuery(firstPost).removeClass('js-Preview--hidden');
         var postImage = jQuery(firstPost).find('img');
         postImage.addClass('loaded');
         setTimeout(fadeInFirstAJAXItem, 100);

     }

 }