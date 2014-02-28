package pubsub;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.platform.Verticle;

public class Sender extends Verticle {

  public void start() {
    // Publish some news on the feed every second
    vertx.setPeriodic(1000, new Handler<Long>() {
      @Override
      public void handle(Long timerID) {
			  System.out.println("sending...");
        vertx.eventBus().publish("news-feed", "more news from Java " + new java.util.Date());
      }
    });
  }
}
