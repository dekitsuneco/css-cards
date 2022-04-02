// @ts-check

/** @type {(str: String) => ChildNode} */
const makeElementFrom = (str) => {
  /** @type {HTMLDivElement} */
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str.trim();

  return wrapper.firstChild;
};

/** @type {(cardInfo: Object) => HTMLElement} */
const makeCardFrom = (cardInfo) => {
/** @type {Object} */
  const {
    date,
    organization,
    logo,
    leader: {
      prefix,
      name,
    },
    tags,
  } = cardInfo;

  /** @type {HTMLElement} */
  const card = document.createElement('article');
  card.classList.add('card');

  const header = /** @type {HTMLElement} */ (makeElementFrom(`
    <header class="card__header header">
      <p class="header__date">${date}</p>
      <h2 class="header__name">${organization}</h2>
    </header>
  `));

  const organizationSection = /** @type {HTMLElement} */ (makeElementFrom(`
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
  `));

  const tagsWrapper = /** @type {HTMLDivElement} */ (makeElementFrom('<div class="card__tags"></div>'));
  tags.forEach((/** @type {String} */ title) => {
    const tag = /** @type {HTMLAnchorElement} */ (makeElementFrom(`<a href="#">${title}</a>`));
    tagsWrapper.appendChild(tag);
  });

  [header, organizationSection, tagsWrapper].forEach((section) => card.appendChild(section));

  return card;
};

/** @type {String|URL} */
const cardsDataUrl = './src/data/cards.json';

fetch(cardsDataUrl.toString())
  .then((response) => response.json())
  .then((data) => data.cards.map((/** @type {Array} */ cardInfo) => makeCardFrom(cardInfo)))
  .then((cards) => {
    /** @type {HTMLDivElement} */
    const container = document.querySelector('.card-list');

    cards.forEach((/** @type {HTMLElement} */ card) => {
      container.appendChild(card);
    });
  });
