/* Le Cros de l'Oume — main.js
   1. Injecte header/footer partagés (fetch + innerHTML)
   2. Branche le menu hamburger mobile une fois le header injecté
   Nécessite un serveur local (http://...) : fetch() ne fonctionne pas
   en ouvrant le fichier directement (file://) à cause des restrictions CORS. */

async function includePartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Erreur d'inclusion :", err);
    el.innerHTML = `<p style="color:red">Impossible de charger ${url} — sers le site via un serveur local (voir README/WORKFLOW).</p>`;
  }
}

function initMobileNav() {
  const toggle = document.querySelector('.hamburger');
  const nav = document.querySelector('#site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

async function init() {
  await includePartial('#header-placeholder', '/partials/header.html');
  await includePartial('#footer-placeholder', '/partials/footer.html');
  initMobileNav();
}

document.addEventListener('DOMContentLoaded', init);
