/* Le Cros de l'Oume — team-portrait.js
   Portraits ronds "Notre equipe" (Ludivine, Margot) : la description
   apparait au survol ou au focus clavier via CSS pur (:hover/:focus-visible).
   Ce script ne gere que le cas mobile, ou il n'y a pas de vrai survol : un
   tap sur un portrait bascule sa description (.is-active), un tap ailleurs
   sur la page referme tout. */

(function () {
  function init() {
    const portraits = document.querySelectorAll('.team-portrait');
    if (!portraits.length) return;

    portraits.forEach((portrait) => {
      portrait.setAttribute('tabindex', '0');
      portrait.addEventListener('click', () => {
        const wasActive = portrait.classList.contains('is-active');
        portraits.forEach((p) => p.classList.remove('is-active'));
        if (!wasActive) portrait.classList.add('is-active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.team-portrait')) {
        portraits.forEach((p) => p.classList.remove('is-active'));
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
