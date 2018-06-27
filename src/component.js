'use strict';

export default (text = 'Hello Aqua world!') => {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
};