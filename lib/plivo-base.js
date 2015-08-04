var plivo = require('plivo');

function PlivoBase(config) {
    this.config = config;
}

PlivoBase.prototype.sendingNumber = function() {
    return this.config.plivo.sender;
};

PlivoBase.prototype.buildMessage = function(params) {
    throw new Error('Please override this method');
};

PlivoBase.prototype.getPlivoAPI = function() {
    var api = plivo.RestAPI({
        authId: this.config.plivo.authId,
        authToken: this.config.plivo.authToken,
    });
    return api;
};

PlivoBase.prototype.send = function(params, cb) {
    throw new Error('Please override this method');
};

module.exports = PlivoBase;