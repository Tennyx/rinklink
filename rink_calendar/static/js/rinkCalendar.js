
let monthVar = 0;
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
let calData = {
				months: {},
				events: {}
			};


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

	$('#eventDiv').append(
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
	            			<label for="eventTime" class="form-control-label">Time:</label>\
	            			<input type="text" class="form-control" id="eventTime">\
	          			</div>\
	          			<div class="form-group">\
	            			<label for="eventPrice" class="form-control-label">Price:</label>\
	            			<input type="text" class="form-control" id="eventPrice">\
	          			</div>\
	         			<div class="form-group">\
	            			<label for="eventDesc" class="form-control-label">Description:</label>\
	            			<textarea class="form-control" id="eventDesc"></textarea>\
	          			</div>\
	        		</form>\
					</div>\
					<div class="modal-footer">\
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
						<button id="saveNewEvent" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>\
					</div>\
				</div>\
			</div>\
		</div>'
		
		);

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
   		
   	});

   	$('#eventDiv').on('click','.cellData',function(){
   		console.log(calData);
   		console.log(this.id);
   		console.log(calData.events[this.id].title);
   		$('#eventDiv').append(
   			'<div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel" aria-hidden="true">\
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
			            			<label for="rinkEvent" class="form-control-label">Event Title:</label>\
			            			<input type="text" value="' + calData.events[this.id].title + '" class="form-control" id="rinkEvent">\
			          			</div>\
			          			<div class="form-group">\
			            			<label for="eventTime" class="form-control-label">Time:</label>\
			            			<input type="text" value="' + calData.events[this.id].time + '" class="form-control" id="eventTime">\
			          			</div>\
			          			<div class="form-group">\
			            			<label for="eventPrice" class="form-control-label">Price:</label>\
			            			<input type="text" value="' + calData.events[this.id].price + '" class="form-control" id="eventPrice">\
			          			</div>\
			         			<div class="form-group">\
			            			<label for="eventDesc" class="form-control-label">Description:</label>\
			            			<textarea class="form-control" id="eventDesc">' + calData.events[this.id].desc + '</textarea>\
			          			</div>\
			        		</form>\
						</div>\
						<div class="modal-footer">\
							<button type="button" class="saveBtn btn btn-primary">SAVE</button>\
						</div>\
					</div>\
				</div>\
			</div>');
   		$('#eventModal').on('hidden.bs.modal', function () {
   			$('#eventModal').remove();
   		});
   	});

   	// $('.saveBtn').click(function(){

   	// });



   	$('#saveNewEvent').click(function(){
   		let eventId = $('#rinkEvent').val() + $('#eventTime').val() + $('#eventPrice').val();

   		if(eventId in calData){
   			alert('Event with same title, time & price already exist.');
   			return;
   		}
   		else{
   			calData.events[eventId] = {};
   			let eventTitle = calData.events[eventId]['title'] = $('#rinkEvent').val();
   			let eventTime = calData.events[eventId]['time'] = $('#eventTime').val();
   			let eventPrice = calData.events[eventId]['price'] = $('#eventPrice').val();
   			let eventDesc = calData.events[eventId]['desc'] = $('#eventDesc').val();
   			console.log(calData);
	   		$('#eventDiv').append(
				'<div id="' + eventId + '" class="cellData" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#eventModal">' + eventTitle + '</div>'
			 );
	   	}
	   	
	   	$('#createEventMod').on('hidden.bs.modal', function () {
    		$(this).find("input,textarea,select").val('').end();
		});
	});

});