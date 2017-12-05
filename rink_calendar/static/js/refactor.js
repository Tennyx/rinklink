		function editFunc(appendToDiv, editNode){

	   		let calNode = this.id;

	   		$(appendToDiv).append(eventModal(
				calData.months[createId(monthHeader)][calNode].title,
				calData.months[createId(monthHeader)][calNode].startTime,
				calData.months[createId(monthHeader)][calNode].endTime,
				calData.months[createId(monthHeader)][calNode].desc
	   		));

   			$(appendToDiv).append(editModal(
   				calData.months[createId(monthHeader)][calNode].title,
   				calData.months[createId(monthHeader)][calNode].desc,
   				calData.months[createId(monthHeader)][calNode].color,
   				'Edit Event',
   				'Submit Changes'
   			));

   			$("#edit-time-start option[value='" + calData.months[createId(monthHeader)][calNode].startTime + "']").attr("selected","selected");
   			$("#edit-time-end option[value='" + calData.months[createId(monthHeader)][calNode].endTime + "']").attr("selected","selected");

   			$('.dropdown-menu button').click(function(){
				let calColorPick = $(this).css("background-color");
				$('#edit-main-color').css('background', calColorPick);
			});

			$('#submit-changes').click(function(){
	   			delete calData.months[createId(monthHeader)][calNode];
	   			let calId = $('#' + calNode).parent().parent().attr("id") + '-' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
				let calTitle = $('#edit-event').val();
				let calColor = $('#edit-main-color').css("background-color");
	   			let calStart = $('#edit-time-start').val();
	   			let calEnd = $('#edit-time-end').val();
	   			let calDesc = $('#edit-desc').val();

	   			if(calId in calData.months[createId(monthHeader)]){
	   				alert('Event with same title, start & end date already exists for this date.');
	   				return;
    			}
	   			
	   			calData.months[createId(monthHeader)][calId] = {
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
   		}

   		editFunc('#event-div', this.id)