var vertx = require('vertx');
var container = require("vertx/container");
var console   = require("vertx/console");
var eb = require("vertx/event_bus");

var rm = new vertx.RouteMatcher();

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final", {
  address: "vertx.mongopersistor",
  db_name: "todos_bidb"
});


rm.get('/todo/', function(req) {
	console.log("fetch all");
	eb.send('vertx.mongopersistor', { action:"find", collection: "todos", matcher: {}}, function(reply) {
    if (reply.status === "ok") {
       req.response.end(JSON.stringify(reply.results));
   } else {
      console.log(reply.message);
    }
  }); // Mongo find 	

});

rm.get('/todo/:id', function(req) {
	var argid = req.params().get('id');
	
	console.log("id: " + argid);
	// ignoring the id for now
	var	mongoMatcher = {
			_id: argid
		};
		
	console.log("mongoMatcher: " + mongoMatcher._id);
		
	eb.send('vertx.mongopersistor', { action:"find", collection: "todos", matcher: mongoMatcher}, function(reply) {
    if (reply.status === "ok") {
       req.response.end(JSON.stringify(reply.results));
	  	 //for (item in reply.results) {
				 // debug(reply.results[item]);
			 //	console.log(reply.results[item].name);
			 // } // for

   } else {
      console.log(reply.message);
    }
  }); // Mongo find 	
});

// Catch all - serve the index page
rm.getWithRegEx('.*', function(req) {
  req.response.sendFile("index.html");
});

vertx.createHttpServer().requestHandler(rm).listen(8000);

function fetcher(mongoMatcher) {
	eb.send('vertx.mongopersistor', { action:"find", collection: "todos", matcher: mongoMatcher}, function(reply) {
		  if (reply.status === "ok") {
				return reply.results;
			} else {
				console.log("error: " + reply.message);
			}
	});
}

function debug(myobject) {
	console.log("===== " + myobject + " =====");
	for (var key in myobject) {
		if (myobject.hasOwnProperty(key))  {
		  console.log("key: " + key + " value: " + myobject[key]);
	    }
	} // for
}
