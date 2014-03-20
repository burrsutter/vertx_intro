var eb = require("vertx/event_bus");
var console = require("vertx/console");

eb.registerHandler("news-feed", function(message) {
	console.log("Received news: " + message);
});

console.log("Receiver.js");