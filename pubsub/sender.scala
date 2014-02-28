
vertx.setPeriodic(1000, { timerID =>
  vertx.eventBus.publish("news-feed", "News from Scala!");
})