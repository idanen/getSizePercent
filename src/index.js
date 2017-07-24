(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.getSizePercent = factory();
  }
}(this, function () {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return getSizePercent;

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
}));
