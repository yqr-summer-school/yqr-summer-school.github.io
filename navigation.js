const menu = document.querySelector('.site-nav');
const toggle = document.querySelector('.menu-toggle');
const smallScreen = window.matchMedia('(max-width: 860px)');
const header = document.querySelector('.site-header');
const materials = menu.querySelector('.materials');

function updateHeader() {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  if (!open) materials.open = false;
}

function updateLayout() {
  toggle.hidden = !smallScreen.matches;
  setMenu(false);
}
updateLayout();
document.documentElement.classList.add('js');
smallScreen.addEventListener('change', updateLayout);
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('click', event => {
  if (!header.contains(event.target) || event.target.closest('a')) setMenu(false);
  else if (!materials.contains(event.target)) materials.open = false;
});
document.addEventListener('focusin', event => {
  if (!materials.contains(event.target)) materials.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (materials.open) {
    materials.open = false;
    materials.querySelector('summary').focus();
  } else if (toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
