const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = 'veyro-theme';

function preferredTheme() {
  try {
    return localStorage.getItem(themeStorageKey) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (_) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function applyTheme(theme, save = false) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeColor.content = isDark ? '#081524' : '#f7faff';
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeButton.title = `Switch to ${isDark ? 'light' : 'dark'} theme`;
  themeLabel.textContent = isDark ? 'Light' : 'Dark';
  if (save) {
    try { localStorage.setItem(themeStorageKey, theme); } catch (_) { /* Storage is optional. */ }
  }
}

applyTheme(preferredTheme());

themeButton.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();
