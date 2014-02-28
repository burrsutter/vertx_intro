
vertx.setPeriodic(1000, { timerID =>
  println("Scala sending...")
  vertx.eventBus.publish("news-feed", "Super Scala");
})