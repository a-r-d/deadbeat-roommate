var plivo = require('plivo');
var PlivoBase = require('./plivo-base');

function PlivoSMS(config) {
    PlivoBase.call(this, config);
}

PlivoSMS.prototype = Object.create(PlivoBase.prototype);
PlivoSMS.prototype.constructor = PlivoBase;

PlivoSMS.prototype.buildMessage = function(target, message) {
    var params = {
        'src': this.config.plivo.sender, // Caller Id
        'dst' : target, // User Number to Call
        'text' : message,
        'type' : 'sms',
    };
    return params;
};

PlivoSMS.prototype.send = function(target, message, cb) {
    var msg = this.buildMessage(target, message);
    var api = this.getPlivoAPI();
    api.send_message(msg, function(status, response) {
        var error = null;
        // Plivo returns 202 or 200 for a success.
        if(status != 202 && status != 200) {
            error = response;
        }
        return cb(error, {
            status: status,
            response: response
        });
    });
};

module.exports = PlivoSMS;
