package browserbus;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.core.sockjs.SockJSServer;
import org.vertx.java.platform.Verticle;

public class BridgeServer extends Verticle {
  Logger logger;

  public void start() {
    logger = container.logger();
    
    HttpServer server = vertx.createHttpServer();

    server.requestHandler(new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {
        if (req.path().equals("/")) req.response().sendFile("www/index.html"); // Serve the index.html
        if (req.path().endsWith("vertxbus.js")) req.response().sendFile("www/vertxbus.js"); // Serve the js
        if (req.path().endsWith("debug.js")) req.response().sendFile("www/debug.js"); // Serve the js
      }
    });

    JsonArray permitted = new JsonArray();
    permitted.add(new JsonObject()); // Let everything through

    ServerHook hook = new ServerHook(logger);

    SockJSServer sockJSServer = vertx.createSockJSServer(server);
    sockJSServer.setHook(hook);
    sockJSServer.bridge(new JsonObject().putString("prefix", "/eventbus"), permitted, permitted);

		//  If running on OpenShift
		String portAsString = System.getenv("OPENSHIFT_DIY_PORT");
		int port = 0;
		if (portAsString != null && !portAsString.equals("")) {
			port = Integer.parseInt(portAsString);
		} else {
			//  If running on Localhost
			port = 8000;
		}
		String ipAddress = System.getenv("OPENSHIFT_DIY_IP");
		
		if (ipAddress != null && !ipAddress.equals("")) {
			System.out.println("Starting Server on " + ipAddress + ":" + port);
			server.listen(port, ipAddress);
		} else {
			System.out.println("Starting Server on " + port );
			server.listen(port);
		}
  }
}
