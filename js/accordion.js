/* Le Cros de l'Oume — accordion.js
   Accordeon simple : chaque item s'ouvre/se ferme independamment des
   autres (plusieurs peuvent rester ouverts en meme temps, pas de mode
   "un seul a la fois"). Anime la hauteur via max-height + JS. */

(function () {
  function toggleItem(trigger) {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      panel.style.maxHeight = '0px';
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      trigger.setAttribute('aria-expanded', 'true');
      panel.removeAttribute('aria-hidden');
    }
  }

  function init() {
    document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (panel) {
        panel.style.maxHeight = '0px';
        panel.setAttribute('aria-hidden', 'true');
      }
      trigger.addEventListener('click', () => toggleItem(trigger));
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
