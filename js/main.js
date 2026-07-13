/* Le Cros de l'Oume — main.js
   1. Injecte header/footer partagés (fetch + innerHTML)
   2. Branche le menu hamburger mobile une fois le header injecté
   Nécessite un serveur local (http://...) : fetch() ne fonctionne pas
   en ouvrant le fichier directement (file://) à cause des restrictions CORS.

   GitHub Pages : un depot "projet" (pas <compte>.github.io) est servi sous
   un sous-dossier (https://<compte>.github.io/<repo>/), alors que tout le
   site est ecrit avec des chemins racine-relatifs (/css/..., /pages/...) —
   pratique quand le site est servi a la racine du domaine (serveur local,
   ou un futur nom de domaine personnalise), mais ces chemins ratent alors
   le prefixe /<repo>/. REPO_BASE calcule ce prefixe manquant (vide partout
   ailleurs) et fixupRootRelative() l'ajoute a tous les attributs href/src
   commencant par "/", pour que la meme base de code marche aux deux
   endroits sans dupliquer les pages. */

const REPO_BASE = location.hostname.endsWith('.github.io')
  ? '/' + location.pathname.split('/').filter(Boolean)[0]
  : '';

function fixupRootRelative(root) {
  if (!REPO_BASE) return; // rien a faire en local ou a la racine du domaine
  root.querySelectorAll('[href^="/"], [src^="/"]').forEach((el) => {
    const attr = el.hasAttribute('href') ? 'href' : 'src';
    const value = el.getAttribute(attr);
    if (value.startsWith(REPO_BASE + '/')) return; // deja corrige
    el.setAttribute(attr, REPO_BASE + value);
  });
}

async function includePartial(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(REPO_BASE + url);
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    el.innerHTML = await res.text();
    fixupRootRelative(el);
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

// "/index.html" et "/" pointent vers la meme page : on normalise pour que
// la comparaison marche quelle que soit la forme utilisee.
function normalizeNavPath(pathname) {
  return pathname === '' || pathname === '/' ? '/index.html' : pathname;
}

// Met en évidence, dans le header et le footer, le(s) lien(s) qui pointent
// vers la page actuellement affichée. Si le lien actif est dans le sous-menu
// "Activités", le parent est marqué actif aussi pour indiquer la section.
function highlightActiveNav() {
  const currentPath = normalizeNavPath(window.location.pathname);

  document.querySelectorAll('nav a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === '#') return; // simple bouton qui deplie le sous-menu, pas une vraie page

    let linkPath;
    try {
      linkPath = normalizeNavPath(new URL(href, window.location.origin).pathname);
    } catch (err) {
      return;
    }

    if (linkPath !== currentPath) return;

    link.classList.add('active');
    link.setAttribute('aria-current', 'page');

    const parentSubmenu = link.closest('.submenu');
    if (parentSubmenu) {
      const parentToggle = parentSubmenu.previousElementSibling;
      if (parentToggle && parentToggle.classList.contains('nav-toggle')) {
        parentToggle.classList.add('active');
      }
    }
  });
}

async function init() {
  fixupRootRelative(document); // corrige les chemins deja presents dans la page (images, liens du corps)
  await includePartial('#header-placeholder', '/partials/header.html');
  await includePartial('#footer-placeholder', '/partials/footer.html');
  initMobileNav();
  highlightActiveNav();
  // signale aux autres scripts (carrousel.js) que la mise en page est stable :
  // header/footer injectés = plus de décalage de layout à attendre avant de
  // démarrer des comportements sensibles au survol (autoplay du carrousel).
  document.dispatchEvent(new CustomEvent('partials:ready'));
}

document.addEventListener('DOMContentLoaded', init);
