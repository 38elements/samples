const co = require('co');

describe('foo', function() {
    it('1 + 2 = 3', function() {
        return co(function * () {
            let value = yield Promise.resolve(1 + 2);
            (1 + 2).should.equal(3);
        })
    });
    it('1 + 2 = 3', function() {
        return co(function * () {
            let value = yield Promise.resolve(1 + 2);
            (1 + 2).should.equal(3);
        })
    });
});
