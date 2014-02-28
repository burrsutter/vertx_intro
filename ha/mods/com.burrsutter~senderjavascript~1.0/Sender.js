var eventBus = require("vertx/event_bus");
var console = require("vertx/console");
var vertx = require("vertx");

vertx.setPeriodic(1000, function sendMessage() {
	console.log("JavaScript sending...");
  eventBus.publish('news-feed', 'Jazzy JavaScript');
})
