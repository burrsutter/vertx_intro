require "vertx"
include Vertx

Vertx::set_periodic(1000) do
  puts "Ruby sending..."
  EventBus.publish('news-feed','Rocking Ruby')
end