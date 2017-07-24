var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.getSizePercent = factory();
    }
})(this, function () {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return getSizePercent;

    function getSizePercent() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            selector = _ref.selector,
            property = _ref.property;

        var pseudoPattern = /(::?(?:before|after))$/.exec(selector);
        var pseudo = pseudoPattern ? pseudoPattern[1] : '';

        var element = document.querySelector(selector.replace(/::?(?:before|after)/, ''));

        if (pseudo) {
            var origDisplay = element.style.display;
            element.style.display = 'none';
            var pseudoSizeWithUnits = window.getComputedStyle(element, pseudo).getPropertyValue(property);
            element.style.display = origDisplay;

            return pseudoSizeWithUnits;
        }

        var parent = element.parentNode;
        var parentDisplay = parent.style.display;
        parent.style.display = 'none';
        var sizeWithUnits = window.getComputedStyle(element).getPropertyValue(property);
        parent.style.display = parentDisplay;

        return sizeWithUnits;
    }
});