'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'Cookies are used to track movements <button class="btn btn--close--cookie">Got it!</button>';
header.append(message);

document.querySelector('.btn--close--cookie').addEventListener('click', () => {
  message.remove();
});

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

message.style.setProperty('background-color', 'gray');
message.style.setProperty('width', '120%');

// document.documentElement.style.setProperty('--color-primary', 'orange');

console.log(logo.dataset.versionNumber);

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();

//     e.stopPropagation();
//   })
// );

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

//navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//sticky nav

const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

// section fadein

const allSections = document.querySelectorAll('.section');

const revealSections = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy img

const imgTargets = document.querySelectorAll('img[data-src]');
//select every img with class of data-src

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //change from lazy to normal img
  entry.target.src = entry.target.dataset.src;

  //when picture loads
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelector('.dots');

  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    moveSlides(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }

    moveSlides(curSlide);
    activateDot(curSlide);
  };

  const moveSlides = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
  });

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      moveSlides(slide);
      activateDot(slide);
    }
  });

  const init = function () {
    moveSlides(0);
    createDots();
    activateDot(0);
  };
  init();
};
slider();

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});

// testing

const infoArray = document.querySelectorAll('.section--progress--3R0vk');

let text1 = infoArray[0].querySelector('span').innerText;
text1.slice(text1.indexOf('|') + 2); // 22 min

// const times = Array.from(infoArray).map(text => {
//   return text.querySelector('span').innerText;
// });

// infoArray.forEach(text => {
//   console.log(text.querySelector('span').innerText);
// });

// infoArray.forEach(text => {
//   let time = text.querySelector('span').innerText;
//   console.log(time.slice(time.indexOf('|') + 2));
// });

const times = Array.from(infoArray).map(text => {
  let time = text.querySelector('span').innerText;
  return time.slice(time.indexOf('|') + 2);
});

const timesArr = [
  '22 min',
  '4 godz. 41 min',
  '4 godz. 33 min',
  '4 min',
  '2 godz. 4 min',
  '56 min',
  '3 godz. 54 min',
  '3 godz. 7 min',
  '5 godz. 34 min',
  '2 godz. 37 min',
  '6 godz. 8 min',
  '3 godz. 15 min',
  '5 godz. 18 min',
  '4 godz. 10 min',
  '3 godz. 59 min',
  '5 godz. 1 min',
  '3 godz. 50 min',
  '8 godz. 23 min',
  '59 min',
  '4 min',
  '1 min',
];

console.log(Number.parseInt(timesArr[0], 10));
