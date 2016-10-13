const yo = require('../../dist/yo.js');
const expect = require('expect.js');

describe('Object', () => {
  it('Should get object keys', () => {
    expect(yo.keys({a: 1, b: 2})).to.eql(['a', 'b']);
  });

  it('Should get object size', () => {
    expect(yo.size({a: 1, b: 2})).to.equal(2);
    expect(yo.length({a: 1, b: 2})).to.equal(2);
  });

  it('Should loop using forIn', () => {
    const results = [];
    const callback = () => results.push(true);

    yo.forIn({a: 1, b: 2}, callback);
    expect(results).to.eql([true, true]);
  });

  describe('Find', () => {
    it('Should find using matches', () => {
      const value = yo.matches({a: 1, b: 2, c: 3}, {c: 3});
      expect(value).to.equal(true);
      const noValue = yo.matches({a: 1, b: 2, c: 3}, {d: 4});
      expect(noValue).to.equal(false);
    });

    it('Should find using findKey', () => {
      expect(yo.findKey({a: 1, b: 2}, 'a')).to.eql(1);
    });

    it('Should find using pick', () => {
      expect(yo.pick([{a: 1}, {b: 2}], {a: 1})).to.eql([{a: 1}]);
      expect(yo.pick([{a: 1}, {b: 2}], {a: 2})).to.eql([]);
      expect(yo.pick([{a: 1}, {b: 2}, {b: 2, c: 3}], {b: 2})).to.eql([{b: 2}, {b: 2, c: 3}]);
    });
  });
});
