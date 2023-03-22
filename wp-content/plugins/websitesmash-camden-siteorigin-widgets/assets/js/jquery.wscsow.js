 /**
  * jquery.wscsow.js
  * 
  * Custom scripts for WebsiteSmash Camden SiteOrigin Custom Widgets plugin by WebsiteSmash.
  * 
  * Copyright 2017 WebsiteSmash
  * http://www.websitesmash.com
  * http://themeforest.net/user/websitesmash/portfolio
  *
  **/

 jQuery(document).ready(function($) {

     "use strict";

     /* --------------------------------------------------
     	Owl Slider
     -------------------------------------------------- */

     if (jQuery.isFunction(jQuery.fn.owlCarousel)) {

         $(window).load(function() {

             var carousel = $('.js-wscsow-slider').owlCarousel({
                 animateOut: 'fadeOut',
                 autoplay: true,
                 nav: false,
                 loop: true,
                 startPosition: 0,
                 margin: 0,
                 items: 1,
                 onTranslated: slideChanged
             });

         });

     }

 });

 function slideChanged(event) {

     jQuery('.owl-carousel').each(function() {

         var activeSlide = jQuery(this).find(".active");

         if (jQuery(activeSlide).find(".owl-carousel-slide").hasClass("slide-content--dark")) {
             jQuery(this).find(".owl-dots").addClass("dark");
         } else {
             jQuery(this).find(".owl-dots").removeClass("dark");
         }

     });

 }