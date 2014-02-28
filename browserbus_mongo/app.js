var container = require("vertx/container");
var console   = require("vertx/console");

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
  port: 8000,
  host: "localhost",
  bridge: true,
  inbound_permitted: [
    { address: 'vertx.mongopersistor' }
  ],
  outbound_permitted: [
    { }
  ]
});

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final", {
  address: "vertx.mongopersistor",
  db_name: "browserbus_mongo"
});

