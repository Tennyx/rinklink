const createModal = 
		'<div class="modal fade" id="create-event-modal" tabindex="-1" role="dialog" aria-labelledby="createEventLabel" aria-hidden="true">\
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
								  	<button type="button" class="btn btn-secondary gray-highlight" style="background:#bfbdbd"></button>\
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
						<button id="save-new-event" type="button" class="btn btn-primary" data-dismiss="modal">Create Event</button>\
					</div>\
				</div>\
			</div>\
		</div>';

const verifyModal =
		'<div class="modal fade" id="verify-modal">\
			  	<div class="modal-dialog" role="document">\
			    	<div class="modal-content">\
			      		<div class="modal-body">\
			       			 <h6 class="text-center">Are you sure you want to delete this event?</h6>\
			      			<button type="button" id="delete-event" class="btn btn-danger" data-dismiss="modal">Yes</button>\
			        		<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>\
			      		</div>\
			    	</div>\
			  	</div>\
		</div>'

function eventModal(evTitle, evStart, evEnd, evDesc){
	let eventStr = 
			'<div class="modal fade" id="event-modal">\
			  <div class="modal-dialog" role="document">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <h5 class="modal-title">Event Details</h5>\
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
			          <span aria-hidden="true">&times;</span>\
			        </button>\
			      </div>\
			      <div class="modal-body">' +
			        'Event: ' + evTitle + '<br>' +
			        'Time: ' + evStart + ' to ' + evEnd + '<br>' +
			        'Description: ' + evDesc + '<br>' +
			      '</div>\
			      <div class="modal-footer">\
			      	<button type="button" id="verify-btn" class="btn btn-danger" data-toggle="modal" data-target="#verify-modal" data-dismiss="modal">Delete Event</button>\
			        <button id="edit-event" type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-modal" data-dismiss="modal">EDIT</button>\
			      </div>\
			    </div>\
			  </div>\
			</div>';

	return eventStr;

}

function editModal(edTitle, edDesc, edColor){
	let editStr = 
		'<div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="event-modalLabel" aria-hidden="true">\
			<div class="modal-dialog" role="document">\
				<div class="modal-content">\
					<div class="modal-header">\
						<h5 class="modal-title" id="event-modalLabel">Modal title</h5>\
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
							<span aria-hidden="true">&times;</span>\
						</button>\
					</div>\
					<div class="modal-body">\
				        <form>\
			          		<div class="form-group">\
			            		<label for="edit-event" class="form-control-label">Event Title:</label>\
			            		<input type="text" value="' + edTitle + '" class="form-control" id="edit-event">\
			          		</div>\
			          		<div class="form-group">\
			            		<label for="edit-time-start" class="form-control-label">Time:</label>\
			            		<select id="edit-time-start"> to\
	            				\
	            				</select>\
	            				<select id="edit-time-end">\
			            		\
			            		</select>\
			          		</div>\
			         		<div class="form-group">\
			            		<label for="editDesc" class="form-control-label">Description:</label>\
			            		<textarea class="form-control" id="editDesc">' + edDesc + '</textarea>\
			          		</div>\
			          		<div class="form-group">\
			          			<label for="editColor" class="form-control-label">Color:</label>\
				          		<div class="btn-group">\
									<button type="button" class="btn btn-secondary" id="editMainColor" style="background-color:' + edColor + '"> </button>\
									<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
										<span class="sr-only">Toggle Dropdown</span>\
									</button>\
									<div class="dropdown-menu" id="editColor">\
										<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
											<div class="btn-group mr-2 ml-2" role="group" aria-label="First group">\
											  	<button type="button" class="btn btn-secondary" style="background:#bfbdbd"></button>\
											    <button type="button" class="btn btn-secondary" style="background:red"></button>\
											    <button type="button" class="btn btn-secondary" style="background:orange"></button>\
											    <button type="button" class="btn btn-secondary" style="background:yellow"></button>\
											    <button type="button" class="btn btn-secondary" style="background:blue">3</button>\
											    <button type="button" class="btn btn-secondary" style="background:green"></button>\
											    <button type="button" class="btn btn-secondary" style="background:purple"></button>\
										  </div>\
										</div>\
									</div>\
								</div>\
							</div>\
			        	</form>\
					</div>\
					<div class="modal-footer">\
						<button type="button" id="submitChanges" class="btn btn-primary" data-dismiss="modal">Submit Changes</button>\
					</div>\
				</div>\
			</div>\
		</div>';

	return editStr;
}






