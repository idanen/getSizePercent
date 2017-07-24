(function (window) {
  window.getSizePercent = getSizePercent;

  function getSizePercent({ selector, property } = {}) {
    const pseudoPattern = /(::?(?:before|after))$/.exec(selector);
    const pseudo = pseudoPattern ? pseudoPattern[1] : '';

    const element = document.querySelector(selector.replace(/::?(?:before|after)/, ''));

    if (pseudo) {
      const origDisplay = element.style.display;
      element.style.display = 'none';
      const pseudoSizeWithUnits = window.getComputedStyle(element, pseudo).getPropertyValue(property);
      element.style.display = origDisplay;

      return pseudoSizeWithUnits;
    }

    const parent = element.parentNode;
    const parentDisplay = parent.style.display;
    parent.style.display = 'none';
    const sizeWithUnits = window.getComputedStyle(element).getPropertyValue(property);
    parent.style.display = parentDisplay;

    return sizeWithUnits;
  }
}(window));
