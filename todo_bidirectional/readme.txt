First, run "todo" as it is the more simplified example

This one adds client-side subscription and server-side publication

todos.js has
	eventBus.publish("todo.was.saved",todo);
	
client.js has 
	eb.registerHandler('todo.was.saved', function(event) {

To run:	
vertx run app.js

http://localhost:8000
in Chrome & FireFox (or Safari)

Create a ToDo item

mongo
show dbs
use todo_bidb
show collections
db.todos.find()

You should see each inserted todo from the browser into the mongoDB and in
all other browsers
