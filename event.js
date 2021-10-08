var events = require('events');
var eventEmitter = events.EventEmitter;
var emitter = new eventEmitter();
emitter.on("newListener", function(eventName, listener) {
    console.log("Added listener for " + eventName + " events");
});
emitter.on('data_received', function() {});
emitter.on('data_received', function() {}); 