var plivo = require('plivo');
var PlivoBase = require('./plivo-base');

function PlivoSpeak(config){
    PlivoBase.call(this, config);
}

PlivoSpeak.prototype = Object.create(PlivoBase.prototype);
PlivoSpeak.prototype.constructor = PlivoBase;

PlivoSpeak.prototype.buildCall = function(target) {
    var params = {
        'from': this.config.plivo.sender, // Caller Id
        'to' : target, // User Number to Call
        'answer_url': this.config.plivo.answer_url
    };
    return params;
};

PlivoSpeak.prototype.send = function(target, message, cb) {
    var params = this.buildCall(target);
    var api = this.getPlivoAPI();
    api.make_call(params, function(status, response){
        var error = null;
        // Plivo returns 202 or 200 for a success.
        if(status != 202 && status != 200){
            error = response;
        }
        return cb(error, {
            status: status,
            response: response
        });
    });
};

module.exports = PlivoSpeak;
