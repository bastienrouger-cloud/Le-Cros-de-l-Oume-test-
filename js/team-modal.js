/* Le Cros de l'Oume — team-modal.js
   Cartes "equipe" (chevaux, chiens) : chaque carte n'affiche que photo +
   nom, le detail (bio complete) s'ouvre au clic dans une modale plein
   ecran. Fermeture par la croix, un clic sur le fond, ou la touche Echap.
   Composant autonome : s'initialise sur toute .team-card / .modal trouvee
   sur la page (pas de dependance a main.js/carrousel.js). */

(function () {
  let activeModal = null;
  let lastTrigger = null;

  function openModal(modal, trigger) {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    activeModal = modal;
    lastTrigger = trigger || null;
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    document.body.classList.remove('modal-open');
    activeModal = null;
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  }

  function init() {
    document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
      const modal = document.getElementById(trigger.getAttribute('data-modal-open'));
      if (!modal) return;
      trigger.addEventListener('click', () => openModal(modal, trigger));
    });

    // Un clic sur le fond sombre (.modal) ferme, mais pas un clic a l'interieur
    // du panneau (.modal-panel) — sauf sur la croix, identifiee par data-modal-close.
    document.querySelectorAll('.modal').forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('[data-modal-close]')) closeModal();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
