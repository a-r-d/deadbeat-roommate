var plivo = require('plivo');

function PlivoSender(config){
    this.config = config;
}

PlivoSender.prototype.sendingNumber = function(){
    return this.config.plivo.sender;
};

PlivoSender.prototype.buildMessage = function(target, message) {
    var params = {
        'src': this.config.plivo.sender, // Caller Id
        'dst' : target, // User Number to Call
        'text' : message,
        'type' : "sms",
    };
    return params;
};

PlivoSender.prototype.getPlivoAPI = function(){
    var api = plivo.RestAPI({
        authId: this.config.plivo.authId,
        authToken: this.config.plivo.authToken,
    });
    return api;
};

PlivoSender.prototype.send = function(target, message, cb) {
    var msg = this.buildMessage(target, message);
    var api = this.getPlivoAPI();
    api.send_message(msg, function(status, response) {
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

module.exports = PlivoSender;
