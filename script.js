(() => {
  const sections = new Set(['whoami', 'papers', 'interests']);
  let language = 'en';

  function applyLanguage() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-lang]').forEach(element => {
      element.hidden = element.dataset.lang !== language;
    });
    document.querySelectorAll('[data-select-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.selectLanguage === language));
    });
  }

  function showSection() {
    const requested = location.hash.slice(1);
    const section = sections.has(requested) ? requested : 'whoami';
    document.querySelectorAll('.content-region').forEach(region => {
      const isSelected = region.id === section;
      region.classList.toggle('hide', !isSelected);
      region.classList.toggle('show', isSelected);
    });
    document.querySelectorAll('.main-menu a').forEach(link => {
      link.classList.toggle('active', link.hash === '#' + section);
    });
  }

  document.querySelectorAll('[data-select-language]').forEach(button => {
    button.addEventListener('click', () => {
      language = button.dataset.selectLanguage;
      applyLanguage();
    });
  });

  window.addEventListener('load', showSection);
  window.addEventListener('hashchange', showSection);
  applyLanguage();
  showSection();
})();
