(function (window) {
  window.getSizePercent = getSizePercent;

  function getSizePercent({ selector, property } = {}) {
    const pseudoPattern = /(::?(?:before|after))$/.exec(selector);
    const pseudo = pseudoPattern ? pseudoPattern[1] : '';

    const element = document.querySelector(selector.replace(/::?(?:before|after)/, ''));

    const sizeWithUnits = window.getComputedStyle(element).getPropertyValue(property);
    const size = parseInt(sizeWithUnits, 10);
    console.log(`parent size: ${size}`);
    if (pseudo) {
      console.log('pseudo:', pseudo);
      const pseudoSizeWithUnits = window.getComputedStyle(element, pseudo).getPropertyValue(property);
      console.log(pseudoSizeWithUnits);
      const pseudoSize = parseInt(pseudoSizeWithUnits, 10);
      console.log(`pseudo size: ${pseudoSize}`);
      const rounded = Math.round((pseudoSize / size) * 100);

      return `${rounded}%`;
    }

    const parent = element.parentNode;
    const parentSizeWithUnits = window.getComputedStyle(parent).getPropertyValue(property);
    const parentSize = parseInt(parentSizeWithUnits, 10);
    const rounded = Math.round((size / parentSize) * 100);

    return `${rounded}%`;
  }
}(window));
