function editEvent(eventNode, obj1, obj2){
	$('#edit-event').click(function(){

		let calNode = eventNode;

		$('#event-div').append(editModal(
			calData[obj1][obj2][calNode].title,
			calData[obj1][obj2][calNode].desc,
			calData[obj1][obj2][calNode].color,
			'Edit Event',
			'Submit Changes'
		));

		let enterFunction = function(){
			if (event.keyCode == 13 && document.activeElement.tagName !== 'TEXTAREA') {
				console.log(document.activeElement.tagName);
				$('#submit-changes').click();
			}
		}

		$('form').on('submit', function(event){
			event.preventDefault();
		});

		$("#edit-modal").keyup(enterFunction);

		$("#edit-time-start option[value='" + calData[obj1][obj2][calNode].startTime + "']").attr("selected","selected");
		$("#edit-time-end option[value='" + calData[obj1][obj2][calNode].endTime + "']").attr("selected","selected");

		$('.dropdown-menu button').click(function(){
			let calColorPick = $(this).css("background-color");
			$('#edit-main-color').css('background', calColorPick);
			$("#edit-modal").focus(); //for enter key trigger
		});

		$('#submit-changes').click(function(){
			delete calData[obj1][obj2][calNode];
			let calId = $('#' + calNode).parent().parent().attr("id") + '-' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
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
			
			$('#' + calNode).replaceWith(
				'<div id="' + calId + '"' + 'style="background-color:' + calColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(calTitle, calStart, calEnd) + '</div>'
			);

			sortByTime($('#' + calId).parent().parent().attr("id"));
		});
		
		$('#edit-modal').on('hidden.bs.modal', function () {
			$('#edit-modal').remove();
		});
	});

	$('#verify-btn').click(function(){
		$('#event-div').append(verifyModal);	

		$('#delete-event').click(function(){
			delete calData[obj1][obj2][calNode];
			console.log($('#' + calNode).parent());
			$('#' + calNode).parent().remove();
		});

		$('#verify-modal').on('hidden.bs.modal', function () {
			$('#verify-modal').remove();
		});
	});

	$('#event-modal').on('hidden.bs.modal', function () {
		$('#event-modal').remove();
	});
}