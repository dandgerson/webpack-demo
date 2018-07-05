'use strict';

import lazy from './lazy';

export default (text = 'Hell of Aqua Lord!') => {
  const element = document.createElement('div');

  element.classList.add('pure-button');
  element.classList.add('foo');
  element.innerHTML = text;

  element.onclick = () =>
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default;
      })
      .catch(err => {
        console.error(err);
      });

  return element;
};