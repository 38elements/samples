const co = require('co');
const Nightmare = require('nightmare');
let url = 'http://example.com';
let title = 'example title';

describe('Web page', function() {
    it('title', function() {
        this.timeout(10000);
        let nightmare = Nightmare({
            show: false,
            waitTimeout: 5000,
            gotoTimeout: 5000,
            partition: 'part_' + Math.random()
        });
        return co(function * () {
            let title = yield nightmare.goto(url).wait('#wrapper').title();
            title.should.equal(title);
        }).catch((e) => {
            nightmare.end();
            throw e;
        })
    });
    it('1 + 2 = 3', function() {
        return co(function * () {
            let value = yield Promise.resolve(1 + 2);
            (1 + 2).should.equal(3);
        })
    });
});
