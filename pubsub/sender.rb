require "vertx"
include Vertx

Vertx::set_periodic(1000) do
  EventBus.publish('news-feed','Some news from Ruby')
end