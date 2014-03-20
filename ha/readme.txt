Tip: Drop your VPN!

Run the overall server/bridge:
vertx runmod com.burrsutter~ha~1.0 -ha

http://localhost:8000

Message publishers:
vertx runmod com.burrsutter~senderjava~1.0 -ha

vertx runmod com.burrsutter~senderruby~1.0 -ha

vertx runmod com.burrsutter~senderscala~1.0 -ha

vertx runmod com.burrsutter~senderjavascript~1.0 -ha

vertx runmod com.burrsutter~sendergroovy~1.0 -ha

vertx runmod com.burrsutter~senderpython~1.0 -ha

Another receiver:
vertx runmod com.burrsutter~receiverjavascript~1.0 -ha

ps aux | grep "javascript"

kill -9 

Note: Ctrl-C on the process will not cause the fail-over as that is a clean shutdown.

http://vertx.io/manual.html#configuring-clustering