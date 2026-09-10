function initA11yPanel() {
  const panel = document.getElementById('a11yPanel');
  const openBtn = document.querySelector('.a11y-open');
  const closeBtn = document.querySelector('.a11y-close');
  const resetBtn = document.querySelector('.a11y-reset');
  const fontBtns = document.querySelectorAll('[data-font]');
  const imageBtns = document.querySelectorAll('[data-images]');
  const schemeBtns = document.querySelectorAll('[data-scheme]');

  const STORAGE_KEY = 'a11y-settings';
  const OPEN_CLASS = 'a11y-panel--open';

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultSettings();
    } catch {
      return defaultSettings();
    }
  }

  function defaultSettings() {
    return { font: 'normal', images: 'on', scheme: 'normal' };
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function applySettings(settings) {
    document.body.classList.remove('a11y-font-large', 'a11y-font-larger');
    if (settings.font === 'large') document.body.classList.add('a11y-font-large');
    if (settings.font === 'larger') document.body.classList.add('a11y-font-larger');

    document.body.classList.toggle('a11y-images-off', settings.images === 'off');

    document.body.classList.remove('a11y-scheme-dark', 'a11y-scheme-light');
    if (settings.scheme === 'dark') document.body.classList.add('a11y-scheme-dark');
    if (settings.scheme === 'light') document.body.classList.add('a11y-scheme-light');

    updateActiveButtons(settings);
  }

  function updateActiveButtons(settings) {
    fontBtns.forEach(b => b.classList.toggle('active', b.dataset.font === settings.font));
    imageBtns.forEach(b => b.classList.toggle('active', b.dataset.images === settings.images));
    schemeBtns.forEach(b => b.classList.toggle('active', b.dataset.scheme === settings.scheme));
  }

  let settings = getSettings();
  applySettings(settings);

  openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    panel.classList.toggle(OPEN_CLASS);
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    panel.classList.remove(OPEN_CLASS);
  });

  resetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    settings = defaultSettings();
    saveSettings(settings);
    applySettings(settings);
  });

  fontBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      settings.font = btn.dataset.font;
      saveSettings(settings);
      applySettings(settings);
    });
  });

  imageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      settings.images = btn.dataset.images;
      saveSettings(settings);
      applySettings(settings);
    });
  });

  schemeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      settings.scheme = btn.dataset.scheme;
      saveSettings(settings);
      applySettings(settings);
    });
  });
}

initA11yPanel();