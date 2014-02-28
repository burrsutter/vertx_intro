package pubsub;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.Message;
import org.vertx.java.platform.Verticle;

public class Receiver extends Verticle {

  public void start() {
    vertx.eventBus().registerHandler("news-feed", new Handler<Message<String>>() {
      @Override
      public void handle(Message<String> message) {
        System.out.println("Received news: " + message.body());
      }
    });
  }
}
