const chai = require('chai');
const Nightmare = require('nightmare');
chai.should();
global.assert = chai.assert
global.getNightmare = function() {
    return Nightmare({
        show: false,
        waitTimeout: 5000,
        gotoTimeout: 5000,
        webPreferences: {
            partition: 'part_' + Math.random()
        }
    });
};
