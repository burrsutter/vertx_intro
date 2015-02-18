var eb = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx")

vertx.setPeriodic(1000, function sendMessage() {
	console.log("sending from JS...");
  eb.publish('news-feed', 'JavaScript News');
})
