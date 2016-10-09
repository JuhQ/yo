const yo = require('../../dist/yo.js');
const expect = require('expect.js');

const noValue = undefined;
const hasValue = '123';

describe('Is functions', () => {
  it('isPalindrome otto', () => expect(yo.isPalindrome('otto')).to.equal(true));
  it('isPalindrome race car', () => expect(yo.isPalindrome('race car')).to.equal(true));
  it('isPalindrome "            "', () => expect(yo.isPalindrome('             ')).to.equal(true));
  it('isPalindrome 0_0 (: /-\\ :) 0-0', () =>
    expect(yo.isPalindrome('0_0 (: /-\\ :) 0-0')).to.equal(true));

  it('isNull', () => expect(yo.isNull(null)).to.equal(true));
  it('isUndefined', () => expect(yo.isUndefined(noValue)).to.equal(true));
  it('isDefined', () => expect(yo.isDefined(hasValue)).to.equal(true));
  it('isString', () => expect(yo.isString('string')).to.equal(true));
  it('isNumber', () => expect(yo.isNumber(123)).to.equal(true));
  it('isObject', () => expect(yo.isObject({obj: true})).to.equal(true));
  it('isFunction', () => expect(yo.isFunction(() => {})).to.equal(true));
  it('isArray', () => expect(yo.isArray([])).to.equal(true));
  it('isEmpty array', () => expect(yo.isEmpty([])).to.equal(true));
  it('isEmpty object', () => expect(yo.isEmpty({})).to.equal(true));
  it('isEmpty string', () => expect(yo.isEmpty('')).to.equal(true));
  it('isEmpty number', () => expect(yo.isEmpty(0)).to.equal(true));
  it('isEmpty undefined', () => expect(yo.isEmpty()).to.equal(true));
  it('isFinite', () => expect(yo.isFinite(1)).to.equal(true));
  it('isPositive', () => expect(yo.isPositive(1)).to.equal(true));
  it('isNegative', () => expect(yo.isNegative(-1)).to.equal(true));
  it('isTruthy 1', () => expect(yo.isTruthy(1)).to.equal(true));
  it('isTruthy true', () => expect(yo.isTruthy(true)).to.equal(true));
  it('isTruthy []', () => expect(yo.isTruthy([])).to.equal(true));
  it('isTruthy {}', () => expect(yo.isTruthy({})).to.equal(true));
  it('isTruthy "string"', () => expect(yo.isTruthy('string')).to.equal(true));
  it('isEqual integer', () => expect(yo.isEqual(1, 1)).to.equal(true));
  it('isEqual object', () => expect(yo.isEqual({a: 1}, {a: 1})).to.equal(true));
  it('isEqual array', () => expect(yo.isEqual([1, 2], [1, 2])).to.equal(true));

  it('not isNull', () => expect(yo.isNull('null')).to.equal(false));
  it('not isPalindrome', () => expect(yo.isPalindrome('not palindrome')).to.equal(false));
  it('not isUndefined', () => expect(yo.isUndefined(hasValue)).to.equal(false));
  it('not isDefined', () => expect(yo.isDefined(noValue)).to.equal(false));
  it('not isString', () => expect(yo.isString(123)).to.equal(false));
  it('not isNumber', () => expect(yo.isNumber('123')).to.equal(false));
  it('not isNumber null', () => expect(yo.isNumber(null)).to.equal(false));
  it('not isObject', () => expect(yo.isObject('not a object')).to.equal(false));
  it('not isObject array', () => expect(yo.isObject([])).to.equal(false));
  it('not isObject null', () => expect(yo.isObject(null)).to.equal(false));
  it('not isFunction array', () => expect(yo.isFunction([])).to.equal(false));
  it('not isFunction object', () => expect(yo.isFunction({})).to.equal(false));
  it('not isFunction null', () => expect(yo.isFunction(null)).to.equal(false));
  it('not isArray object', () => expect(yo.isArray({obj: true})).to.equal(false));
  it('not isArray null', () => expect(yo.isArray(null)).to.equal(false));
  it('not isEmpty', () => expect(yo.isEmpty([1, 2, 3])).to.equal(false));
  it('not isFinite', () => expect(yo.isFinite(Infinity)).to.equal(false));
  it('not isPositive', () => expect(yo.isPositive(-1)).to.equal(false));
  it('not isNegative', () => expect(yo.isNegative(1)).to.equal(false));
  it('not isEqual integer', () => expect(yo.isEqual(1, 2)).to.equal(false));
  it('not isEqual object', () => expect(yo.isEqual({a: 1}, {a: 2})).to.equal(false));
  it('not isEqual array', () => expect(yo.isEqual([1, 1], [2, 2])).to.equal(false));
  it('not isTruthy false', () => expect(yo.isTruthy(false)).to.equal(false));
  it('not isTruthy 0', () => expect(yo.isTruthy(0)).to.equal(false));
  it('not isTruthy null', () => expect(yo.isTruthy(null)).to.equal(false));
  it('not isTruthy undefined', () => expect(yo.isTruthy(undefined)).to.equal(false));
  it('not isTruthy "empty string"', () => expect(yo.isTruthy('')).to.equal(false));
  it('not isTruthy NaN', () => expect(yo.isTruthy(NaN)).to.equal(false));
});
