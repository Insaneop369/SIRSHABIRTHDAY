(() => {
  const story = document.querySelector('.storybook');
  const chapters = [...document.querySelectorAll('.chapter')];
  const chapterNames = ['intro', 'kingdom', 'garden', 'balcony', 'finale'];
  let currentChapter = 'intro';
  let transitionTimer;

  function navigateTo(name) {
    if (!chapterNames.includes(name)) return;
    clearTimeout(transitionTimer);
    story.classList.add('is-travelling');
    chapters.forEach((chapter) => {
      const active = chapter.id === `chapter-${name}`;
      chapter.classList.toggle('is-active', active);
      chapter.setAttribute('aria-hidden', String(!active));
      chapter.inert = !active;
    });
    currentChapter = name;
    story.classList.toggle('is-finale', name === 'finale');
    transitionTimer = window.setTimeout(() => story.classList.remove('is-travelling'), 450);
  }

  function resetJourney() {
    story.classList.remove('is-celebrating');
    document.querySelector('.chapter--finale').classList.remove('is-celebrating');
    document.querySelector('.celebration-message').classList.remove('is-visible');
    document.querySelector('.restart-button').classList.remove('is-visible');
    document.querySelector('.celebrate-button').disabled = false;
    document.querySelector('.chapter--garden').classList.remove('has-wished');
    document.querySelector('.wish-button').disabled = false;
    document.querySelector('.shooting-star').classList.remove('is-shooting');
    document.querySelector('.constellation').classList.remove('is-visible');
    document.querySelector('.message-ribbon').classList.remove('is-visible');
    document.querySelector('.message-ribbon').textContent = '';
    document.querySelector('.gift-box').classList.remove('is-open');
    document.querySelector('.gift-open').disabled = false;
    document.querySelector('.clickable-flower').classList.remove('is-bloomed');
    document.querySelector('.flower-message').classList.remove('is-visible');
    document.querySelector('.wish-message').classList.remove('is-visible');
  }

  document.querySelectorAll('[data-go]').forEach((button) => {
    button.addEventListener('click', () => navigateTo(button.dataset.go));
  });

  document.querySelectorAll('.wonder-object').forEach((object) => {
    object.addEventListener('click', () => {
      const ribbon = document.querySelector('.message-ribbon');
      ribbon.textContent = object.dataset.message;
      ribbon.classList.add('is-visible');
      object.classList.add('is-lit');
      window.setTimeout(() => object.classList.remove('is-lit'), 900);
    });
  });

  const bookshelf = document.querySelector('.book-dialog');
  document.querySelectorAll('[data-open-books]').forEach((button) => {
    button.addEventListener('click', () => bookshelf.showModal());
  });
  document.querySelector('.dialog-close').addEventListener('click', () => bookshelf.close());
  bookshelf.addEventListener('click', (event) => {
    if (event.target === bookshelf) bookshelf.close();
  });

  document.querySelector('.clickable-flower').addEventListener('click', () => {
    document.querySelector('.clickable-flower').classList.add('is-bloomed');
    document.querySelector('.flower-message').classList.add('is-visible');
    document.querySelector('.constellation').classList.add('is-visible');
  });

  document.querySelector('.wish-button').addEventListener('click', (event) => {
    const garden = document.querySelector('.chapter--garden');
    if (garden.classList.contains('has-wished')) return;
    garden.classList.add('has-wished');
    event.currentTarget.disabled = true;
    document.querySelector('.shooting-star').classList.add('is-shooting');
    document.querySelector('.wish-message').classList.add('is-visible');
  });

  function openGift() {
    const gift = document.querySelector('.gift-box');
    if (gift.classList.contains('is-open')) return;
    gift.classList.add('is-open');
    document.querySelector('.gift-open').disabled = true;
    window.setTimeout(() => navigateTo('finale'), 1050);
  }
  document.querySelector('.gift-box').addEventListener('click', openGift);
  document.querySelector('.gift-open').addEventListener('click', openGift);

  document.querySelector('.celebrate-button').addEventListener('click', (event) => {
    if (event.currentTarget.disabled) return;
    event.currentTarget.disabled = true;
    story.classList.add('is-celebrating');
    document.querySelector('.chapter--finale').classList.add('is-celebrating');
    document.querySelector('.celebration-message').classList.add('is-visible');
    document.querySelector('.restart-button').classList.add('is-visible');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && bookshelf.open) bookshelf.close();
  });
  Object.defineProperty(window, 'fairyTaleChapter', { get: () => currentChapter });
})();
