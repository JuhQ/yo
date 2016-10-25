(() => {
  const nativeSlice = Array.prototype.slice;

  class Yo {
    constructor() {
      let uniqueIdValue = 0;

      const reduce = (arr, callback, initialValue) => {
        let result;
        if (this.isUndefined(arr)) {
          this.error('No array given');
        }

        if (this.isFunction(arr.reduce)) {
          return arr.reduce(callback, initialValue);
        }

        this.each(arr, (value) => {
          result = callback(initialValue, value, arr);
        });

        return result;
      };

      const reduceRight = (arr, callback, initialValue) =>
        reduce(this.reverse(arr), callback, initialValue);

      const privatePipe = (funcs, args) =>
        reduce(this.rest(funcs), this.callFunctor, this.first(funcs)(...args));

      this.uppercase = (str) => str.toUpperCase();
      this.lowercase = (str) => str.toLowerCase();
      this.capitalize = (str) =>
        this.uppercase(this.first(str)) + this.lowercase(this.rest(str));

      this.pipe = (...funcs) =>
        (...args) => privatePipe(funcs, args);

      this.pipeRight = (...funcs) =>
        (...args) => privatePipe(this.reverse(funcs), args);

      this.arrayToObject = (arr, value = true) => reduce(arr, (obj, key) =>
        this.extend({}, obj, {[key]: value})
      , {});

      this.always = () => true;
      this.never = () => false;
      this.callFunctor = (val, fn) => fn(val);
      this.negate = (fn) => (...args) => !fn(...args);
      this.flip = (fn) => (...args) => fn(this.reverse(args));
      this.toArray = (...args) => this.flatten(args);
      this.passthru = (arg) => arg;
      this.now = () => new Date();

      const times = (n, iteratee) =>
        (iteratee ? this.map(this.range(n), iteratee) : this.range(n));
      const add = (a, b) => a + b;
      const addSelf = (a) => a + a;
      const subtract = (a, b) => a - b;
      const multiply = (a, b) => a * b;
      const divide = (a, b) => a / b;
      const sum = (...args) => reduce(this.flatten(args), add, 0);
      const mean = (...args) => divide(sum(...args), args.length);
      const factorial = (n) => reduce(this.rest(times(n + 1)), multiply, 1);
      const isEven = (n) => n % 2 === 0;
      const isOdd = (n) => !isEven(n);

      // TODO: add test
      const debounce = (fn, delay = 0) => {
        let timeout;

        return (...args) => {
          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(() => {
            timeout = null;
            fn(...args);
          }, delay);
        };
      };

      // TODO: add test
      const throttle = (fn, delay = 0) => {
        let wait = false;

        return (...args) => {
          if (wait) {
            return;
          }
          wait = true;

          setTimeout(() => {
            wait = false;
            fn(...args);
          }, delay);
        };
      };

      const isFalsey = (arg) => !arg;
      const isTruthy = (arg) => !isFalsey(arg);
      const compact = (arr) => this.filter(arr, isTruthy);

      const matches = (obj, props) =>
        isTruthy(this.find(this.keys(obj), (key) => obj[key] === props[key]));

      const where = (arr, props) =>
        this.filter(arr, (entry) => matches(entry, props));

      const chunk = (arr, size) => {
        const chunks = Math.ceil(arr.length / size);
        return times(chunks, (i) =>
          this.slice(arr, (i * size), (i * size + size)));
      };

      const merge = (a, b) => [].concat(a, b);
      const clone = (a) => [...a];
      const mergeAndSort = (a, b) => merge(a, b).sort((c, d) => c - d);
      const duplicate = (arr) => merge(arr, arr);

      const findLargestSubArrayBySum = (arrays) => {
        const maxes = this.map(arrays, (arr) => sum(...arr));
        const max = this.max(...maxes);
        const index = this.indexOf(maxes, max);
        return {index, item: arrays[index], value: max};
      };

      const findPairsBySum = (arr, targetValue) =>
        reduce(arr, (initial, value, key) => {
          const [filtered] = this.filter(this.drop(arr, key), (v) =>
            value + v === targetValue
          );

          if (this.isDefined(filtered)) {
            initial.push([value, filtered]);
          }

          return initial;
        }, []);

      const findDuplicates = (arr, binarySearch) =>
        reduce(arr, (initial, value, key) => {
          const [filtered] = this.filter(this.drop(arr, key + 1), (v) =>
            this.isEqual(value, v)
          );

          if (this.isDefined(filtered) && !this.find(initial, value, binarySearch)) {
            initial.push(filtered);
          }

          return initial;
        }, []);

      const skipDuplicates = (arr, binarySearch) => {
        const duplicates = findDuplicates(arr, binarySearch);

        return reduce(arr, (initial, value) => {
          const inDuplicates = this.find(duplicates, value, binarySearch);
          if (inDuplicates && !this.find(initial, value, binarySearch)) {
            initial.push(value);
          }

          if (!inDuplicates) {
            initial.push(value);
          }

          return initial;
        }, []);
      };

      const greatestCommonDivisor = (a, b) => {
        if (b === 0) {
          return a;
        }

        return greatestCommonDivisor(b, a % b);
      };

      const getTruthyValuesFromArray = (arr, callback) =>
        this.map(arr, this.isFunction(callback) ? callback : isTruthy);

      const every = (arr, callback) => {
        if (this.isFunction(arr.every)) {
          return arr.every(this.isFunction(callback) ? callback : isTruthy);
        }
        const results = getTruthyValuesFromArray(arr, callback);
        return this.size(compact(results)) === this.size(arr);
      };

      const some = (arr, callback) => {
        if (this.isFunction(arr.some)) {
          return arr.some(this.isFunction(callback) ? callback : isTruthy);
        }
        const results = getTruthyValuesFromArray(arr, callback);
        return this.size(compact(results)) > 0;
      };

      const none = (arr, callback) => {
        const results = getTruthyValuesFromArray(arr, callback);
        return this.size(compact(results)) === 0;
      };

      const uniqueId = () => uniqueIdValue++;

      this.mixin({
        reduce,
        reduceRight,
        noop: () => {},
        times,
        add,
        addSelf,
        subtract,
        multiply,
        divide,
        sum,
        mean,
        factorial,
        isEven,
        isOdd,
        debounce,
        throttle,
        matches,
        where,
        compact,
        isFalsey,
        isTruthy,
        chunk,
        merge,
        clone,
        mergeAndSort,
        duplicate,
        findLargestSubArrayBySum,
        findPairsBySum,
        findDuplicates,
        skipDuplicates,
        greatestCommonDivisor,
        every,
        some,
        none,
        uniqueId
      });
    }

    mixin(obj, overwrite = false) {
      for (const key in obj) {
        if (overwrite && this[key]) {
          continue;
        }

        this[key] = obj[key];
      }
    }

    isBoolean(val) {
      return typeof val === 'boolean';
    }
    isNull(val) {
      return val === null;
    }
    isUndefined(val) {
      return val === void 0;
    }
    isDefined(val) {
      return this.negate(this.isUndefined)(val);
    }
    isString(val) {
      return typeof val === 'string';
    }
    isObject(val) {
      return !this.isNull(val) &&
        typeof val === 'object' &&
        val instanceof Object &&
        val.constructor !== Array;
    }
    isFunction(val) {
      return typeof val === 'function';
    }
    isEmpty(val) {
      return this.isUndefined(val) || val === 0 || this.size(val) === 0;
    }
    isFinite(n) {
      return this.isNumber(n) && Number.isFinite(n);
    }
    isPositive(n) {
      return this.isFinite(n) && n > 0;
    }
    isNegative(n) {
      return this.isFinite(n) && n < 0;
    }
    isNumber(val) {
      return typeof val === 'number' && val.constructor === Number;
    }
    isArray(val) {
      return !this.isNull(val) && val &&
        (Array.isArray ? Array.isArray(val) : val.constructor === Array);
    }

    isPrime(n) {
      let divisor = 2;

      if (n <= 1) {
        return false;
      }

      while (n > divisor) {
        if (n % divisor === 0) {
          return false;
        }

        divisor++;
      }

      return true;
    }

    isEqual(a, b) {
      if (a === b) {
        return true;
      }

      if (this.isArray(a) && this.isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }

        return this.every(this.map(a, (value, i) => value === b[i]));
      }

      if (this.isObject(a) && this.isObject(b)) {
        if (this.size(a) !== this.size(b)) {
          return false;
        }

        // this doesn't have that great support
        // TODO: fallback for object comparison
        if (this.isFunction(Object.is)) {
          if (!Object.is(a, b)) {
            return false;
          }
        }

        const aKeys = this.keys(a);
        const bKeys = this.keys(b);

        return this.every(this.map(aKeys, (value, i) =>
          value === bKeys[i] && this.isEqual(a[value], b[value])
        ));
      }

      return false;
    }

    primeNumbers(n) {
      return this.filter(this.times(n + 1), this.isPrime);
    }

    flatten(arr) {
      if (this.isEmpty(arr)) {
        return [];
      }

      return this.reduce(arr, (a, b) =>
        this.merge(a, this.isArray(b) ? this.flatten(b) : b)
      , []);
    }

    error(str) {
      throw new Error(str);
    }

    random(min = 0, max = 1) {
      if (!this.isNumber(min) || !this.isNumber(max)) {
        this.error('No numbers provided');
      }

      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    memoize(fn) {
      const memo = {};

      return (...args) => {
        if (args in memo) {
          return memo[args];
        }

        memo[args] = fn(...args);
        return memo[args];
      };
    }

    $(selector, context) {
      let element;
      let ctx = context; // damn eslint

      if (typeof document === 'undefined') {
        this.error('document object not found, are you in node?');
      }

      if (this.isUndefined(selector)) {
        this.error('No selector provided');
      }

      if (this.isObject(selector) || this.isArray(selector)) {
        element = selector;
      } else {
        const isClass = selector.match(/^\.[\w\d]/);
        const isId = selector.match(/^#[\w\d]/);

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

    keys(obj) {
      if (obj === this) {
        const prototypeKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
        const ownPropertyNames = Object.getOwnPropertyNames(obj);
        const keys = this.merge(ownPropertyNames, prototypeKeys);
        return this.filter(keys, (key) => key !== 'constructor');
      }

      const keys = [];
      this.forIn(obj, (val, key) => keys.push(key));
      return keys;
    }

    values(val) {
      if (this.isObject(val)) {
        if (this.isFunction(Object.values)) {
          return Object.values(val);
        }

        const values = [];
        this.forIn(val, (v) => values.push(v));
        return values;
      }

      return val;
    }

    zipObject(a, b) {
      return this.reduce(a, (memo, val, i) =>
        this.extend(memo, {[val]: b[i]})
      , {});
    }

    invert(obj) {
      return this.zipObject(this.values(obj), this.keys(obj));
    }

    range(n) {
      const arr = [];
      for (let i = 0; i < n; i++) {
        arr.push(i);
      }
      return arr;
    }

    curry(fn) {
      const curriedFn = (...args) => {
        if (args.length < fn.length) {
          return (...newArgs) =>
            curriedFn(...args.concat(newArgs));
        }

        return fn(...args);
      };

      return curriedFn;
    }

    get(obj, path) {
      const keys = this.compact(path.split('.'));
      return this.reduce(keys, this.findKey, obj);
    }

    shuffle(arr) {
      const newArr = this.clone(arr);
      let currentIndex = newArr.length;

      while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        const temporaryValue = newArr[currentIndex];
        newArr[currentIndex] = newArr[randomIndex];
        newArr[randomIndex] = temporaryValue;
      }

      if (this.isEqual(arr, newArr)) {
        return this.shuffle(arr);
      }

      return newArr;
    }

    sample(arr) {
      return this.first(this.shuffle(arr));
    }

    map(arr, callback) {
      if (!this.isArray(arr)) {
        return [arr];
      }

      const mapStringValue = (item) => {
        if (this.first(callback) === '.') {
          return this.get(item, callback);
        }
        return callback;
      };

      if (this.isFunction(arr.map)) {
        return arr.map(this.isFunction(callback) ? callback : mapStringValue);
      }

      return this.reduce(arr, (initial, data, i) => {
        if (this.isFunction(callback)) {
          initial.push(callback(data, i, arr));
        } else {
          initial.push(mapStringValue(data));
        }
        return initial;
      }, []);
    }

    pluck(arr, prop) {
      return this.map(arr, `.${prop}`);
    }

    fill(arr, val) {
      return this.map(arr, `${val}`);
    }

    repeat(str, n) {
      return this.times(n, `${str}`).join('');
    }

    partition(arr, predicate) {
      return this.reduce(arr, (initial, val) => {
        initial[(predicate(val) ? 0 : 1)].push(val);
        return initial;
      }, [[], []]);
    }

    union(a, b) {
      return this.skipDuplicates(this.mergeAndSort(a, b));
    }

    once(fn) {
      let done = false;
      let value;
      return (...args) => {
        if (!done) {
          done = true;
          value = fn(...args);
        }
        return value;
      };
    }

    after(n, fn) {
      let counter = 0;
      return (...args) => {
        counter++;
        if (counter >= n) {
          return fn(...args);
        }
        return this.noop();
      };
    }

    before(n, fn) {
      let counter = 0;
      return (...args) => {
        if (counter < n) {
          counter++;
          return fn(...args);
        }
        return this.noop();
      };
    }

    wrap(fn, callback) {
      return (...args) => callback(fn, ...args);
    }

    each(arr, callback) {
      if (this.isFunction(arr.forEach)) {
        return arr.forEach(callback);
      }

      for (let i = 0; i < arr.length; ++i) {
        callback(arr[i], i, arr);
      }

      return arr;
    }

    forIn(obj, fn) {
      for (const key in obj) {
        fn(obj[key], key);
      }
    }

    extend(...args) {
      /* eslint-disable no-param-reassign */
      return this.reduce(args, (initial, arg) => {
        for (const prop in arg) {
          initial[prop] = arg[prop];
        }

        return initial;
      }, {});
      /* eslint-enable no-param-reassign */
    }

    css(selector, attr) {
      const elements = this.$(selector);

      const setStyle = (element) => {
        this.each(this.keys(attr), (prop) => {
          /* eslint-disable no-param-reassign */
          element.style[prop] = attr[prop];
          /* eslint-enable no-param-reassign */
        });
      };

      if (elements.length) {
        this.each(elements, setStyle);
      } else {
        setStyle(elements);
      }
    }

    isPalindrome(str) {
      if (!this.isString(str)) {
        return false;
      }
      if (!str || str.trim().length < 2) {
        return true;
      }

      const word = this.lowercase(str).trim().replace(/[\W_]/g, '');

      return word === this.reverse(word);
    }

    fibonacci(n = 0) {
      if (n < 1) {
        return 0;
      }

      if (n <= 2) {
        return 1;
      }

      return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }

    fizzbuzz() {
      return this.chain(this.range(101))
        .rest()
        .map((i) => {
          const fizz = 'Fizz';
          const buzz = 'Buzz';
          const three = i % 3 === 0;
          const five = i % 5 === 0;

          if (three && five) {
            return fizz + buzz;
          } else if (three) {
            return fizz;
          } else if (five) {
            return buzz;
          }

          return i;
        })
        .value();
    }

    smallFizzbuzz() {
      /* eslint-disable */
      let i=0;for(;100>i++;)console.log((i%3?'':'Fizz')+(i%5?'':'Buzz')||i);
      /* eslint-enable */
    }

    listMethods(func) {
      return this.filter(this.keys(func || this), (method) =>
        this.negate(this.isFunction)(method)
      );
    }

    reservedWords() {
      return [
        'abstract', 'else', 'instanceof', 'super',
        'boolean', 'enum', 'int', 'switch',
        'break', 'export', 'interface', 'synchronized',
        'byte', 'extends', 'let', 'this',
        'case', 'false', 'long', 'throw',
        'catch', 'final', 'native', 'throws',
        'char', 'finally', 'new', 'transient',
        'class', 'float', 'null', 'true',
        'const', 'for', 'package', 'try',
        'continue', 'function', 'private', 'typeof',
        'debugger', 'goto', 'protected', 'var',
        'default', 'if', 'public', 'void',
        'delete', 'implements', 'return', 'volatile',
        'do', 'import', 'short', 'while',
        'double', 'in', 'static', 'with'
      ];
    }

    find(arr, item, useBinarySearch) {
      if (useBinarySearch) {
        return arr[this.binarySearch(arr, item)];
      }

      if (this.isFunction(arr.find)) {
        return arr.find(this.isFunction(item) ? item : (value) =>
          value === item
        );
      }

      return this.reduce(arr, (result, val) => {
        if (this.isFunction(item) ? item(val) : val === item) {
          return val;
        }
        return result;
      }, undefined);
    }

    findKey(obj, item) {
      return obj[item] || false;
    }

    pick(arr, query) {
      return this.reduce(arr, (value, item) => {
        for (const prop in query) {
          if (item[prop] && this.isEqual(item[prop], query[prop])) {
            value.push(item);
          }
        }

        return value;
      }, []);
    }

    omit(arr, query) {
      return this.reduce(arr, (value, item) => {
        for (const prop in query) {
          if (!this.isEqual(item[prop], query[prop])) {
            value.push(item);
          }
        }

        return value;
      }, []);
    }

    binarySearch(arr, value) {
      const search = (start, end) => {
        if (start > end) {
          return null;
        }
        if (arr[start] === value) {
          return start;
        }
        if (arr[end] === value) {
          return end;
        }

        const middle = Math.floor((start + end) / 2);
        const middleValue = arr[middle];

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

    size(val) {
      if (this.isString(val) || this.isArray(val)) {
        return val.length;
      } else if (this.isObject(val)) {
        return this.size(this.keys(val));
      }
      return this.error('this.size only accepts: arrays, strings, objects');
    }

    length(val) {
      return this.size(val);
    }

    wordCount(str) {
      return this.size(this.words(str));
    }

    words(str) {
      return (this.isFunction(str) ? str() : str).split(' ');
    }

    validateMethodNames(func) {
      const invalidMethodNames = this.reduce(this.listMethods(func), (value, method) => {
        const match = this.findKey(this.arrayToObject(this.reservedWords()), method);
        if (match) {
          value.push(match);
        }

        return value;
      }, []);

      return this.size(invalidMethodNames) ? invalidMethodNames : true;
    }

    reverse(val) {
      if (this.isString(val)) {
        return this.reverse(val.split('')).join('');
      }

      return val.reverse();
    }

    reverseWords(val) {
      return this.reverse(this.words(val)).join(' ');
    }

    reverseInPlace(val) {
      return this.reverse(this.reverse(val.split(' ')).join(' '));
    }

    missingNumber(arr) {
      const n = arr.length + 1;
      const expected = n * (n + 1) / 2;
      return expected - this.sum(arr);
    }

    findLargestSum(arr) {
      const largest = this.max(arr);
      const duplicates = this.findDuplicates(arr);
      const callback = (i) => i === largest;

      if (this.find(duplicates, callback)) {
        return this.addSelf(largest);
      }

      return largest + this.max(this.reject(arr, callback));
    }

    first([first]) {
      return first;
    }

    last(arr) {
      return arr[arr.length - 1];
    }

    rest(arg) {
      const value = this.slice(arg, 1);
      if (this.isString(arg)) {
        return value.join('');
      }

      return value;
    }

    initial(arr) {
      return this.slice(arr, 0, arr.length - 1);
    }

    head(arr) {
      return this.first(arr);
    }

    tail(arr) {
      return this.rest(arr);
    }

    slice(arr, start, end) {
      let noEndInSight = end;
      if (this.isUndefined(end)) {
        noEndInSight = this.size(arr);
      }

      return nativeSlice.call(arr, start, noEndInSight);
    }

    drop(arr, n) {
      return this.slice(arr, n);
    }

    dropRight(arr, n) {
      if (n > arr.length - 1) {
        return [];
      }
      return this.slice(arr, 0, arr.length - n);
    }

    nth(arr, n) {
      return arr[n];
    }

    nthArg(n) {
      return (...args) => this.nth(args, n);
    }

    firstArg(arg) {
      return this.passthru(arg);
    }

    restArg(...args) {
      return this.rest(args);
    }

    lastArg(...args) {
      return this.last(args);
    }

    min(...args) {
      return Math.min(...this.flatten(args));
    }

    max(...args) {
      return Math.max(...this.flatten(args));
    }

    gt(a, b) {
      return a > b;
    }

    gte(a, b) {
      return a >= b;
    }

    lt(a, b) {
      return a < b;
    }

    lte(a, b) {
      return a <= b;
    }

    indexOf(arr, value, fromIndex) {
      return (fromIndex ? this.slice(arr, fromIndex) : arr).indexOf(value);
    }

    contains(arr, value, fromIndex) {
      return this.indexOf(arr, value, fromIndex) !== -1;
    }

    filter(arr, callback) {
      if (this.isUndefined(arr)) {
        return [];
      }

      if (this.isFunction(arr.filter)) {
        return arr.filter(callback);
      }

      return this.reduce(arr, (value, item) => {
        if (callback(item)) {
          value.push(item);
        }
        return value;
      }, []);
    }

    reject(arr, callback) {
      return this.filter(arr, this.negate(callback));
    }

    lastOfTheLastOfTheLast(arr) {
      const lastItem = this.last(arr);

      if (this.isArray(lastItem) && this.size(lastItem)) {
        return this.lastOfTheLastOfTheLast(lastItem);
      }

      return lastItem;
    }

    chain(data) {
      let result = data;
      const methods = {
        filter: (callback) => {
          result = this.filter(result, callback);
          return methods;
        },
        reject: (callback) => {
          result = this.reject(result, callback);
          return methods;
        },
        map: (callback) => {
          result = this.map(result, callback);
          return methods;
        },
        reduce: (callback, initialValue) => {
          result = this.reduce(result, callback, initialValue);
          return methods;
        },
        find: (callback, useBinarySearch) => {
          result = this.find(result, callback, useBinarySearch);
          return methods;
        },
        findKey: (callback) => {
          result = this.findKey(result, callback);
          return methods;
        },
        pick: (callback) => {
          result = this.pick(result, callback);
          return methods;
        },
        omit: (callback) => {
          result = this.omit(result, callback);
          return methods;
        },
        flatten: () => {
          result = this.flatten(result);
          return methods;
        },
        first: () => {
          result = this.first(result);
          return methods;
        },
        rest: () => {
          result = this.rest(result);
          return methods;
        },
        reverse: () => {
          result = this.reverse(result);
          return methods;
        },
        drop: (n) => {
          result = this.drop(result, n);
          return methods;
        },
        dropRight: (n) => {
          result = this.dropRight(result, n);
          return methods;
        },
        plug: (fn) => {
          result = fn(result);
          return methods;
        },
        value: () => result,
        toJSON: () => JSON.stringify(methods.value())
      };

      return methods;
    }

    lazyChain(data) {
      const actions = [];
      const buildData = () =>
        this.reduce(actions, (item, {action, callback, attributes}) =>
          this[action](item, callback, attributes)
        , data);

      const methods = {
        filter: (callback) => {
          actions.push({action: 'filter', callback});
          return methods;
        },
        reject: (callback) => {
          actions.push({action: 'reject', callback});
          return methods;
        },
        map: (callback) => {
          actions.push({action: 'map', callback});
          return methods;
        },
        reduce: (callback, initialValue) => {
          actions.push({action: 'reduce', callback, attributes: initialValue});
          return methods;
        },
        find: (callback, useBinarySearch) => {
          actions.push({action: 'find', callback, attributes: useBinarySearch});
          return methods;
        },
        findKey: (callback) => {
          actions.push({action: 'findKey', callback});
          return methods;
        },
        pick: (callback) => {
          actions.push({action: 'pick', callback});
          return methods;
        },
        omit: (callback) => {
          actions.push({action: 'omit', callback});
          return methods;
        },
        flatten: () => {
          actions.push({action: 'flatten'});
          return methods;
        },
        first: () => {
          actions.push({action: 'first'});
          return methods;
        },
        rest: () => {
          actions.push({action: 'rest'});
          return methods;
        },
        reverse: () => {
          actions.push({action: 'reverse'});
          return methods;
        },
        drop: (n) => {
          actions.push({action: 'drop', callback: n});
          return methods;
        },
        dropRight: (n) => {
          actions.push({action: 'dropRight', callback: n});
          return methods;
        },
        plug: (fn) => {
          actions.push({action: 'callFunctor', callback: fn});
          return methods;
        },
        value: buildData,
        toJSON: () => JSON.stringify(methods.value())
      };

      return methods;
    }

    mathChain(value) {
      let result = value;

      const methods = {
        add: (val) => {
          result = this.add(result, val);
          return methods;
        },
        addSelf: () => {
          result = this.addSelf(result);
          return methods;
        },
        subtract: (val) => {
          result = this.subtract(result, val);
          return methods;
        },
        multiply: (val) => {
          result = this.multiply(result, val);
          return methods;
        },
        divide: (val) => {
          result = this.divide(result, val);
          return methods;
        },
        sum: (...args) => {
          result = this.sum(result, ...args);
          return methods;
        },
        mean: (...args) => {
          result = this.mean(result, ...args);
          return methods;
        },
        plug: (fn) => {
          result = fn(result);
          return methods;
        },
        value: () => result
      };

      return methods;
    }

    kitten() {
      this.each(this.times(this.random(5, 20)), () => {
        const greenOrRed = this.random() ? 'green' : 'red';
        const orangeOrBlue = this.random() ? 'orange' : 'blue';
        const meowOrPurr = this.random() ? 'meow' : 'purrr';
        const color = this.random() ? greenOrRed : orangeOrBlue;
        const meow = () => meowOrPurr;
        const randomTimes = this.random(1, this.random(2, 4));
        const allTheMeows = this.times(randomTimes, meow).join(' ');
        console.log(`%c${allTheMeows}`, `color: ${color}`);
      });
    }

    Promise(fn) {
      const then = (onResolved, onRejected) => {
        let done = false;
        const resolve = (value) => {
          if (done) {
            return;
          }
          done = true;
          onResolved(value);
        };

        const reject = (val) => {
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

      return {then};
    }

    exportModule(name, fn) {
      if (typeof module !== 'undefined' && module.exports) {
        module.exports = fn;
      }

      if (typeof window !== 'undefined') {
        window[name] = fn;
      }

      if (
          typeof define !== 'undefined' &&
          typeof define === 'function' &&
          define.amd
        ) {
        define([name], fn);
      }
    }
  }

  const yo = new Yo();
  yo.exportModule('yo', yo);

  const validatedMethodNames = yo.validateMethodNames();
  if (validatedMethodNames !== true) {
    yo.error(`Invalid method names in yo library!
      Invalid method names: ${validatedMethodNames.join(', ')}`);
  }
})();
