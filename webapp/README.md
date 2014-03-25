# "Real-time" Web Application Example

This is a full end-end "real-time" web appplication which has a modern JavaScript client side MVVM application that communicates via the event bus with a persistor.

It's the same application from the tutorial.

You will need an instance of MongoDB server (with default settings) running on localhost.

To run:

    vertx runmod io.vertx~example-web-app~1.0

To see log output set the following in `conf/logging.properties` in the Vert.x install directory.

    org.vertx.level=FINE

Then point your browser at https://localhost:8000 and start shopping! (Note it's https not http!)

Login is "tim" and "password"

The example uses knockout.js at the client side to render the application. Vert.x is completely agnostic as to what
client side toolkit you use - we have just chosen this for this example.

The example uses the Vert.x event bus to extend into client side JavaScript so the browser can communicate with
server side components.

For a fatjar - where all the dependencies have been fully encapsulated into a single deployable unit.

mod.json needs to use "deploys" for all dependencies

vertx runmod io.vertx~example-web-app~1.0

will create yet another "mods" directory underneath  io.vertx~example-web-app~1.0

So runmod puts the deps as a peer to your current directory
but pulldeps puts the deps in a sub-directory

vertx pulldeps io.vertx~example-web-app~1.0

then

vertx fatjar io.vertx~example-web-app~1.0

and finally

java -jar example-web-app-1.0-fat.jar

and you should not see any downloading messages - all dependent modules should be present.


