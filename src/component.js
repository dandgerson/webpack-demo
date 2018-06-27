'use strict';

export default (text = 'Hello Aqua Lord!') => {
  const element = document.createElement('div');

  element.classList.add('pure-button');
  element.classList.add('foo');
  element.innerHTML = text;

  return element;
};