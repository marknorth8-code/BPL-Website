/* ================= FOOTER YEAR ================= */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ================= HEADER / FOOTER LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("header.html")
      .then(res => res.text())
      .then(html => header.innerHTML = html);
  }

  if (footer) {
    fetch("footer.html")
      .then(res => res.text())
      .then(html => footer.innerHTML = html);
  }
});

/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});

/* ================= HOME PAGE CAROUSEL ================= */
window.addEventListener('load', () => { // wait for images to load
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.project-box');
  const left = document.querySelector('.carousel-arrow.left');
  const right = document.querySelector('.carousel-arrow.right');
  const wrapper = document.querySelector('.carousel-wrapper');

  if (!track || items.length === 0 || !left || !right || !wrapper) {
    console.warn('Carousel elements not found');
    return;
  }

  let currentTranslate = 0;
  const gap = parseInt(getComputedStyle(track).gap) || 40;

  function getItemWidth() {
    return items[0].getBoundingClientRect().width;
  }

  function getMaxScroll() {
    const itemWidth = getItemWidth();
    const totalWidth = items.length * (itemWidth + gap) - gap;
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    return Math.max(totalWidth - wrapperWidth, 0);
  }

  function updateTranslate() {
    const maxScroll = getMaxScroll();
    if (currentTranslate > 0) currentTranslate = 0;
    if (currentTranslate < -maxScroll) currentTranslate = -maxScroll;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  /* ---------- Arrow Click ---------- */
  left.addEventListener('click', () => {
    currentTranslate += getItemWidth() + gap;
    updateTranslate();
  });

  right.addEventListener('click', () => {
    currentTranslate -= getItemWidth() + gap;
    updateTranslate();
  });

  /* ---------- Continuous Arrow Hold ---------- */
  let scrollInterval = null;
  function startScroll(direction) {
    stopScroll();
    scrollInterval = setInterval(() => {
      currentTranslate -= direction * 10; // smooth scroll
      updateTranslate();
    }, 16); // ~60fps
  }
  function stopScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }

  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  /* ---------- Drag / Mouse Support ---------- */
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll();
    track.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    track.style.cursor = 'grab';
    const moved = currentTranslate - prevTranslate;
    if (moved < -50) currentTranslate -= getItemWidth() + gap;
    if (moved > 50) currentTranslate += getItemWidth() + gap;
    updateTranslate();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    updateTranslate();
  });

  /* ---------- Touch / Mobile Drag ---------- */
  track.addEventListener('touchstart', e => {
    dragging = true;
    startX = e.touches[0].pageX;
    prevTranslate = currentTranslate;
  });

  track.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    const moved = currentTranslate - prevTranslate;
    if (moved < -50) currentTranslate -= getItemWidth() + gap;
    if (moved > 50) currentTranslate += getItemWidth() + gap;
    updateTranslate();
  });

  track.addEventListener('touchmove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.touches[0].pageX - startX);
    updateTranslate();
  });

  /* ---------- Recalculate on Resize ---------- */
  window.addEventListener('resize', updateTranslate);

  updateTranslate();
});
