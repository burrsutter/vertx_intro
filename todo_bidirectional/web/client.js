var eb = new vertx.EventBus(window.location.protocol + '//' +
                            window.location.hostname + ':' +
                            window.location.port + '/eventbus');


eb.onopen = function() {
	console.log("eventbus opened");
	
	// The onscreen representation of the todos object is a UL
	// the next function creates the LIs
	var renderListItem = function(todo) {
		var li = $('<li>');
		
		// each LI will have a button for deletion
		var deleteToDo = function() {
			eb.send('todos.delete', {id: todo._id}, function() {
				// li.remove(); this is now handled with a callback 
			});
			return false;
		}; // deleteToDo
		// add the unique identifier
		li.attr("id",todo._id);
		// add the name
    $('<span>').text(todo.name + ' ').appendTo(li);
		// add the delete button
    $('<button>').text('Delete').on('click', deleteToDo).appendTo(li);
		// add to the overall UL
    li.appendTo('.todos');		
	}; // renderListItem

  $('.create-form').submit(function() {

		var nameInput = $("#nameInput");
    eb.send('todos.save', {name: nameInput.val()}, function(result) {
	    nameInput.val('');
			console.log("saved: " + JSON.stringify(result));
      // renderListItem(result);
    });
    return false;
  });

	// now fetch the list from the server
  eb.send('todos.list', {}, function(res) {
    $.each(res.todos, function() {
      renderListItem(this);
			console.log(this);
    });
  });
	
	// setup event listeners (back from server) 
	eb.registerHandler('todo.was.saved', function(event) {
		console.log("a todo.was.saved event: " + JSON.stringify(event));
    debug(event);
    renderListItem(event);
	});	

	eb.registerHandler('todo.was.deleted', function(event) {
		console.log("a todo.was.deleted event: " + JSON.stringify(event));
    var theListItem = document.getElementById(event);
		theListItem.remove();
	});	
		
};	// onopen
