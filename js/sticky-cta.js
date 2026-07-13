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
          // n'affiche la barre flottante que si l'ancre est sortie par le
          // HAUT du viewport (on a scrolle en dessous) — pas simplement
          // "pas intersectante", ce qui est aussi vrai avant meme d'avoir
          // atteint l'ancre (cas d'une ancre plus bas dans la page, ex.
          // au milieu du contenu plutot que dans le hero). Sans ce check,
          // la barre s'affichait des le chargement de la page.
          const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          floating.classList.toggle('is-visible', scrolledPast);
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
