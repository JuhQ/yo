'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var nativeSlice = Array.prototype.slice;

  var Yo = function () {
    function Yo() {
      var _this = this;

      _classCallCheck(this, Yo);

      var privatePipe = function privatePipe(funcs, args) {
        return _this.reduce(_this.rest(funcs), _this.callFunctor, _this.first(funcs).apply(undefined, _toConsumableArray(args)));
      };

      this.uppercase = function (str) {
        return str.toUpperCase();
      };
      this.lowercase = function (str) {
        return str.toLowerCase();
      };
      this.capitalize = function (str) {
        return _this.uppercase(_this.first(str)) + _this.lowercase(_this.rest(str));
      };

      this.pipe = function () {
        for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
          funcs[_key] = arguments[_key];
        }

        return function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return privatePipe(funcs, args);
        };
      };

      this.pipeRight = function () {
        for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          funcs[_key3] = arguments[_key3];
        }

        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return privatePipe(_this.reverse(funcs), args);
        };
      };

      this.arrayToObject = function (arr) {
        var value = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
        return _this.reduce(arr, function (obj, key) {
          return _this.extend({}, obj, _defineProperty({}, key, value));
        }, {});
      };

      this.callFunctor = function (val, fn) {
        return fn(val);
      };

      this.negate = function (fn) {
        return function () {
          return !fn.apply(undefined, arguments);
        };
      };
      this.flip = function (fn) {
        return function () {
          for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return fn(_this.reverse(args));
        };
      };
      this.toArray = function () {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return _this.flatten(args);
      };
      this.noop = function () {};
      this.passthru = function (args) {
        return args;
      };

      var sum = function sum() {
        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        return _this.reduce(args, function (initial, n) {
          return initial + n;
        }, 0);
      };
      var add = function add(a, b) {
        return a + b;
      };
      var subtract = function subtract(a, b) {
        return a - b;
      };
      var multiply = function multiply(a, b) {
        return a * b;
      };
      var divide = function divide(a, b) {
        return a / b;
      };
      var mean = function mean() {
        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        return divide(_this.reduce(args, add, 0), args.length);
      };

      this.mixin({
        sum: sum,
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        mean: mean
      });
    }

    _createClass(Yo, [{
      key: 'mixin',
      value: function mixin(obj) {
        var overwrite = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        for (var key in obj) {
          if (overwrite && this[key]) {
            continue;
          }

          this[key] = obj[key];
        }
      }
    }, {
      key: 'isUndefined',
      value: function isUndefined(val) {
        return val === void 0;
      }
    }, {
      key: 'isString',
      value: function isString(val) {
        return typeof val === 'string';
      }
    }, {
      key: 'isObject',
      value: function isObject(val) {
        return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.constructor !== Array;
      }
    }, {
      key: 'isFunction',
      value: function isFunction(val) {
        return typeof val === 'function';
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty(val) {
        return this.isUndefined(val) || val === 0 || this.size(val) === 0;
      }
    }, {
      key: 'isFinite',
      value: function isFinite(n) {
        return this.isNumber(n) && Number.isFinite(n);
      }
    }, {
      key: 'isPositive',
      value: function isPositive(n) {
        return this.isFinite(n) && n > 0;
      }
    }, {
      key: 'isNegative',
      value: function isNegative(n) {
        return this.isFinite(n) && n < 0;
      }
    }, {
      key: 'isNumber',
      value: function isNumber(val) {
        return typeof val === 'number' && val.constructor === Number;
      }
    }, {
      key: 'isArray',
      value: function isArray(val) {
        return val && val.constructor === Array;
      }
    }, {
      key: 'isEqual',
      value: function isEqual(a, b) {
        var _this2 = this;

        if (a === b) {
          return true;
        }

        if (this.isArray(a) && this.isArray(b)) {
          if (a.length !== b.length) {
            return false;
          }

          return this.every(this.map(a, function (value, i) {
            return value === b[i];
          }));
        }

        if (this.isObject(a) && this.isObject(b)) {
          var _ret = function () {
            if (_this2.size(a) !== _this2.size(b)) {
              return {
                v: false
              };
            }

            var aKeys = _this2.keys(a);
            var bKeys = _this2.keys(b);

            return {
              v: _this2.every(_this2.map(aKeys, function (value, i) {
                return value === bKeys[i] && _this2.isEqual(a[value], b[value]);
              }))
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        return false;
      }
    }, {
      key: 'flatten',
      value: function flatten(arr) {
        var _this3 = this;

        if (this.isEmpty(arr)) {
          return [];
        }

        return this.reduce(arr, function (a, b) {
          return a.concat(_this3.isArray(b) ? _this3.flatten(b) : b);
        }, []);
      }
    }, {
      key: 'error',
      value: function error(str) {
        throw new Error(str);
      }
    }, {
      key: 'every',
      value: function every(arr) {
        var _this4 = this;

        return this.reduce(arr, function (bool, item) {
          var result = bool;

          // Not sure if support for functions should be implemented
          if (_this4.isFunction(item)) {
            result = item();
          }

          if (!item) {
            result = false;
          }
          return result;
        }, true);
      }
    }, {
      key: 'some',
      value: function some(arr) {
        var _this5 = this;

        return this.reduce(arr, function (bool, item) {
          var result = bool;

          // Not sure if support for functions should be implemented
          if (_this5.isFunction(item)) {
            result = item();
          }

          if (item) {
            result = true;
          }
          return result;
        }, false);
      }
    }, {
      key: 'random',
      value: function random() {
        var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

        if (!this.isNumber(min) || !this.isNumber(max)) {
          this.error('No numbers provided');
        }

        return Math.floor(Math.random() * (max - min + 1) + min);
      }
    }, {
      key: '$',
      value: function $(selector, context) {
        var element = void 0;
        var ctx = context; // damn eslint

        if (typeof document === 'undefined') {
          this.error('document object not found, are you in node?');
        }

        if (this.isUndefined(selector)) {
          this.error('No selector provided');
        }

        if (this.isObject(selector) || this.isArray(selector)) {
          element = selector;
        } else {
          var isClass = selector.match(/^\.[\w\d]/);
          var isId = selector.match(/^#[\w\d]/);

          if (this.isString(ctx)) {
            ctx = this.$(ctx);
          }

          ctx = ctx || document;

          if (ctx.querySelectorAll) {
            if (isId) {
              element = ctx.querySelector(selector);
            } else {
              element = ctx.querySelectorAll(selector);
            }
          } else {
            if (isClass) {
              element = ctx.getElementsByClassName(selector.replace('.', ''));
            } else if (isId) {
              element = ctx.getElementById(selector.replace('#', ''));
            }
          }
        }

        return element;
      }
    }, {
      key: 'keys',
      value: function keys(obj) {
        if (obj === this) {
          var _keys = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
          return this.filter(_keys, function (key) {
            return key !== 'constructor';
          });
        }

        var keys = [];
        for (var prop in obj) {
          keys.push(prop);
        }
        return keys;
      }
    }, {
      key: 'range',
      value: function range(n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
          arr.push(i);
        }
        return arr;
      }
    }, {
      key: 'times',
      value: function times(n) {
        return this.range(n);
      }
    }, {
      key: 'curry',
      value: function curry() {
        var _this6 = this;

        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        var slicedArgs = nativeSlice.call(args, 1);
        var fn = this.first(slicedArgs);

        return function () {
          for (var _len10 = arguments.length, newSetOfArgs = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
            newSetOfArgs[_key10] = arguments[_key10];
          }

          var newArgs = nativeSlice.call(newSetOfArgs);
          return fn.apply(_this6, slicedArgs.concat(newArgs));
        };
      }
    }, {
      key: 'map',
      value: function map(arr, callback) {
        if (!this.isArray(arr)) {
          return [arr];
        }

        if (this.isFunction(arr.map)) {
          return arr.map(callback);
        }

        var result = [];
        this.each(arr, function (data, i) {
          result.push(callback(data, i, arr));
        });

        return result;
      }
    }, {
      key: 'each',
      value: function each(arr, callback) {
        if (this.isFunction(arr.forEach)) {
          return arr.forEach(callback);
        }

        for (var i = 0; i < arr.length; ++i) {
          callback(arr[i], i, arr);
        }

        return arr;
      }
    }, {
      key: 'extend',
      value: function extend() {
        for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          args[_key11] = arguments[_key11];
        }

        /* eslint-disable no-param-reassign */
        return this.reduce(args, function (initial, arg) {
          for (var prop in arg) {
            initial[prop] = arg[prop];
          }

          return initial;
        }, {});
        /* eslint-disable no-param-reassign */
      }
    }, {
      key: 'css',
      value: function css(selector, attr) {
        var _this7 = this;

        var elements = this.$(selector);

        var setStyle = function setStyle(element) {
          var e = element; // damn eslint
          _this7.each(_this7.keys(attr), function (prop) {
            e.style[prop] = attr[prop];
          });
        };

        if (elements.length) {
          this.each(elements, setStyle);
        } else {
          setStyle(elements);
        }
      }
    }, {
      key: 'isPalindrome',
      value: function isPalindrome(str) {
        if (!this.isString(str)) {
          return false;
        }
        if (!str || str.length < 2) {
          return true;
        }

        var word = this.lowercase(str).replace(/[\W_]/g, '');

        return word === this.reverse(word);
      }
    }, {
      key: 'fibonacci',
      value: function fibonacci() {
        var n = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

        if (n < 1) {
          return 0;
        }

        if (n <= 2) {
          return 1;
        }

        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
      }
    }, {
      key: 'fizzbuzz',
      value: function fizzbuzz() {
        return this.chain(this.range(101)).rest().map(function (i) {
          var fizz = 'Fizz';
          var buzz = 'Buzz';
          var three = i % 3 === 0;
          var five = i % 5 === 0;

          if (three && five) {
            return fizz + buzz;
          } else if (three) {
            return fizz;
          } else if (five) {
            return buzz;
          }

          return i;
        }).value();
      }
    }, {
      key: 'smallFizzbuzz',
      value: function smallFizzbuzz() {
        /* eslint-disable */
        var i = 0;for (; 100 > i++;) {
          console.log((i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i);
        } /* eslint-enable */
      }
    }, {
      key: 'reduce',
      value: function reduce(arr, callback, initialValue) {
        var result = void 0;
        if (this.isUndefined(arr)) {
          this.error('No array given');
        }

        if (this.isFunction(arr.reduce)) {
          return arr.reduce(callback, initialValue);
        }

        this.each(arr, function (value) {
          result = callback(initialValue, value, arr);
        });

        return result;
      }
    }, {
      key: 'listMethods',
      value: function listMethods(func) {
        var _this8 = this;

        return this.filter(this.keys(func || this), function (method) {
          return !_this8.isFunction(method);
        });
      }
    }, {
      key: 'reservedWords',
      value: function reservedWords() {
        return ['abstract', 'else', 'instanceof', 'super', 'boolean', 'enum', 'int', 'switch', 'break', 'export', 'interface', 'synchronized', 'byte', 'extends', 'let', 'this', 'case', 'false', 'long', 'throw', 'catch', 'final', 'native', 'throws', 'char', 'finally', 'new', 'transient', 'class', 'float', 'null', 'true', 'const', 'for', 'package', 'try', 'continue', 'function', 'private', 'typeof', 'debugger', 'goto', 'protected', 'var', 'default', 'if', 'public', 'void', 'delete', 'implements', 'return', 'volatile', 'do', 'import', 'short', 'while', 'double', 'in', 'static', 'with'];
      }
    }, {
      key: 'find',
      value: function find(arr, item, useBinarySearch) {
        var result = void 0;

        if (useBinarySearch) {
          return this.binarySearch(arr, item);
        }

        if (this.isFunction(arr.find)) {
          return arr.find(this.isFunction(item) ? item : function (value) {
            return value === item;
          });
        }

        for (var i = arr.length - 1; i >= 0; i--) {
          if (this.isFunction(item) ? item(arr[i]) : arr[i] === item) {
            result = arr[i];
            break;
          }
        }

        return result;
      }
    }, {
      key: 'findKey',
      value: function findKey(obj, item) {
        return obj[item] || false;
      }
    }, {
      key: 'pick',
      value: function pick(arr, query) {
        var _this9 = this;

        return this.reduce(arr, function (value, item) {
          for (var prop in query) {
            if (item[prop] && _this9.isEqual(item[prop], query[prop])) {
              value.push(item);
            }
          }

          return value;
        }, []);
      }
    }, {
      key: 'binarySearch',
      value: function binarySearch(arr, value) {
        var search = function search(start, end) {
          if (start > end) {
            return null;
          }
          if (arr[start] === value) {
            return start;
          }
          if (arr[end] === value) {
            return end;
          }

          var middle = Math.floor((start + end) / 2);
          var middleValue = arr[middle];

          if (middleValue === value) {
            return middleValue;
          } else if (middleValue > value) {
            return search(start + 1, middle);
          } else if (middleValue < value) {
            return search(middle, end - 1);
          }

          return null;
        };

        return search(0, this.size(arr) - 1);
      }
    }, {
      key: 'size',
      value: function size(val) {
        if (this.isString(val) || this.isArray(val)) {
          return val.length;
        } else if (this.isObject(val)) {
          return this.size(this.keys(val));
        }
        return this.error('this.size only accepts: arrays, strings, objects');
      }
    }, {
      key: 'length',
      value: function length(val) {
        return this.size(val);
      }
    }, {
      key: 'wordCount',
      value: function wordCount(str) {
        var words = this.isFunction(str) ? str() : str;
        return this.size(words.split(' '));
      }
    }, {
      key: 'validateMethodNames',
      value: function validateMethodNames(func) {
        var _this10 = this;

        var invalidMethodNames = this.reduce(this.listMethods(func), function (value, method) {
          var match = _this10.findKey(_this10.arrayToObject(_this10.reservedWords()), method);
          if (match) {
            value.push(match);
          }

          return value;
        }, []);

        return this.size(invalidMethodNames) ? invalidMethodNames : true;
      }
    }, {
      key: 'reverse',
      value: function reverse(val) {
        if (this.isString(val)) {
          return this.reverse(val.split('')).join('');
        }

        return val.reverse();
      }
    }, {
      key: 'first',
      value: function first(arr) {
        return arr[0];
      }
    }, {
      key: 'last',
      value: function last(arr) {
        return arr[arr.length - 1];
      }
    }, {
      key: 'rest',
      value: function rest(arg) {
        var value = this.slice(arg, 1);
        if (this.isString(arg)) {
          return value.join('');
        }

        return value;
      }
    }, {
      key: 'head',
      value: function head(arr) {
        return this.first(arr);
      }
    }, {
      key: 'tail',
      value: function tail(arr) {
        return this.rest(arr);
      }
    }, {
      key: 'slice',
      value: function slice(arr, start, end) {
        var noEndInSight = end;
        if (this.isUndefined(end)) {
          noEndInSight = this.size(arr);
        }

        return nativeSlice.call(arr, start, noEndInSight);
      }
    }, {
      key: 'drop',
      value: function drop(arr, n) {
        return arr.slice(n);
      }
    }, {
      key: 'dropRight',
      value: function dropRight(arr, n) {
        if (n > arr.length - 1) {
          return [];
        }
        return this.slize(arr, 0, arr.length - n);
      }
    }, {
      key: 'nth',
      value: function nth(arr, n) {
        return arr[n];
      }
    }, {
      key: 'nthArg',
      value: function nthArg(n) {
        var _this11 = this;

        return function () {
          for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
            args[_key12] = arguments[_key12];
          }

          return _this11.nth(args, n);
        };
      }
    }, {
      key: 'min',
      value: function min() {
        for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        return Math.min.apply(null, this.flatten(args));
      }
    }, {
      key: 'max',
      value: function max() {
        for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          args[_key14] = arguments[_key14];
        }

        return Math.max.apply(null, this.flatten(args));
      }
    }, {
      key: 'gt',
      value: function gt(a, b) {
        return a > b;
      }
    }, {
      key: 'gte',
      value: function gte(a, b) {
        return a >= b;
      }
    }, {
      key: 'lt',
      value: function lt(a, b) {
        return a < b;
      }
    }, {
      key: 'lte',
      value: function lte(a, b) {
        return a <= b;
      }
    }, {
      key: 'indexOf',
      value: function indexOf(arr, value, fromIndex) {
        return (fromIndex ? this.slice(arr, fromIndex) : arr).indexOf(value);
      }
    }, {
      key: 'filter',
      value: function filter(arr, callback) {
        if (this.isUndefined(arr)) {
          return [];
        }

        if (this.isFunction(arr.filter)) {
          return arr.filter(callback);
        }

        return this.reduce(arr, function (value, item) {
          if (callback(item)) {
            value.push(item);
          }
          return value;
        }, []);
      }
    }, {
      key: 'reject',
      value: function reject(arr, callback) {
        if (this.isUndefined(arr)) {
          return [];
        }

        if (this.isFunction(arr.filter)) {
          return arr.filter(callback);
        }

        return this.reduce(arr, function (value, item) {
          if (!callback(item)) {
            value.push(item);
          }
          return value;
        }, []);
      }
    }, {
      key: 'lastOfTheLastOfTheLast',
      value: function lastOfTheLastOfTheLast(arr) {
        var lastItem = this.first(this.reverse(arr));

        if (this.isArray(lastItem) && this.size(lastItem)) {
          return this.lastOfTheLastOfTheLast(lastItem);
        }

        return lastItem;
      }
    }, {
      key: 'chain',
      value: function chain(data) {
        var _this12 = this;

        var result = data;
        return {
          filter: function filter(callback) {
            result = _this12.filter(result, callback);
            return _this12;
          },
          reject: function reject(callback) {
            result = _this12.reject(result, callback);
            return _this12;
          },
          map: function map(callback) {
            result = _this12.map(result, callback);
            return _this12;
          },
          reduce: function reduce(callback, initialValue) {
            result = _this12.reduce(result, callback, initialValue);
            return _this12;
          },
          find: function find(callback, useBinarySearch) {
            result = _this12.find(result, callback, useBinarySearch);
            return _this12;
          },
          findKey: function findKey(callback) {
            result = _this12.findKey(result, callback);
            return _this12;
          },
          pick: function pick(callback) {
            result = _this12.pick(result, callback);
            return _this12;
          },
          flatten: function flatten() {
            result = _this12.flatten(result);
            return _this12;
          },
          first: function first() {
            result = _this12.first(result);
            return _this12;
          },
          reverse: function reverse() {
            result = _this12.reverse(result);
            return _this12;
          },
          rest: function rest() {
            result = _this12.rest(result);
            return _this12;
          },
          drop: function drop(n) {
            result = _this12.drop(result, n);
            return _this12;
          },
          dropRight: function dropRight(n) {
            result = _this12.dropRight(result, n);
            return _this12;
          },
          value: function value() {
            return result;
          }
        };
      }
    }, {
      key: 'lazyChain',
      value: function lazyChain(data) {
        var _this13 = this;

        var result = data;
        var actions = [];
        var buildData = function buildData() {
          _this13.each(actions, function (_ref) {
            var action = _ref.action;
            var callback = _ref.callback;

            result = _this13[action](result, callback, result.attributes);
          });
          return result;
        };

        return {
          filter: function filter(callback) {
            actions.push({ action: 'filter', callback: callback });
            return _this13;
          },
          reject: function reject(callback) {
            actions.push({ action: 'reject', callback: callback });
            return _this13;
          },
          map: function map(callback) {
            actions.push({ action: 'map', callback: callback });
            return _this13;
          },
          reduce: function reduce(callback, initialValue) {
            actions.push({ action: 'reduce', callback: callback, attributes: initialValue });
            return _this13;
          },
          find: function find(callback, useBinarySearch) {
            actions.push({ action: 'find', callback: callback, attributes: useBinarySearch });
            return _this13;
          },
          findKey: function findKey(callback) {
            actions.push({ action: 'findKey', callback: callback });
            return _this13;
          },
          pick: function pick(callback) {
            actions.push({ action: 'pick', callback: callback });
            return _this13;
          },
          flatten: function flatten() {
            actions.push({ action: 'flatten' });
            return _this13;
          },
          first: function first() {
            actions.push({ action: 'first' });
            return _this13;
          },
          reverse: function reverse() {
            actions.push({ action: 'reverse' });
            return _this13;
          },
          rest: function rest() {
            actions.push({ action: 'rest' });
            return _this13;
          },
          drop: function drop(n) {
            actions.push({ action: 'drop', callback: n });
            return _this13;
          },
          dropRight: function dropRight(n) {
            actions.push({ action: 'dropRight', callback: n });
            return _this13;
          },
          value: function value() {
            return buildData();
          }
        };
      }
    }, {
      key: 'kitten',
      value: function kitten() {
        var _this14 = this;

        this.each(this.times(this.random(5, 20)), function () {
          var greenOrRed = _this14.random() ? 'green' : 'red';
          var orangeOrBlue = _this14.random() ? 'orange' : 'blue';
          var meowOrPurr = _this14.random() ? 'meow' : 'purrr';
          var color = _this14.random() ? greenOrRed : orangeOrBlue;
          var meow = function meow() {
            return meowOrPurr;
          };
          var allTheMeows = _this14.map(_this14.times(_this14.random(1, _this14.random(2, 4))), meow).join(' ');
          console.log('%c' + allTheMeows, 'color: ' + color);
        });
      }
    }, {
      key: 'Promise',
      value: function Promise(fn) {
        var then = function then(onResolved, onRejected) {
          var done = false;
          var resolve = function resolve(value) {
            if (done) {
              return;
            }
            done = true;
            onResolved(value);
          };

          var reject = function reject(val) {
            if (done) {
              return;
            }
            done = true;
            onRejected(val);
          };

          try {
            fn(resolve, reject);
          } catch (error) {
            reject(error);
          }
        };

        return { then: then };
      }
    }, {
      key: 'exportModule',
      value: function exportModule(name, func) {
        if (typeof module !== 'undefined' && module.exports) {
          module.exports = func;
        }

        if (typeof window !== 'undefined') {
          window[name] = func;
        }

        if (typeof define !== 'undefined' && typeof define === 'function' && define.amd) {
          define([name], func);
        }
      }
    }]);

    return Yo;
  }();

  var yo = new Yo();
  yo.exportModule('yo', yo);

  var validatedMethodNames = yo.validateMethodNames();
  if (validatedMethodNames !== true) {
    yo.error('Invalid method names in yo library!\n      Invalid method names: ' + validatedMethodNames.join(', '));
  }
})();