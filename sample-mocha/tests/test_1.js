describe('foo', function() {
    it('1 + 2 = 3', function() {
        return Promise.resolve(1 + 2).should.eventually.equal(3);
    });
});
