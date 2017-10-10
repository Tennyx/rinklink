
let monthVar = 0;
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
let calData = {
				months: {},
				events: {}
			};

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
			        <button id="editEvent" type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" data-dismiss="modal">EDIT</button>\
			      </div>\
			    </div>\
			  </div>\
			</div>\
			<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">\
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
			        		</form>\
						</div>\
						<div class="modal-footer">\
							<button type="button" id="submitChanges" class="btn btn-primary" data-dismiss="modal">Submit Changes</button>\
						</div>\
					</div>\
				</div>\
			</div>');

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


		$('#eventModal').on('hidden.bs.modal', function () {
   			$('#eventModal').remove();
   		});
   		$('#editModal').on('hidden.bs.modal', function () {
   			$('#editModal').remove();
   		});

   		$('#submitChanges').click(function(){
   			$('#' + currentNode).remove();
   			delete calData.events[currentNode];
   			let editId = createId($('#editEvent').val() + $('#editTimeStart').val() + $('#editTimeEnd').val());
   			calData.events[editId] = {};
			let editTitle = calData.events[editId]['title'] = $('#editEvent').val();
   			calData.events[editId]['startTime'] = $('#editTimeStart').val();
   			calData.events[editId]['endTime'] = $('#editTimeEnd').val();
   			calData.events[editId]['desc'] = $('#editDesc').val();
   			$('#eventDiv').append(
				'<div id="' + editId + '" class="cellData" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#eventModal">' + editTitle + '</div>'
			);
			$('#eventModal').on('hidden.bs.modal', function () {
   				$('#eventModal').remove();
   			});
   			$('#editModal').on('hidden.bs.modal', function () {
   				$('#editModal').remove();
   			});

   		});
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
   			console.log(calData);
	   		$('#eventDiv').append(
				'<div id="' + eventId + '" class="cellData" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#eventModal">' + eventTitle + '</div>'
			);
	   	}
	   	
	   	$('#createEventMod').on('hidden.bs.modal', function () {
    		$(this).find("input,textarea,select").val('').end();
    		$('#eventModal').remove();
    		$('#editModal').remove();
		});

	});

});