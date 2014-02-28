require "vertx"
include Vertx

HttpServer.new.request_handler do |req|
  req.response.end("Hello Vert.x Ruby! " + Time.now.to_s)
end.listen(8000)