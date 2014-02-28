var eventBus = require("vertx/event_bus");
var console= require("vertx/console");

// Listens for the client initiated event
eventBus.registerHandler("todos.list", function(args, responder) {
   console.log("todos.list");
   // "forwards" request to MongoDB 
   eventBus.send('todos.persistor', { action:"find", collection: "todos", matcher: {}}, function(reply) {
     if (reply.status === "ok") {
        responder({todos: reply.results});
     } else {
        console.log(reply.message);
     }
   }); // Mongo find all
}); // registerHandler todos.list

eventBus.registerHandler("todos.find", function (args, responder) {
   console.log("todos.find"); 
   eventBus.send('todos.persistor', { action:"find", collection: "todos", matcher: {_id: args._id}}, function(reply) {
     if (reply.status === "ok") {
        responder({todo: reply.result});
     } else {
        console.log(reply.message);
     }    
  }) // Mongo find for _id
});  // registerHandler todos.find

eventBus.registerHandler("todos.save", function (todo, responder) {
   eventBus.send('todos.persistor', { action:"save", collection: "todos", document: todo}, function(reply) {
     if (reply.status === "ok") {
        todo._id = reply._id;
        console.log("todos.save " + reply._id);
        responder(todo); // respond with the created/updated item 
        // alert others
        console.log("alert: " + reply);
        eventBus.publish("todo.was.saved",todo);
     } else {
        console.log(reply.message);
     }    
   }) // Mongo save
});

eventBus.registerHandler("todos.delete", function(args,responder) {
   eventBus.send('todos.persistor', { action:"delete", collection: "todos", matcher: {_id: args.id}}, function(reply) {
    if (reply.status === "ok") {
       console.log("todos.deleted " + args.id); 
       responder({}); 
       // alert others
       console.log("alert: " + reply);
       eventBus.publish("todo.was.deleted",args.id);
    } else {
       console.log(reply.message);
    }   
   }) // Mongo delete
});