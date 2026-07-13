/* Le Cros de l'Oume — carrousel.js
   Carrousel avec flèches, défilement automatique (pause au survol/focus),
   points de navigation, et lightbox plein écran (flèches, sans autoplay).
   Composant autonome : s'initialise sur chaque .carrousel trouvée sur la page. */

(function () {
  const AUTOPLAY_DELAY = 4000;

  function initCarrousel(root) {
    const viewport = root.querySelector('.carrousel-viewport');
    const track = root.querySelector('.carrousel-track');
    const items = Array.from(track.children);
    const prevBtn = root.querySelector('.carrousel-prev');
    const nextBtn = root.querySelector('.carrousel-next');
    const dotsContainer = root.querySelector('.carrousel-dots');
    if (!track || items.length === 0) return;

    // variante "coverflow" (essai) : slide active centree, precedente et
    // suivante visibles en reduit de chaque cote — le track ne glisse plus
    // via transform, on rejoue juste l'ordre visuel (voir style.css).
    const isCoverflow = root.classList.contains('carrousel--coverflow');

    let index = 0;
    let autoplayTimer = null;
    let remainingTime = AUTOPLAY_DELAY;
    let slideStartedAt = null;

    // distance circulaire entre l'item i2 et la slide active (0 = active,
    // -1 = juste avant, 1 = juste apres, etc. — gere plus de 3 items au cas ou).
    function relativeOffset(i2) {
      const len = items.length;
      let diff = i2 - index;
      if (diff > len / 2) diff -= len;
      if (diff < -len / 2) diff += len;
      return diff;
    }

    // en mode coverflow, decale/reduit chaque slide en fonction de sa distance
    // a l'active via des custom properties (--x-offset/--x-scale) lues par le
    // CSS — un vrai transform anime en continu, pas un changement de `order`
    // (qui saute d'un coup, sans transition possible).
    const COVERFLOW_BASE_OFFSET = 70; // % de la largeur d'une slide
    const COVERFLOW_STEP = 25;

    function updatePositionClasses() {
      items.forEach((li, i2) => {
        li.classList.remove('is-active', 'is-prev', 'is-next');
        const offset = relativeOffset(i2);
        if (offset === 0) li.classList.add('is-active');
        else if (offset === -1) li.classList.add('is-prev');
        else if (offset === 1) li.classList.add('is-next');

        if (!isCoverflow) return;

        const abs = Math.abs(offset);
        const distance = abs === 0 ? 0 : COVERFLOW_BASE_OFFSET + (abs - 1) * COVERFLOW_STEP;
        const sign = offset < 0 ? -1 : 1;
        li.style.setProperty('--x-offset', `${sign * distance}%`);
        li.style.setProperty('--x-scale', String(Math.max(0.55, 1 - abs * 0.22)));
        li.style.opacity = abs === 0 ? '1' : abs === 1 ? '0.5' : '0';
        li.style.pointerEvents = abs <= 1 ? 'auto' : 'none';
      });
    }

    function scrollToIndex(i) {
      index = (i + items.length) % items.length;
      if (!isCoverflow) {
        track.style.transform = `translateX(-${index * 100}%)`;
      }
      updatePositionClasses();
      updateDots();
    }

    function next() { scrollToIndex(index + 1); }
    function prev() { scrollToIndex(index - 1); }

    function updateDots() {
      if (!dotsContainer) return;
      Array.from(dotsContainer.children).forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        // relance l'animation de remplissage à chaque changement de slide
        const fill = dot.querySelector('.fill');
        if (fill) {
          fill.style.animation = 'none';
          void fill.offsetWidth; // force le reflow pour redémarrer l'animation
          fill.style.animation = '';
        }
      });
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      root.style.setProperty('--carrousel-delay', `${AUTOPLAY_DELAY}ms`);
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Aller à l'image ${i + 1}`);
        dot.innerHTML = '<span class="fill"></span>';
        dot.addEventListener('click', () => { scrollToIndex(i); resetAutoplay(); });
        dotsContainer.appendChild(dot);
      });
      updateDots();
    }

    // setTimeout (et non setInterval) + suivi du temps restant, pour que le
    // minuteur JS reste synchronisé avec la barre CSS lors des pauses/reprises
    // (sinon la barre visuelle se remplit avant que le JS ne change de photo).
    function scheduleNext(delay) {
      clearScheduledTimer();
      slideStartedAt = Date.now();
      remainingTime = delay;
      autoplayTimer = setTimeout(() => {
        next();
        scheduleNext(AUTOPLAY_DELAY);
      }, delay);
    }
    function clearScheduledTimer() {
      if (autoplayTimer) clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
    function startAutoplay() {
      root.classList.remove('is-paused');
      scheduleNext(remainingTime);
    }
    function stopAutoplay() {
      root.classList.add('is-paused');
      if (autoplayTimer) {
        const elapsed = Date.now() - slideStartedAt;
        remainingTime = Math.max(AUTOPLAY_DELAY - elapsed, 50);
      }
      clearScheduledTimer();
    }
    function resetAutoplay() {
      remainingTime = AUTOPLAY_DELAY;
      startAutoplay();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

    // pause au survol du cadre uniquement (pas toute la section, donc pas
    // les points en dessous) ; le focus clavier, lui, couvre toute la section.
    if (viewport) {
      viewport.addEventListener('mouseenter', stopAutoplay);
      viewport.addEventListener('mouseleave', startAutoplay);
    }
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);

    // ---- Lightbox : ouverture au clic sur une image, flèches, pas d'autoplay ----
    items.forEach((li, i) => {
      const img = li.querySelector('img');
      if (!img) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        if (li.classList.contains('is-prev')) { prev(); resetAutoplay(); return; }
        if (li.classList.contains('is-next')) { next(); resetAutoplay(); return; }
        openLightbox(i);
      });
    });

    const expandBtn = root.querySelector('.carrousel-expand');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => openLightbox(index));
    }

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

    updatePositionClasses();
    buildDots();
    startAutoplay();
  }

  // On attend que main.js ait fini d'injecter le header/footer (événement
  // "partials:ready") avant de démarrer l'autoplay et le survol du carrousel.
  // Sinon l'apparition du header juste après le chargement décale toute la
  // mise en page pendant que la souris ne bouge pas, ce qui déclenche des
  // mouseenter/mouseleave parasites → l'autoplay se bloque/débloque en boucle.
  document.addEventListener('partials:ready', () => {
    document.querySelectorAll('.carrousel').forEach(initCarrousel);
  });
})();
