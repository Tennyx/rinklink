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
	          			\
	          			<div class="form-group">\
	          				<label for="eventColor" class="form-control-label">Color:</label>\
		          			<div class="btn-group">\
							  <button type="button" class="btn btn-secondary" id="eventMainColor" style="background:#bfbdbd"> </button>\
							  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
							    <span class="sr-only">Toggle Dropdown</span>\
							  </button>\
							  <div class="dropdown-menu" id="eventColor">\
							    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
								  <div class="btn-group mr-2 ml-2" role="group" aria-label="First group">\
								  	<button type="button" class="btn btn-secondary gray-highlight"></button>\
								    <button type="button" class="btn btn-secondary red-highlight" style="background:#ef5858"></button>\
								    <button type="button" class="btn btn-secondary orange-highlight" style="background:#ed9344"></button>\
								    <button type="button" class="btn btn-secondary yellow-highlight" style="background:#e2db09"></button>\
								    <button type="button" class="btn btn-secondary green-highlight" style="background:#35d130">3</button>\
								    <button type="button" class="btn btn-secondary blue-highlight" style="background:#3c7de5"></button>\
								    <button type="button" class="btn btn-secondary purple-highlight" style="background:#9737ba"></button>\
								  </div>\
								</div>\
							  </div>\
							</div>\
						</div>\
						\
	        		</form>\
					</div>\
					<div class="modal-footer">\
						<button id="saveNewEvent" type="button" class="btn btn-primary" data-dismiss="modal">Create Event</button>\
					</div>\
				</div>\
			</div>\
		</div>'