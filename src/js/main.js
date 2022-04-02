/* eslint-disable import/extensions */
// @ts-check

import makeElementFrom from './modules/makeElementFrom.js';
import makeCardFrom from './modules/makeCardFrom.js';

/** @type {String|URL} */
const cardsDataUrl = './src/data/cards.json';

fetch(cardsDataUrl.toString())
  .then((response) => response.json())
  .then((data) => data.cards)
  .then((cards) => cards.map(
    (/** @type {Array} */ cardInfo) => makeCardFrom(cardInfo, makeElementFrom),
  ))
  .then((cards) => {
    /** @type {HTMLDivElement} */
    const container = document.querySelector('.card-list');

    cards.forEach((/** @type {HTMLElement} */ card) => {
      container.appendChild(card);
    });
  });
