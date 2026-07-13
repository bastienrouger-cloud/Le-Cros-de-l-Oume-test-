/* Le Cros de l'Oume — contact-form.js
   Site d'entrainement : ce formulaire n'est raccorde a aucun service
   d'envoi reel (pas de Formspree, pas de backend). Au clic sur "Envoyer",
   on empeche la soumission par defaut, on desactive les champs et on
   affiche un message de confirmation — pure facade, cote client. */

(function () {
  function init() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      Array.from(form.elements).forEach((el) => { el.disabled = true; });
      success.hidden = false;
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
