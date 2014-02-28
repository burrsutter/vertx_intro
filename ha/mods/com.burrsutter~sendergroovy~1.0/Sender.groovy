def eb = vertx.eventBus

vertx.setPeriodic(1000) {
  System.out.println("Groovy sending...")
  eb.publish("news-feed", "Getting Groovy")
}
