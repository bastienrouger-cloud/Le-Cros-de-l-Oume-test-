/* Le Cros de l'Oume — sticky-cta.js
   Duplique un CTA place en haut de page (#hero-cta-anchor) dans une barre
   flottante (#sticky-cta) qui apparait une fois l'original sorti du champ
   de vision en scrollant vers le bas, façon "Ship Value" sur les pages
   vaisseau de robertsspaceindustries.com. Redisparait si on remonte
   au-dessus de l'original.
   Reutilisable sur n'importe quelle page qui possede ces deux ids ;
   ne fait rien si l'un des deux est absent (pages sans ce pattern). */

(function () {
  function init() {
    const anchor = document.getElementById('hero-cta-anchor');
    const floating = document.getElementById('sticky-cta');
    if (!anchor || !floating || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          floating.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(anchor);
  }

  // attend que header/footer soient injectes (partials:ready), meme
  // convention que carrousel.js, pour ne pas dependre d'un layout pas
  // encore stabilise.
  document.addEventListener('partials:ready', init);
})();
