var PlivoSMS = require('./lib/plivo-sms');
var PlivoVoice = require('./lib/plivo-voice');
var argv = require('yargs').argv;
var config;
var message;
var target;
var type;

if(!argv.config) {
    throw new Error('No Config file found in arguments.');
}
config = require(argv.config);

if(!argv.target) {
    throw new Error('No target phone found in arguments.');
}
target = argv.target;

if(argv.type && ['sms', 'voice'].indexOf(argv.type) === -1) {
    throw new Error('No valid type found in arguments, must be "sms" or "voice".');
} else if(argv.type) {
    type = argv.type;
} else {
    type = 'sms'; // default
}

if(type === 'sms') {
    // message is only requried for SMS mode.
    if(!argv.message) {
        throw new Error('No message found in arguments.');
    }
    message = argv.message;

    var plivoSMS = new PlivoSMS(config);
    plivoSMS.send(target, message, function(error, results) {
        if(error) {
            console.error('Error: ', error);
        } else {
            console.log('Message sent: ', results);
        }
    });
} else if(type === 'voice') {
    // In voice mode, we do not use 'message', we use the XML found at 'answer_url',
    // sorry that is just how Plivo (and Twillio for that matter) happens to work.
    if(!config.plivo.answer_url) {
        throw new Error('Config element "plivo.answer_url" is required for voice mode');
    }

    var plivoVoice = new PlivoVoice(config);
    plivoVoice.send(target, message, function(error, results) {
        if(error) {
            console.error('Error: ', error);
        } else {
            console.log('Message sent: ', results);
        }
    });
} else {
    throw new Error('Unknown type selected');
}

