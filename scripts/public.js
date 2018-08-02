$(function() {
  var current;
  $('.nav > li').each(function(index, item) {
    var navList = $(item).find('ol');
    if ($(item).find('.active').length !=0 ) current= $(item).find(' > a');
    if (navList.length != 0) {
      navList.css({
        'margin-left': -(120 - $(item).width()) / 2,
        'opacity' : 1
      });
      navList.slideUp(0);
    }
  });
  $('.nav > li').on('mouseenter',function() {
    if ($(this).find('ol').length != 0) {
      $(this).find('ol').stop().slideDown('fast');
      current.removeClass('active');
    }
  }).on('mouseleave',function() {
    if ($(this).find('ol').length != 0) {
      $(this).find('ol').stop().slideUp('fast');
      current.addClass('active');
    }
  })
});