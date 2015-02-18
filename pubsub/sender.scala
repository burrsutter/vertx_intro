
vertx.setPeriodic(1000, { timerID =>
  println("sending from Scala...");
  vertx.eventBus.publish("news-feed", "Scala News");
})
