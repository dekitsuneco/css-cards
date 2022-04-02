// @ts-check

/** @type {(str: String) => ChildNode} */
const makeElementFrom = (str) => {
  /** @type {HTMLDivElement} */
  const wrapper = document.createElement('div');
  wrapper.innerHTML = str.trim();

  return wrapper.firstChild;
};

export default makeElementFrom;
