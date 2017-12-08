function editEvent(eventNode, obj1, obj2){

		$('#event-div').append(editModal(
			calData[obj1][obj2][eventNode].title,
			calData[obj1][obj2][eventNode].desc,
			calData[obj1][obj2][eventNode].color,
			'Edit Event',
			'Submit Changes'
		));



		$('form').on('submit', function(event){
			event.preventDefault();
		});

		$("#edit-modal").keyup(enterFunction);

		$("#edit-time-start option[value='" + calData[obj1][obj2][eventNode].startTime + "']").attr("selected","selected");
		$("#edit-time-end option[value='" + calData[obj1][obj2][eventNode].endTime + "']").attr("selected","selected");

		$('.dropdown-menu button').click(function(){
			let calColorPick = $(this).css("background-color");
			$('#edit-main-color').css('background', calColorPick);
			$("#edit-modal").focus(); //for enter key trigger
		});

		$('#submit-changes').click(function(){
			delete calData[obj1][obj2][eventNode];
			let calId = $('#' + eventNode).parent().parent().attr("id") + '-' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
			let calTitle = $('#edit-event').val();
			let calColor = $('#edit-main-color').css("background-color");
			let calStart = $('#edit-time-start').val();
			let calEnd = $('#edit-time-end').val();
			let calDesc = $('#edit-desc').val();

			if(calId in calData[createId(monthHeader)]){
				alert('Event with same title, start & end date already exists for this date.');
				return;
			}
			
			calData[createId(monthHeader)][calId] = {
				'title': calTitle,
				'startTime': calStart,
				'endTime': calEnd,
				'desc': calDesc,
				'color': calColor	
			};
			
			$('#' + eventNode).replaceWith(
				'<div id="' + calId + '"' + 'style="background-color:' + calColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(calTitle, calStart, calEnd) + '</div>'
			);

			sortByTime($('#' + calId).parent().parent().attr("id"));
		});
		
		$('#edit-modal').on('hidden.bs.modal', function () {
			$('#edit-modal').remove();
		});
}