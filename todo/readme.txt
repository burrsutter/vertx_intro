Uses the eventbus to send database updates 

The client.js sends the eventbus messages which are
received by todos.js which sends them on to the mongo persistor
 
First start mongo with "mongod -fork"

vertx run app.js

http://localhost:8000

Create a ToDo item

mongo
show dbs
use todo_db
show collections
db.todos.find()

You should see each inserted todo from the browser into the mongoDB
