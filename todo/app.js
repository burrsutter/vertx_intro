var container = require("vertx/container"); 
container.deployModule("io.vertx~mod-web-server~2.0.0-final", 
{ port: 8000, 
	host: "localhost", 
	bridge: true, 
	inbound_permitted: [ 
	  { address: "todos.list" },
	  { address: "todos.find" },
		{ address: "todos.save" },
		{ address: "todos.delete" } 
	]
});

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final", {
  address: "todos.persistor",
  db_name: "todos_db"
});

container.deployVerticle("todos.js");

