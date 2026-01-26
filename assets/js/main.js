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

// ================= CAROUSEL WITH CONTINUOUS ARROW SCROLL =================
const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.project-box');
const left = document.querySelector('.carousel-arrow.left');
const right = document.querySelector('.carousel-arrow.right');

if (track && items.length && left && right && window.innerWidth > 768) {
  let index = 0;
  let currentTranslate = 0;
  const wrapper = document.querySelector('.carousel-wrapper');
  let scrollInterval = null; // for continuous scrolling

  function update() {
    const itemWidth = items[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 40;
    const visibleCards = Math.floor(wrapper.offsetWidth / (itemWidth + gap));
    const maxIndex = items.length - visibleCards;

    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    currentTranslate = -index * (itemWidth + gap);
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function startScroll(direction) {
    // Scroll every 150ms while holding
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = setInterval(() => {
      index += direction;
      update();
    }, 150);
  }

  function stopScroll() {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  }

  // Arrow click + hold
  left.addEventListener('mousedown', () => startScroll(-1));
  right.addEventListener('mousedown', () => startScroll(1));
  window.addEventListener('mouseup', stopScroll);
  window.addEventListener('mouseleave', stopScroll);

  // Also support single click
  left.addEventListener('click', () => { index--; update(); });
  right.addEventListener('click', () => { index++; update(); });

  update();

  // Optional: mouse drag support
  let dragging = false, startX = 0, prevTranslate = 0;

  track.addEventListener('mousedown', e => {
    dragging = true;
    startX = e.pageX;
    prevTranslate = currentTranslate;
    stopScroll(); // stop arrows if dragging
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    const moved = currentTranslate - prevTranslate;
    if (moved < -50) index++;
    if (moved > 50) index--;
    update();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    currentTranslate = prevTranslate + (e.pageX - startX);
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  // Recalculate on window resize
  window.addEventListener('resize', update);
}


/* ================= MOBILE NAV ================= */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('hamburger')) {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('active');
  }
});
