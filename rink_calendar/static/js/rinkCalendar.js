
let monthVar = 0;
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
let calData = {
				months: {},
				events: {}
			};
let toggleSort = false;

function createId(data){
	let acceptableChar = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let newId = ''

	for(i=0;i<data.length;i++){
		let isLetter = acceptableChar.indexOf(data[i].toLowerCase());
		if(isLetter >= 0){
			newId += data[i];
		}
	}
	return newId;
}

function createEventDisplay(title, timeStart, timeEnd){
    let startHour = timeStart.split(':')[0]
    let startMinutes = timeStart.split(':')[1];
    let endHour = timeEnd.split(':')[0];
    let endMinutes = timeEnd.split(':')[1];
    let displayTitle = title.substring(0,10);
    let startDisplay = '';
    let endDisplay = '';
    
    if(title.length > 10){
        displayTitle += '...'
    } 
    
    if((endMinutes[0] || endMinutes[1]) > 0){
        endDisplay = endHour + ':' + endMinutes.substring(0,3);
    }
    else{
        endDisplay = endHour + endMinutes[2];
    }
    
    if((startMinutes[0] || startMinutes[1]) > 0){
        startDisplay = startHour + ':' + startMinutes.substring(0,3);
    }
    else{
        startDisplay = startHour + startMinutes[2];
    }
    
    return displayTitle + ' ' + '<span class="time-display">' + startDisplay + '-' + endDisplay + '</span>';
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if(document.getElementById(data).id[0] == 'e' || ev.altKey){
    	let nodeCopy = document.getElementById(data).cloneNode(true);	
    	nodeCopy.id = ev.target.id + nodeCopy.textContent;
    	el.appendChild(nodeCopy);
    }
    else{
    	let nodeInd = document.getElementById(data);
    	nodeInd.id = ev.target.id + nodeInd.textContent;
    	el.appendChild(nodeInd);	
    }
}


function createCal(date){
	let monthStart = moment(date).startOf('month').weekday();
	let monthDays = moment(date).daysInMonth();
	let monthWeeks = Math.floor((monthDays + monthStart) / 7);
	let firstWeekCounter = monthStart;
	let calendar = [];
	let weeks = ['<tr><th class="text-center">SUN</th><th class="text-center">MON</th><th class="text-center">TUE</th><th class="text-center">WED</th><th class="text-center">THUR</th><th class="text-center">FRI</th><th class="text-center">SAT</th></tr>'];
	let firstWeek = [];
	let firstDays = 1;

	for(i=0;i<7;i++){
		if(firstWeekCounter > 0){
			firstWeek.push('<td class="cellShell nodate"></td>');	
			firstWeekCounter -= 1;
		}
		else{
			firstWeek.push(
				'<td class="cellShell" ondrop="drop(event, this)" ondragover="allowDrop(event)" id="' + firstDays + '">\
					<div class="dateNum">' + firstDays +'</div>\
				</td>'
			);
			firstDays += 1;
		}
		
	}

	if(firstWeek){
		weeks.push('<tr>' + firstWeek + '</tr>')
	}

	for(day=8-monthStart;day<=monthDays;day){
		let daysInWeek = [];
		for(i=0;i<7;i++){
			daysInWeek.push(
				'<td class="cellShell" ondrop="drop(event, this)" ondragover="allowDrop(event)" id=' + day + '>\
					<div class="dateNum">' + day +'</div>\
				</td>'
			);
			day++
			if(day > monthDays){
				break;
			}
		}
		weeks.push('<tr>' + daysInWeek + '</tr>');
	}

	
	$('#rinkCal').empty();
	$('#rinkCal').append(weeks);
	$('#month-header').html(monthHeader);

	$.getJSON( "/rink-calendar/api/?format=json", function( data ) {
  		for(let i=0; i <data.length;i++){
  			if(data[i].monthYear == monthHeader){
				for(let num=1;num<Object.keys(data[i]).length-2;num++){
					let findKey = 'c' + num;
					$('#' + num).append('<div class="cellData" id="c' + num + '">' + data[i][findKey] + '</div>');
				}
  			}
  		}
  	});	
}

