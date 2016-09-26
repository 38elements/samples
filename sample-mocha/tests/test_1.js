const co = require('co');
let url = 'http://example.com';
let title = 'Title';

describe('Web page', function() {
    let nightmare;
    beforeEach(function () {
        nightmare = getNightmare() 
    });
    afterEach(function () {
        nightmare.end();
    });
    it('title', function() {
        this.timeout(10000);
        return co(function * () {
            let title = yield nightmare.goto(url).wait('body').title();
            title.should.equal(title);
        }).catch((e) => {
            assert.fail(0, 1, e);
        })
    });
    it('1 + 2 = 3', function() {
        return co(function * () {
            let value = yield Promise.resolve(1 + 2);
            (1 + 2).should.equal(3);
        })
    });
});
