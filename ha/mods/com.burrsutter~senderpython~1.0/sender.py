import vertx
from core.event_bus import EventBus

def timer_handler(timer_id):
	print "Python sending..."
	EventBus.publish('news-feed', 'Power Python')

vertx.set_periodic(1000, timer_handler)

