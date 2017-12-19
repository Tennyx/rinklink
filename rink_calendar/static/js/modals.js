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
		</div>';

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
			      <div id="event-desc" class="modal-body text-center">' +
			        '<div><b><span class="event-mod-headers">Event:</span></b><br>' + evTitle + '</div><br>' +
			        '<div><b><span class="event-mod-headers">Time:</span></b><br>' + evStart + '-' + evEnd + '</div><br>' +
			        '<div><b><span class="event-mod-headers">Description:</span></b><br>' + evDesc + '</div>' +
			      '</div>\
			      <div class="modal-footer">\
			      	<button type="button" id="verify-btn" class="btn btn-danger" data-toggle="modal" data-target="#verify-modal" data-dismiss="modal"><i class="fa fa-trash" aria-hidden="true"></i></button>\
			        <button id="edit-event" type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit-modal" data-dismiss="modal"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
			      </div>\
			    </div>\
			  </div>\
			</div>';

	return eventStr;

}

function editModal(edTitle, edDesc, edColor, modTitle, btnText){

	const timeArr = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11];

	let timeGen = '';

	for(i=0;i<timeArr.length;i++){
			timeGen +=
			'<option value="' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '</option>'+
			'<option value="' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '</option>'+
			'<option value="' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '</option>'+
			'<option value="' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '</option>'
	}

	let editStr = 
		'<div class="modal fade" id="edit-modal" tabindex="-1" role="dialog" aria-labelledby="event-modalLabel" aria-hidden="true">\
			<div class="modal-dialog" role="document">\
				<div class="modal-content">\
					<div class="modal-header">\
						<h5 class="modal-title" id="event-modalLabel">' + modTitle + '</h5>\
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
			            		<select id="edit-time-start"> to' + timeGen +
	            				
	            				'</select>\
	            				<select id="edit-time-end">' + timeGen +
			            		
			            		'</select>\
			          		</div>\
			         		<div class="form-group">\
			            		<label for="edit-desc" class="form-control-label">Description:</label>\
			            		<textarea class="form-control" id="edit-desc">' + edDesc + '</textarea>\
			          		</div>\
			          		<div class="form-group">\
			          			<label for="edit-color" class="form-control-label">Color:</label>\
				          		<div class="btn-group">\
									<button type="button" class="btn btn-secondary" id="edit-main-color" style="background-color:' + edColor + '"> </button>\
									<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
										<span class="sr-only">Toggle Dropdown</span>\
									</button>\
									<div class="dropdown-menu" id="edit-color">\
										<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
											<div class="btn-group mr-2 ml-2" role="group" aria-label="First group">\
											  	<button type="button" class="btn btn-secondary" style="background:#bfbdbd;height:35px"></button>\
											    <button type="button" class="btn btn-secondary" style="background:#ef5858"></button>\
											    <button type="button" class="btn btn-secondary" style="background:#ed9344"></button>\
											    <button type="button" class="btn btn-secondary" style="background:#e2db09"></button>\
											    <button type="button" class="btn btn-secondary" style="background:#35d130"></button>\
											    <button type="button" class="btn btn-secondary" style="background:#3c7de5"></button>\
											    <button type="button" class="btn btn-secondary btn-color" style="background:#9737ba"></button>\
										  </div>\
										</div>\
									</div>\
								</div>\
							</div>\
			        	</form>\
					</div>\
					<div class="modal-footer">\
						<div id="error-tag"></div>\
						<button type="button" id="submit-changes" class="btn btn-primary">' + btnText + '</button>\
					</div>\
				</div>\
			</div>\
		</div>';

	return editStr;
}

function successModal(){
	const successStr = 
		'<div class="modal fade" id="success-modal">\
			  	<div class="modal-dialog" role="document">\
			    	<div class="modal-content">\
			      		<div class="modal-body">\
			       			 <h6 class="text-center">Changes Saved!</h6>\
			       			 <div class="text-center"><i class="fa fa-check-circle" aria-hidden="true"></i></div>\
			      		</div>\
			    	</div>\
			  	</div>\
		</div>';

	return successStr;
}
