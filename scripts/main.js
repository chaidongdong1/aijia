(function($) {

  /*===================================================
  =                显示banner的版心                   =
  ===================================================*/
  function bannerImgPosChange(devWidth, bannerImgs) {
    if (devWidth < 1920) {
      if (devWidth > 1184) {
        bannerImgs.css({
          position: 'absolute',
          left: -(1920 - devWidth) / 2
        })
      } else {
        bannerImgs.css({
          position: 'absolute',
          left: -(1920 - 1148) / 2
        })
      }
    }
  }

  /*===================================================
  =                   元素渐入                        =
  ===================================================*/
  function elementFadeIn(devHeight, scrollTop, allAnimate) {
    for (var i = 0; i < allAnimate.length; i++) {
      if (devHeight + scrollTop >= allAnimate[i].offset().top) {
        allAnimate[i].addClass('animated fadeInUp')
      }
    }
  }

  /*===================================================
  =                   轮播图对象                    =
  ===================================================*/
  function Banner(wrap) {
    this.currentIndex = 0;
    this.wrap = wrap;
    this.next = this.wrap.find('.next');
    this.prev = this.wrap.find('.prev');
    this.content = this.wrap.find('ul');
    this.items = this.content.find('li');
    this.count = this.items.length;
    this.focusBox = this.wrap.find('.focus');
    this.init();
  }
  Banner.prototype = {
    addFocus: function() {
      var focus;
      for (var i = 0; i < this.count; i++) {
        focus += '<li></li>';
      }
      this.focusBox.html(focus);
      this.focusItems = this.focusBox.find('li');
      this.focusItems.eq(0).addClass('active');
      this.addEvent();
    },
    addEvent:function() {
      var self = this,
        timer;
      this.prev.on('click', function() {
        self.go('prev');
      });
      this.next.on('click', function() {
        self.go('next');
      });
      this.focusItems.on('click', function() {
        self.go($(this).index());
      });

      function autoPlay() {
        self.go('next');
      };
      timer = setInterval(autoPlay, 5000);
      this.wrap.hover(function() {
        clearInterval(timer);
      }, function() {
        timer = setInterval(autoPlay, 5000);
      });
    },
    animate: function(prev, curr) {
      this.items.eq(prev).stop().fadeOut('fast');
      this.items.eq(curr).stop().fadeIn('fast');

      this.focusItems.eq(prev).removeClass('active');
      this.focusItems.eq(curr).addClass('active');
    },
    go: function(direction) {
      var self = this,
        prevIndex = this.currentIndex;
      if (direction === 'next') {
        if (++this.currentIndex < this.count) {
          this.animate(prevIndex, this.currentIndex);
        } else {
          this.currentIndex = 0;
          this.animate(prevIndex, this.currentIndex);
        }
      } else if (direction === 'prev') {
        if (--this.currentIndex >= 0) {
          this.animate(prevIndex, this.currentIndex);
        } else {
          this.currentIndex = this.count - 1;
          this.animate(prevIndex, this.currentIndex);
        }
      } else {
        if (this.currentIndex != direction) {
          this.currentIndex = direction;
          this.animate(prevIndex, this.currentIndex);
        }
      }
    },
    init: function() {
      this.addFocus();
    }
  };

  /*===================================================
  =                   友情链接对象                    =
  ===================================================*/

  function FriendLink() {
    this.wrap = $('.friend-link');
    this.currentIndex = 0;
    this.next = this.wrap.find('.next');
    this.prev = this.wrap.find('.prev');
    this.body = this.wrap.find('.link-wrap');
    this.items = this.wrap.find('li');
    this.len = this.items.length;
    this.addEvent();
  }
  FriendLink.prototype = {
    addEvent: function() {
      var self = this;
      this.next.on('click', function() {
        self.go('next')
      });
      this.prev.on('click', function() {
        self.go('prev')
      });
    },
    move: function() {
      this.body.animate({
        left: -this.currentIndex * 1020
      })
    },
    go: function(direction) {
      if (direction === 'next') {
        if (++this.currentIndex < this.len) {
          this.move();
        } else {
          this.currentIndex--;
        }
      } else if (direction === 'prev') {
        if (--this.currentIndex >= 0) {
          this.move();
        } else {
          this.currentIndex++;
        }
      }
    }
  };

  $(function() {


    //创建轮播图
    new Banner($('.banner'));
    //创建友情链接
    new FriendLink();



    var timer, bannerImgs = $('.banner ul li a img');
    bannerImgPosChange($(window).width(), bannerImgs);
    //显示banner图的版心
    $(window).on('resize', function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        bannerImgPosChange($(window).width(), bannerImgs);
      }, 200);
    });



    //记录要执行进入动画的所有元素
    var devHeight = $(window).height(),
      allAnimate = [],
      temp = [$('.design .lside'), $('.design .rside'), $('.case ul li'), $('.team ul li'), $('.about-content'), $('.news li'), $('.title-group')];

    temp.forEach(function(item) {
      item.each(function() {
        allAnimate.push($(this))
      })
    });

    //监听滚动 当元素进入可视区 执行进入动画
    elementFadeIn(devHeight, $(document).scrollTop(), allAnimate);
    $(window).scroll(function() {
      elementFadeIn(devHeight, $(document).scrollTop(), allAnimate);
    });

    $('.case ul li').each(function(index) {
      if (index % 4 == 1) {
        $(this).css('animation-delay', '0.1s');
      } else if (index % 4 == 2) {
        $(this).css('animation-delay', '0.2s');
      } else if (index % 4 == 3) {
        $(this).css('animation-delay', '0.3s');
      }
    })

  });
})(jQuery);