$( document ).ready(function() {

	$( ".sortable" ).sortable();
	$( ".sortable" ).sortable( "option", "disabled", true );

	createCal();
	
	$('#fwd').click(function(){
   		monthVar += 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
		createCal(monthHeader);
   	});

   	$('#currentMonth').click(function(){
   		monthVar = 0;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
		createCal(monthHeader);
   	});

   	$('#back').click(function(){
   		monthVar -= 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
   		createCal(monthHeader);
   	});

   	$('#rinkCal').on('click','.cellData',function(){
   		// $modal.modal('show');
   	});

   	$('#editEvent').click(function(){
   		// $('#eventDiv').append(
   		// 	);
   		// $('#editModal').on('hidden.bs.modal', function () {
   		// 	$('#editModal').remove();
   		// });
   	});

   	$('#eventDiv').on('click','.cellData',function(){
   		
   		let currentNode = this.id;
   		console.log(currentNode);

   		$('#eventDiv').append(
	   		'<div class="modal fade" id="eventModal">\
			  <div class="modal-dialog" role="document">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <h5 class="modal-title">Event Details</h5>\
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
			          <span aria-hidden="true">&times;</span>\
			        </button>\
			      </div>\
			      <div class="modal-body">' +
			        'Event: ' + calData.events[currentNode].title + '<br>' +
			        'Time: ' + calData.events[currentNode].startTime + ' to ' + calData.events[currentNode].endTime + '<br>' +
			        'Description: ' + calData.events[currentNode].desc + '<br>' +
			      '</div>\
			      <div class="modal-footer">\
			      	<button type="button" id="verifyBtn" class="btn btn-danger" data-toggle="modal" data-target="#verifyModal" data-dismiss="modal">Delete Event</button>\
			        <button id="editEvent" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" data-dismiss="modal">EDIT</button>\
			      </div>\
			    </div>\
			  </div>\
			</div>'
			);

   		$('#editEvent').click(function(){
   			$('#eventDiv').append(
   				'<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">\
				<div class="modal-dialog" role="document">\
					<div class="modal-content">\
						<div class="modal-header">\
							<h5 class="modal-title" id="eventModalLabel">Modal title</h5>\
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">\
							<span aria-hidden="true">&times;</span>\
							</button>\
						</div>\
						<div class="modal-body">\
				        	<form>\
			          			<div class="form-group">\
			            			<label for="editEvent" class="form-control-label">Event Title:</label>\
			            			<input type="text" value="' + calData.events[currentNode].title + '" class="form-control" id="editEvent">\
			          			</div>\
			          			<div class="form-group">\
			            			<label for="editTimeStart" class="form-control-label">Time:</label>\
			            			<select id="editTimeStart"> to\
	            					\
	            					</select>\
	            					<select id="editTimeEnd">\
			            			\
			            			</select>\
			          			</div>\
			         			<div class="form-group">\
			            			<label for="editDesc" class="form-control-label">Description:</label>\
			            			<textarea class="form-control" id="editDesc">' + calData.events[currentNode].desc + '</textarea>\
			          			</div>\
			          			<div class="form-group">\
			          				<label for="editColor" class="form-control-label">Color:</label>\
				          			<div class="btn-group">\
									  <button type="button" class="btn btn-secondary" id="editMainColor" style="background-color:' + calData.events[currentNode].color + '"> </button>\
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
			</div>'
   			);

   			for(i=0;i<timeArr.length;i++){
				$('#editTimeStart').append('<option value="' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeStart').append('<option value="' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeStart').append('<option value="' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeStart').append('<option value="' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeEnd').append('<option value="' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeEnd').append('<option value="' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeEnd').append('<option value="' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '</option>');
				$('#editTimeEnd').append('<option value="' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '</option>');
			}

   			$("#editTimeStart option[value='" + calData.events[currentNode].startTime + "']").attr("selected","selected");
   			$("#editTimeEnd option[value='" + calData.events[currentNode].endTime + "']").attr("selected","selected");

   			$('.dropdown-menu button').click(function(){
				let editColorPick = $(this).css("background-color");
				$('#editMainColor').css('background', editColorPick);
			});

			$('#submitChanges').click(function(){
	   			delete calData.events[currentNode];
	   			let editId = 'e' + createId($('#editEvent').val() + $('#editTimeStart').val() + $('#editTimeEnd').val());
	   			calData.events[editId] = {};
				let editTitle = calData.events[editId]['title'] = $('#editEvent').val();
				let editColor = calData.events[editId]['color'] = $('#editMainColor').css("background-color");
	   			let editStart = calData.events[editId]['startTime'] = $('#editTimeStart').val();
	   			let editEnd = calData.events[editId]['endTime'] = $('#editTimeEnd').val();
	   			calData.events[editId]['desc'] = $('#editDesc').val();
	   			
	   			$('#' + currentNode).replaceWith(
					'<div id="' + editId + '"' + 'style="background-color:' + editColor + '" class="cellData" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#eventModal">' + createEventDisplay(editTitle, editStart, editEnd) + '</div>'
				);
			});
   			
   			$('#editModal').on('hidden.bs.modal', function () {
   				$('#editModal').remove();
   			});
   		});

   		$('#verifyBtn').click(function(){
   			$('#eventDiv').append(
   				'<div class="modal fade" id="verifyModal">\
			  		<div class="modal-dialog" role="document">\
			    		<div class="modal-content">\
			      			<div class="modal-body">\
			       			 <h6 class="text-center">Are you sure you want to delete this event?</h6>\
			      			<button type="button" id="deleteEvent" class="btn btn-danger" data-dismiss="modal">Yes</button>\
			        		<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>\
			      			</div>\
			    		</div>\
			  		</div>\
				</div>'
			);	

			$('#deleteEvent').click(function(){
   				delete calData.events[currentNode];
   				$('#' + currentNode).remove();
   			});

   			$('#verifyModal').on('hidden.bs.modal', function () {
   				$('#verifyModal').remove();
   			});
   		});

		
		$('#eventModal').on('hidden.bs.modal', function () {
   			$('#eventModal').remove();
   		});
   	});

	

	$('#createEvent').click(function(){

		$('#eventDiv').append(createModal);

		for(i=0;i<timeArr.length;i++){
			$('#eventTimeStart').append('<option value="' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeStart').append('<option value="' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeStart').append('<option value="' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeStart').append('<option value="' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeEnd').append('<option value="' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':00' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeEnd').append('<option value="' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':15' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeEnd').append('<option value="' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':30' + (i<12 ? 'pm' : 'am') + '</option>');
			$('#eventTimeEnd').append('<option value="' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '">' + timeArr[i] + ':45' + (i<12 ? 'pm' : 'am') + '</option>');
		}

		$('.dropdown-menu button').click(function(){
			let eventColorPick = $(this).css("background-color");
			$('#eventMainColor').css('background', eventColorPick);
		});

	   	$('#saveNewEvent').click(function(){
	   		let eventId = 'e' + createId($('#rinkEvent').val() + $('#eventTimeStart').val() + $('#eventTimeEnd').val());

	   		if(eventId in calData){
	   			alert('Event with same title, time & price already exist.');
	   			return;
	   		}
	   		else{
	   			calData.events[eventId] = {};
	   			let eventTitle = calData.events[eventId]['title'] = $('#rinkEvent').val();
	   			let eventStart = calData.events[eventId]['startTime'] = $('#eventTimeStart').val();
	   			let eventEnd = calData.events[eventId]['endTime'] = $('#eventTimeEnd').val()
	   			let eventDesc = calData.events[eventId]['desc'] = $('#eventDesc').val();
	   			let eventColor = calData.events[eventId]['color'] = $('#eventMainColor').css("background-color");
	   			console.log(calData);
		   		$('#eventDiv').append(
					'<div id="' + eventId + '"' + 'style="background-color:' + eventColor + '" class="cellData" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#eventModal">' + createEventDisplay(eventTitle, eventStart, eventEnd) + '</div>'
				);
		   	}
		});

		$('#createEventMod').on('hidden.bs.modal', function () {
	    	$('#createEventMod').remove();
		});
	});


	

	$('#toggle-sort').click(function(){
		if(toggleSort){
			$('#toggle-sort').css('background-color', 'white');
			toggleSort = false;
			$( ".sortable" ).sortable( "option", "disabled", true );
		}
		else{
			$('#toggle-sort').css('background-color', '#77abff');
			toggleSort = true;
			$( ".sortable" ).sortable( "option", "disabled", false );
		}
	});

});