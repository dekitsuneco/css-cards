// @ts-check

/** @type {(str: string) => ChildNode} */
const makeElementFrom = (str) => {
  /** @type {HTMLDivElement} */
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str.trim();

  return wrapper.firstChild;
};

/* const cardTemplate = `
  <article class="card">
    <header class="card__header header">
      <p class="header__date">${date}</p>
      <h2 class="header__name">${organization}</h2>
    </header>

    <div class="card__organization organization">
      <a href="#" class="organization__logo">
        <img src="${logo}" alt="Logo.">
      </a>
      <svg class="half-circle" viewBox="0 0 106 57">
        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
      </svg>

      <div class="organization__leader">
        <div class="organization__leader-prefix">${prefix}</div>
        ${name}
      </div>
    </div>

    <div class="card__tags">
      <a href="#">${tags[0]}</a>
      <a href="#">${tags[1]}</a>
      <a href="#">${tags[2]}</a>
    </div>
  </article>`; */

/** @type {String|URL} */
const cardsDataUrl = './src/data/cards.json';

fetch(cardsDataUrl.toString())
  .then((response) => response.json())
  .then((data) => data.cards[0])
  .then((cardInfo) => {
    const {
      id,
      date,
      organization,
      logo,
      leader: {
        prefix,
        name,
      },
      tags,
    } = cardInfo;

    const card = document.createElement('div');
    card.classList.add('card');

    const header = makeElementFrom(`
      <header class="card__header header">
        <p class="header__date">${date}</p>
        <h2 class="header__name">${organization}</h2>
      </header>
    `);

    const organizationSection = makeElementFrom(`
      <div class="card__organization organization">
        <a href="#" class="organization__logo">
          <img src="${logo}" alt="Logo.">
        </a>
        <svg class="half-circle" viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>

        <div class="organization__leader">
          <div class="organization__leader-prefix">${prefix}</div>
          ${name}
        </div>
      </div>
    `);

    const tagsWrapper = makeElementFrom('<div class="card__tags"></div>');
    tags.forEach((title) => {
      const tag = makeElementFrom(`<a href="#">${title}</a>`);
      tagsWrapper.appendChild(tag);
    });

    [header, organizationSection, tagsWrapper].forEach((section) => card.appendChild(section));
    document.querySelector('.card-list').appendChild(card);
  });
