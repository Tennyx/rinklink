function createNewEvent(){
	$('#event-div').append(editModal('','','#bfbdbd', 'New Event', 'Create Event'));

	$('form').on('submit', function(event){
		event.preventDefault();
	});

	$("#edit-modal").keyup(enterFunction);


	$('.dropdown-menu button').click(function(){
		let eventColorPick = $(this).css("background-color");
		$('#edit-main-color').css('background', eventColorPick);
		$("#edit-modal").focus(); //for enter key trigger
	});

	$('#submit-changes').click(function(){
		let eventId = '_' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());

		if(eventId in calData.events.eventList){
			alert('Event with same title, start & end time already exists.');
			return;
		}
		else{
			calData.events.eventList[eventId] = {};
			let eventTitle = calData.events.eventList[eventId]['title'] = $('#edit-event').val();
			let eventStart = calData.events.eventList[eventId]['startTime'] = $('#edit-time-start').val();
			let eventEnd = calData.events.eventList[eventId]['endTime'] = $('#edit-time-end').val()
			let eventDesc = calData.events.eventList[eventId]['desc'] = $('#edit-desc').val();
			let eventColor = calData.events.eventList[eventId]['color'] = $('#edit-main-color').css("background-color");
   
			$('#event-div').append(
				'<div class="event-wrap">\
					<span class="close" data-toggle="modal" data-target="#verify-modal">&times;</span>\
					<span class="ed" data-toggle="modal" data-target="#edit-modal"><i class="fa fa-pencil" aria-hidden="true"></i></span>\
					<div id="' + eventId + '"' + 'style="background-color:' + eventColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(eventTitle, eventStart, eventEnd) + '</div>\
				</div>'
			);
		}
	});

	$('#edit-modal').on('hidden.bs.modal', function () {
		$('#edit-modal').remove();
	});
}