var PlivoSender = require('./lib/plivo-sender');
var argv = require('yargs').argv;
var config;
var message;
var target;

if(!argv.config) {
    throw new Error('No Config file found in arguments');
}
config = require(argv.config);

if(!argv.message) {
    throw new Error('No message found in arguments');
}
message = argv.message;

if(!argv.target) {
    throw new Error('No target phone found in arguments');
}
target = argv.target;


var plivoSender = new PlivoSender(config);
plivoSender.send(target, message, function(error, results){
    if(error) {
        console.error('Error: ', error);
    } else {
        console.log('Message sent: ', results);
    }
});
