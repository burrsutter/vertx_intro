var vertx = require('vertx')

var server = vertx.createHttpServer()

// Serve the static resources
server.requestHandler(function(req) {
  if (req.uri() == "/") req.response.sendFile("index.html")
  if (req.uri() == "/vertxbus.js") req.response.sendFile("vertxbus.js")
})

// Create a SockJS bridge which lets everything through (be careful!)
vertx.createSockJSServer(server).bridge({prefix: "/eventbus"}, [{}], [{}]);

server.listen(8000);