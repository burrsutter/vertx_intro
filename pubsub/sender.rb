require "vertx"
include Vertx

Vertx::set_periodic(1000) do
  puts "sending from Ruby..."
  EventBus.publish('news-feed','Ruby News')
end
