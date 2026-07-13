/* Le Cros de l'Oume — carrousel.js
   Carrousel avec flèches, défilement automatique (pause au survol/focus),
   points de navigation, et lightbox plein écran (flèches, sans autoplay).
   Composant autonome : s'initialise sur chaque .carrousel trouvée sur la page. */

(function () {
  const AUTOPLAY_DELAY = 4000;

  function initCarrousel(root) {
    const track = root.querySelector('.carrousel-track');
    const items = Array.from(track.children);
    const prevBtn = root.querySelector('.carrousel-prev');
    const nextBtn = root.querySelector('.carrousel-next');
    const dotsContainer = root.querySelector('.carrousel-dots');
    if (!track || items.length === 0) return;

    let index = 0;
    let autoplayId = null;

    function scrollToIndex(i) {
      index = (i + items.length) % items.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function next() { scrollToIndex(index + 1); }
    function prev() { scrollToIndex(index - 1); }

    function updateDots() {
      if (!dotsContainer) return;
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Aller à l'image ${i + 1}`);
        dot.addEventListener('click', () => { scrollToIndex(i); resetAutoplay(); });
        dotsContainer.appendChild(dot);
      });
      updateDots();
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayId = setInterval(next, AUTOPLAY_DELAY);
    }
    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = null;
    }
    function resetAutoplay() {
      startAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

    // pause au survol / focus clavier, reprend en sortant
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    // ---- Lightbox : ouverture au clic sur une image, flèches, pas d'autoplay ----
    items.forEach((li, i) => {
      const img = li.querySelector('img');
      if (!img) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(i));
    });

    function openLightbox(startIndex) {
      stopAutoplay();

      let current = startIndex;
      const overlay = document.createElement('div');
      overlay.className = 'lightbox';
      overlay.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Fermer">&times;</button>
        <button type="button" class="lightbox-prev" aria-label="Image précédente">&#10094;</button>
        <img class="lightbox-img" src="" alt="">
        <button type="button" class="lightbox-next" aria-label="Image suivante">&#10095;</button>
      `;
      document.body.appendChild(overlay);
      document.body.classList.add('lightbox-open');

      const imgEl = overlay.querySelector('.lightbox-img');

      function show(i) {
        current = (i + items.length) % items.length;
        const sourceImg = items[current].querySelector('img');
        imgEl.src = sourceImg.src;
        imgEl.alt = sourceImg.alt;
      }

      function close() {
        overlay.remove();
        document.body.classList.remove('lightbox-open');
        document.removeEventListener('keydown', onKey);
        startAutoplay();
      }

      function onKey(e) {
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
      }

      overlay.querySelector('.lightbox-close').addEventListener('click', close);
      overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
      overlay.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      document.addEventListener('keydown', onKey);

      show(startIndex);
    }

    buildDots();
    startAutoplay();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carrousel').forEach(initCarrousel);
  });
})();
