vertx.createHttpServer.requestHandler { req: HttpServerRequest =>
  req.response.end("Hello Vert.x Scala")
}.listen(8000)