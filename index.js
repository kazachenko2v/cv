const wrapper = document.querySelector(".wrapper");
const body = document.querySelector(".body");
const headerHeight = document.querySelector(".header").clientHeight;
const navLinks = document.querySelectorAll(".navigation__links");

navLinks.forEach((el) =>
  el.addEventListener("click", (event) => {
    event.preventDefault();
    const link = event.target.getAttribute("href");
    const toScrollElem = document.querySelector(link);
    window.scrollTo({
      top: toScrollElem.offsetTop - headerHeight,
      behavior: "smooth",
    });
    navToggle(false);
  })
);

wrapper.style.paddingTop = headerHeight + "px";

let countSlides = body.clientWidth >= 620 ? 2 : 1;

const resize_ob = new ResizeObserver(function (entries) {
  let rect = entries[0].contentRect;

  let width = rect.width;

  if (width >= 620) {
    countSlides = 2;
  } else {
    countSlides = 1;
  }
});

resize_ob.observe(body);

let position = 0;
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const slider = document.querySelector(".slider__container");
const items = document.querySelectorAll(".slider__item");

items.forEach(
  (item) => (item.style.flexBasis = `calc(${100 / countSlides}% - 20px)`)
);

leftArrow.disabled = true;

rightArrow.addEventListener("click", () => {
  console.log(countSlides);
  items.forEach(
    (item) => (item.style.flexBasis = `calc(${100 / countSlides}% - 20px)`)
  );

  if (position >= items.length - countSlides - 1) {
    rightArrow.disabled = true;
  } else {
    leftArrow.disabled = false;
  }
  position = position >= items.length - countSlides ? 0 : position + 1;
  slider.style.transform = `translateX(${-position * items[0].offsetWidth}px)`;
});

leftArrow.addEventListener("click", () => {
  items.forEach(
    (item) => (item.style.flexBasis = `calc(${100 / countSlides}% - 20px)`)
  );

  if (position === 1) {
    leftArrow.disabled = true;
  } else {
    rightArrow.disabled = false;
  }
  position = position === 0 ? items.length - countSlides : position - 1;
  slider.style.transform = `translateX(${-position * items[0].offsetWidth}px)`;
});

const toggleButton = document.querySelector(".header__button_toggle");
const nav = document.querySelector(".navigation__list");

function navToggle(bool) {
  nav.setAttribute("data-visible", bool);
  toggleButton.setAttribute("aria-expanded", bool);
  if (bool) {
    body.classList.add("body_blocked");
  } else {
    body.classList.remove("body_blocked");
  }
}

toggleButton.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");
  if (visibility === "false") {
    navToggle(true);
  } else {
    navToggle(false);
  }
});
