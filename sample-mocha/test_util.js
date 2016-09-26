const chai = require('chai');
const Nightmare = require('nightmare');
chai.should();
global.assert = chai.assert
global.getNightmare = function(show=false, waitTimeout=5000, gotoTimeout=5000) {
    return Nightmare({
        show,
        waitTimeout,
        gotoTimeout,
        webPreferences: {
            partition: 'part_' + Math.random()
        }
    });
};
