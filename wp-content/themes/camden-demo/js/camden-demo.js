 /**
  * camden-demo.js
  * 
  * Copyright 2017 WebsiteSmash
  * http://www.websitesmash.com
  * http://themeforest.net/user/websitesmash/portfolio
  *
  **/

 jQuery(document).ready(function($) {

     "use strict";
     $('.camden-demo .toggle').click(function() {
         $('body').toggleClass('camden-demo-open');
     });

     $('.camden-demo .color').click(function() {

         // set the colour choice as active
         $('.color.active').removeClass('active');
         $(this).addClass('active');

         var loc = location.href;

         // update CSS
         if ($(this).data('color') == 'dark') {

             //$('link[rel=stylesheet][href~="camden-light.css"]').remove();

             if (getParameterByName('color') == null) {

                 loc += loc.indexOf("?") === -1 ? "?" : "&";
                 loc = loc + "color=dark";

             } else {

                 loc = loc.replace("color=light", "color=dark");

             }

         } else {

             if (getParameterByName('color') == null) {

                 loc += loc.indexOf("?") === -1 ? "?" : "&";
                 loc = loc + "color=light";

             } else {

                 loc = loc.replace("color=dark", "color=light");

             }

         }

         location.href = loc;

     });

 });

 function getParameterByName(name, url) {

     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';

     return decodeURIComponent(results[2].replace(/\+/g, " "));

 }