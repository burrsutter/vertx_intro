console.log("index.js");

var eb = new vertx.EventBus(window.location.protocol + '//' +
                            window.location.hostname + ':' +
                            window.location.port + '/eventbus');

function fetchMongoData() {
	console.log("fetchMongoData");
	
	eb.send('vertx.mongopersistor', { action:"find", collection: "things", matcher: {}}, function(reply) {
    if (reply.status === "ok") {
       console.log(reply.results);
    } else {
       console.log(reply.message);
    }
  }); // Mongo find all
}; //fetchMongoData

function saveMongoData(thing) {
	console.log("saveMongoData: " + thing);
	// Mongo likes JSON objects, so making an object
	var adocument = {
		name: thing
	};
	eb.send('vertx.mongopersistor', { action:"save", collection: "things", document: adocument}, function(reply) {
    if (reply.status === "ok") {
 		  console.log("thing saved: " + reply._id);
    } else {
       console.log(reply.message);
    }		
	}) // Mongo save	
}; // saveMongoData



$(document).ready(function() {
	console.log("document ready");
	
  eb.onopen = function() {
		  console.log("eb.onopen");
			fetchMongoData(); 
  }; //eb.onopen	
	
	$("#btnSave").on("click", function(e) {
		console.log("btnSave clicked");
		e.preventDefault(); // prevents the form from submitting automatically
		console.log("thing: " + $("#thing").val());
		saveMongoData($("#thing").val());
	});
	
});

