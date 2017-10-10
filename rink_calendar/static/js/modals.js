const timeArr = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11];

const createModal = 
		'<div class="modal fade" id="createEventMod" tabindex="-1" role="dialog" aria-labelledby="createEventLabel" aria-hidden="true">\
			<div class="modal-dialog" role="document">\
				<div class="modal-content">\
					<div class="modal-header">\
						<h5 class="modal-title" id="createEventLabel">New Event</h5>\
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
							<span aria-hidden="true">&times;</span>\
						</button>\
					</div>\
					<div class="modal-body">\
		        	<form>\
	          			<div class="form-group">\
	            			<label for="rinkEvent" class="form-control-label">Event Title:</label>\
	            			<input type="text" class="form-control" id="rinkEvent">\
	          			</div>\
	          			<div class="form-group">\
	            			<label for="eventTimeStart" class="form-control-label">Time:</label>\
	            			<select id="eventTimeStart">\
	            				\
	            			</select> to \
	            			<select id="eventTimeEnd">\
	            				\
	            			</select>\
	          			</div>\
	         			<div class="form-group">\
	            			<label for="eventDesc" class="form-control-label">Description:</label>\
	            			<textarea class="form-control" id="eventDesc"></textarea>\
	          			</div>\
	        		</form>\
					</div>\
					<div class="modal-footer">\
						<button id="saveNewEvent" type="button" class="btn btn-primary" data-dismiss="modal">Create Event</button>\
					</div>\
				</div>\
			</div>\
		</div>'