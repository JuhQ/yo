(function() {
  'use strict';

  var yo = function() {};

  yo.prototype.isUndefined = function(val) {
    return val === void 0;
  };

  yo.prototype.isString = function(val) {
    return typeof val === 'string'
  };

  yo.prototype.isObject = function(val) {
    return typeof val === 'object'
  };

  yo.prototype.isFunction = function(val) {
    return typeof val === 'function'
  };

  yo.prototype.isArray = function(val) {
    return val && yo.isObject(val) && val.constructor === Array;
  };

  yo.prototype.flatten = function(arr) {
    return yo.reduce(arr, function(a, b) {
      return a.concat(b);
    }, []);
  };

  yo.prototype.$ = function(selector, context) {
    var element;

    if(typeof document === 'undefined') {
      throw new Error('document object not found, are you in node?')
    }

    context = context || document;

    if(yo.isObject(selector) || yo.isArray(selector)) {
      element = selector;
    } else {

      var isClass = selector.match(/^\.[\w\d]/);
      var isId = selector.match(/^\#[\w\d]/);

      if(context.querySelectorAll) {
        if(isId) {
          element = context.querySelector(selector);
        } else {
          element = context.querySelectorAll(selector);
        }
      } else {
        if(isClass) {
          element = context.getElementsByClassName(selector.replace('.', ''));
        } else if(isId) {
          element = context.getElementById(selector.replace('#', ''));
        }
      }
    }

    return element;
  };

  yo.prototype.keys = function(obj) {
    var keys = [];
    for(var prop in obj) {
      keys.push(prop);
    }
    return keys;
  };

  yo.prototype.map = function(arr, callback) {
    if(!yo.isArray(arr)) {
      throw new Error('No array given');
    }

    if(yo.isFunction(arr.map)) {
      return arr.map(callback);
    }

    var result = [];
    yo.each(arr, function(data) {
      result.push(callback(data));
    });

    return result;
  };

  yo.prototype.each = function(arr, callback) {
    if(yo.isFunction(arr.forEach)) {
      return arr.forEach(callback);
    }

    for(var i = 0; i < arr.length; ++i) {
      callback(arr[i]);
    }
  };

  yo.prototype.extend = function(obj, val) {
    var newObj = {};

    for(var prop in obj) {
      newObj[prop] = obj[prop];
    }

    for(var prop in val) {
      newObj[prop] = val[prop];
    }

    return newObj;
  };

  yo.prototype.css = function(selector, attr) {
    var elements = yo.$(selector);

    var setStyle = function(element) {
      yo.each(yo.keys(attr), function(prop) {
        element.style[prop] = attr[prop];
      });
    };

    if(elements.length) {
      yo.each(elements, function(element) {
        setStyle(element);
      });
    } else {
      setStyle(elements)
    }
  };

  yo.prototype.isPalindrome = function(str) {
    if(!yo.isString(str)) {
      return false;
    }
    if(!str || str.length < 2) {
      return true;
    }

    var word = str.toLowerCase().replace(/[\W_]/g, '');

    return word === word.split('').reverse().join('');
  };

  yo.prototype.reduce = function(arr, callback, initialValue) {
    if(typeof arr === 'undefined') {
      throw new Error('No array given');
      return;
    }

    if(yo.isFunction(arr.reduce)) {
      return arr.reduce(callback, initialValue);
    }

    for(var i = 0; i < arr.length; ++i) {
      initialValue = callback(initialValue, arr[i]);
    }

    return initialValue;
  };


  yo = new yo;


  if(typeof module !== 'undefined' && module.exports) {
    module.exports = yo;
  }

  if(typeof window !== 'undefined') {
    window.yo = yo;
  }

  if (typeof define === 'function' && define.amd) {
    define(['yo'], yo);
  }

})();