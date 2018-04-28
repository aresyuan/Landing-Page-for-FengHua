import 'bootstrap';
import 'jquery-ui/ui/effects/effect-slide';

import './scss/index.scss';

$('#alert').click(() => {
  alert('jQuery works!');
});

$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
    location.hostname == this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate(
        {
          scrollTop: target.offset().top - 54,
        },
        1000,
        'easeInOutExpo'
      );
      return false;
    }
  }
});

// Closes responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function() {
  $('.navbar-collapse').collapse('hide');
});

// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
  target: '#mainNav',
  offset: 56,
});

// Collapse Navbar
const navbarCollapse = () => {
  if ($('#mainNav').offset().top > 100) {
    $('#mainNav').addClass('navbar-shrink');
  } else {
    $('#mainNav').removeClass('navbar-shrink');
  }
};
// Collapse now if page is not at top
navbarCollapse();
// Collapse the navbar when page is scrolled
$(window).scroll(navbarCollapse);

// Hide navbar when modals trigger
$('.portfolio-modal').on('show.bs.modal', () => {
  $('.navbar').addClass('d-none');
});
$('.portfolio-modal').on('hidden.bs.modal', () => {
  $('.navbar').removeClass('d-none');
});

// Manipulate #neighborhood-text-carousel
$('#neighborhood-carousel').on('slide.bs.carousel', e => {
  const textCarouselIndex = parseInt(e.to / 2, 10);

  $('#neighborhood-text-carousel').carousel(textCarouselIndex);
});
