import VanillaScrollspy from 'vanillajs-scrollspy';
import autotyper from './autotype';

// DOM content loaded (on document ready)
document.addEventListener('DOMContentLoaded', function () {
  //on window scroll
  window.onscroll = function () {
    // window is greater than 560px
    if (typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth > 560) {

      var topHeader = document.querySelector('header');
      var topHeaderHeight = topHeader.offsetHeight;
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      // if scroll position is greater than header height add sticky class
      if (scrollPosition > topHeaderHeight) {
        topHeader.classList.add("sticky");
      } else {
        topHeader.classList.remove("sticky");
      }
    }
    // iterator
    var it;
    // is face image visible
    var my_face = document.getElementById('my_face');
    if (isVisibleOnScreen(my_face)) {
      my_face.classList.add("animated", "bounceIn", "slow");
    } else {
      my_face.classList.remove("animated", "bounceIn", "slow");
    }
    // about section is visible
    var about_section = document.getElementById('about');
    if (isVisibleOnScreen(about_section)) {
      var user_data_content_list =
        document.querySelector('.user-data-content').getElementsByTagName('li');

      for (it = 0; it < user_data_content_list.length; it++) {
        user_data_content_list[it].classList
          .add("animated", "fadeInRight", "delay-" + (it + 1) + "s");
      }
      document.getElementsByClassName("continuate")[0].classList
        .add("animated", "fadeIn", "delay-5s", "slower");
    }
    // else {
    // document.getElementsByClassName("user-data")[0]
    // .classList
    // .remove("animated", "fadeIn", "delay-1s");
    // var user_data_content_list1 = document.querySelector('.user-data-content').getElementsByTagName('li');
    // for (var ite = 0; ite < user_data_content_list1.length; ite++) {
    //   user_data_content_list[ite]
    //   .classList
    //   .remove("animated", "fadeInRight", "delay-" + (ite + 1) + "s");
    // }
    // document.getElementsByClassName("continuate")[0]
    // .classList
    // .remove("animated", "fadeIn","delay-5s","slower");
    // }

    var skill_grid = document.getElementById('skill_grid');
    if (isVisibleOnScreen(skill_grid)) {
      var skill_grid_list = document.getElementById('skill_grid').getElementsByTagName('li');
      for (it = 0; it < skill_grid_list.length; it++) {
        skill_grid_list[it].addEventListener('mouseover', function () {
          this.classList.add("animated", "tada");
        }, false);
      }
      for (it = 0; it < skill_grid_list.length; it++) {
        skill_grid_list[it].addEventListener('mouseleave', function () {
          this.classList.remove("animated", "tada");
        }, false);
      }
    }
  };

  // on window resize
  window.onresize = function () {
    // window is less than 561px, add click listeners to anchors
    if (typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth < 561) {
      // add click listeners to anchors
      document.getElementById('menu-nav').addEventListener('click', function () {
        if (document.getElementById('menu-nav').checked) {
          document.querySelector('.nav-container').classList.add("sticky");
        } else {
          document.querySelector('.nav-container').classList.remove("sticky");
        }
      }, false);
      // iterator
      var it;
      var item_list = document.querySelector('.nav-container').getElementsByTagName('a');
      for (var i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener('click', function () {
          document.getElementById('menu-nav').checked = false;
          // remove sticky class
          document.querySelector('.nav-container').classList.remove("sticky");
        }, false);
      }

      var section_list = document.getElementsByTagName('section');
      for (it = 0; it < section_list.length; it++) {
        section_list[it].addEventListener('click', function () {
          if (document.getElementById('menu-nav').checked) {
            document.getElementById('menu-nav').checked = false;
            document.querySelector('.nav-container').classList.remove("sticky");
          }
        }, false);
      }
    }
  };


  function isVisibleOnScreen(elem) {
    var rect = elem.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  // initialize ScrollSpy
  const navbar = document.querySelector('nav');
  const scrollspy = new VanillaScrollspy(navbar, 875);
  scrollspy.init();

  // call autotyper
  autotyper;

});
