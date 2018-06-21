//CounterUp
jQuery(document).ready(function( $ ) {
  $('.counter').counterUp({
    delay: 1,
    time: 800
  });
});


// Page Loader
$(window).load(function() {
  "use strict";
  $('#loading').fadeOut();
});

 /* Slicknav Mobile Menu
========================================================*/
  $(document).ready(function(){
    $('.wpb-mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'ul',
      allowParentLinks: true,
      duplicate: true,
      label: '',
      closedSymbol: '<i class="fa fa-angle-right"></i>',
      openedSymbol: '<i class="fa fa-angle-down"></i>',
    });
  });

 // Nav Menu & Search
  $(".nav > li:has(ul)").addClass("drop");
  $(".nav > li.drop > ul").addClass("dropdown");
  $(".nav > li.drop > ul.dropdown ul").addClass("sup-dropdown");

/* ==========================================================================
   Revolution Slider
   ========================================================================== */
  $(document).ready(function() {
     
    });

/* ==========================================================================
   Touch Owl Carousel
   ========================================================================== */
