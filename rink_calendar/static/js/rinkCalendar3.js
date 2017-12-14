//globals

let monthVar = 0;
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
let calData = {
			months: {},
			events: {
				eventList: {}
			},
			eventOrder: ''
			};
let toggleSort = false;
let calUser = window.location.search.substring(1).substring(2);

//keyboard functions

let enterFunction = function(){
	if (event.keyCode == 13 && document.activeElement.tagName !== 'TEXTAREA') {
		$('#submit-changes').click();
	}
}

//modal functions

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
			$('#error-tag').html('Event with same title, start & end date already exists.');
			$('#error-tag').addClass('alert alert-danger');
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

		$('#edit-modal').modal('hide');
	});

	$('#edit-modal').on('hidden.bs.modal', function () {
		$('#edit-modal').remove();
	});
}

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
	console.log(eventNode);
	$('#submit-changes').click(function(){
		let calId = '';

		if(obj1 == 'months'){
			calId = $('#' + eventNode).parent().parent().attr("id") + '-' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
		}
		else{
			calId = '_' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
		}	
		let calTitle = $('#edit-event').val();
		let calColor = $('#edit-main-color').css("background-color");
		let calStart = $('#edit-time-start').val();
		let calEnd = $('#edit-time-end').val();
		let calDesc = $('#edit-desc').val();

		if(calId in calData[obj1][obj2] && calId !== eventNode){
			$('#error-tag').html('Event with same title, start & end date already exists.');
			$('#error-tag').addClass('alert alert-danger');
			return;
		}

		$('#edit-modal').modal('hide');

		delete calData[obj1][obj2][eventNode];
		
		calData[obj1][obj2][calId] = {
			'title': calTitle,
			'startTime': calStart,
			'endTime': calEnd,
			'desc': calDesc,
			'color': calColor	
		};
		
		$('#' + eventNode).replaceWith(
			'<div id="' + calId + '"' + 'style="background-color:' + calColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(calTitle, calStart, calEnd) + '</div>'
		);
		
		if(obj1 === 'months'){
			sortByTime($('#' + calId).parent().parent().attr("id"));
		}
	});
	
	$('#edit-modal').on('hidden.bs.modal', function () {
		$('#edit-modal').remove();
	});
}

function verify(eventNode, obj1, obj2){
	console.log($('#' + eventNode).parent());
	if(eventNode[0] === '_'){
		$('#event-div').append(verifyModal);

		$('#delete-event').click(function(){
			delete calData[obj1][obj2][eventNode];
			$('#' + eventNode).parent().remove();
		});
	}	
	else{
		delete calData[obj1][obj2][eventNode];
		$('#' + eventNode).parent().remove();
	}	
	
	$('#verify-modal').on('hidden.bs.modal', function () {
		$('#verify-modal').remove();
	});
}

//load from DB

$.getJSON( "/rink-calendar/api/?q=" + calUser, function( data ) {
	calData = data.user_data		
});	

//creates HTML IDs, filters anything not alphanumeric

function createId(data){
	let acceptableChar = '-abcdefghijklmnopqrstuvwxyz0123456789';
	let newId = ''

	for(i=0;i<data.length;i++){
		let isLetter = acceptableChar.indexOf(data[i].toLowerCase());
		if(isLetter >= 0){
			newId += data[i];
		}
	}
	return newId;
}

//creates display title of event tiles

function createEventDisplay(title, timeStart, timeEnd){
    let startHour = timeStart.split(':')[0]
    let startMinutes = timeStart.split(':')[1];
    let endHour = timeEnd.split(':')[0];
    let endMinutes = timeEnd.split(':')[1];
    let displayTitle = title.substring(0,12);
    let startDisplay = '';
    let endDisplay = '';
    
    if(title.length > 12){
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

//sorts events by time

function sortByTime(parentId){
	let sortTimeArr = [];

    $('#' + parentId).children('.event-wrap').each(function(){
    	let timeCheck = calData.months[createId(monthHeader)][this.childNodes[5].id].startTime;
    	let sortHour = parseInt(timeCheck.split(':')[0]);
    	let sortMin = timeCheck.split(':')[1].substr(0,2);
    	let timeTotal = 0;

    	if (timeCheck.indexOf('p') > -1 && sortHour !== 12){
			sortHour += 12;
		}

		timeTotal = parseInt(sortHour.toString() + sortMin);
		sortTimeArr.push({
			'node': this,
			'number': timeTotal
		});
	});

    sortTimeArr = sortTimeArr.sort(function (a, b) {
    	return parseFloat(a.number) - parseFloat(b.number);
	});

    $('#' + parentId).children('.cell-data').remove();

    for(i=0;i<sortTimeArr.length;i++){
    	$('#' + parentId).append(sortTimeArr[i].node);
    }
}

//drag & drop functions

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let nodeMetaData = '';
    let wholeNode = document.getElementById(data).parentNode;
    let idCut = wholeNode.parentNode.id.length;
    let droppedNodeId = '';
    
    if($('#' + ev.target.id).hasClass('cell-data') || $('#' + ev.target.id).hasClass('date-num')){
    	return
    }

    if(document.getElementById(data).id[0] == '_' || ev.altKey){
    	let wholeNodeCopy = wholeNode.cloneNode(true);
    	let eventNodeCopy = wholeNodeCopy.childNodes[5];

    	if(eventNodeCopy.id[0] === '_'){
    		nodeMetaData = jQuery.extend(true, {}, calData.events.eventList[eventNodeCopy.id]);		
    		eventNodeCopy.id = createId(ev.target.id + '-' + eventNodeCopy.id);
    	}
    	else{
    		nodeMetaData = jQuery.extend(true, {}, calData.months[createId(monthHeader)][eventNodeCopy.id]);
    		eventNodeCopy.id = createId(ev.target.id + eventNodeCopy.id.substr(idCut));
    	}

    	while(eventNodeCopy.id in calData.months[createId(monthHeader)]){
			nodeMetaData.title += ' copy';
			eventNodeCopy.id = createId(ev.target.id + '-' + nodeMetaData.title + nodeMetaData.startTime + nodeMetaData.endTime);
			eventNodeCopy.innerHTML = createEventDisplay(nodeMetaData.title, nodeMetaData.startTime, nodeMetaData.endTime);
    	}
    	
    	droppedNodeId = eventNodeCopy.id;
    	wholeNode = wholeNodeCopy
 	}
    else{
    	let eventNodeInd = document.getElementById(data);

    	if(createId(ev.target.id + eventNodeInd.id.substr(idCut)) in calData.months[createId(monthHeader)]){
    		alert('Event with same name and times already exists.');
    		return
    	}
    	
		nodeMetaData = calData.months[createId(monthHeader)][eventNodeInd.id];
    	
    	delete calData.months[createId(monthHeader)][eventNodeInd.id];
    	eventNodeInd.id = createId(ev.target.id + eventNodeInd.id.substr(idCut));
    	

    	droppedNodeId = eventNodeInd.id;
	}
    
    el.appendChild(wholeNode);

	calData.months[createId(monthHeader)][droppedNodeId] = {
		'title': nodeMetaData.title,
		'startTime': nodeMetaData.startTime,
		'endTime': nodeMetaData.endTime,
		'desc': nodeMetaData.desc,
		'color': nodeMetaData.color	
    };
	
	sortByTime(event.target.id);
}

//creates calendar

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
			firstWeek.push('<td class="cell-shell nodate"></td>');	
			firstWeekCounter -= 1;
		}
		else{
			firstWeek.push(
				'<td class="cell-shell" ondrop="drop(event, this)" ondragover="allowDrop(event)" id="' + firstDays + '">\
					<div class="date-num">' + firstDays +'</div>\
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
				'<td class="cell-shell" ondrop="drop(event, this)" ondragover="allowDrop(event)" id="' + day + '">\
					<div class="date-num">' + day +'</div>\
				</td>'
			);
			day++
			if(day > monthDays){
				break;
			}
		}
		weeks.push('<tr>' + daysInWeek + '</tr>');
	}

	
	$('#rink-cal').empty();
	$('#rink-cal').append(weeks);
	$('#month-header').html(monthHeader);

	if(createId(monthHeader) in calData.months){
		let savedData = calData.months[createId(monthHeader)];

		for (let key in savedData) {
    		if (savedData.hasOwnProperty(key)) {
    			$('#' + key.split('-')[0]).append(
    				'<div class="event-wrap">\
						<span class="close">&times;</span>\
						<span class="ed" data-toggle="modal" data-target="#edit-modal"><i class="fa fa-pencil" aria-hidden="true"></i></span>\
						<div id="' + key + '"' + 'style="background-color:' + savedData[key].color + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(savedData[key].title, savedData[key].startTime, savedData[key].endTime) + '</div>\
					</div>'
    			);
    			sortByTime(key.split('-')[0]);
       		}
		}
		return
	}
	else{
		calData.months[createId(monthHeader)] = {};	
	}
}

//after document loads

$(document).ready(function() {

	//fill out event list in proper order

	$('#event-div').append(calData.eventOrder);

	//create calendar

	createCal();

	//sort events in event list

	$( ".sortable" ).sortable();
	$( ".sortable" ).sortable( "option", "disabled", true );

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

	//cycle through months
	
	$('#fwd').click(function(){
   		monthVar += 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
		createCal(monthHeader);
   	});

   	$('#current-month').click(function(){
   		monthVar = 0;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
		createCal(monthHeader);
		console.log(calData);
   	});

   	$('#back').click(function(){
   		monthVar -= 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
   		createCal(monthHeader);
   	});

   	//calendar actions

   	$('#rink-cal').on('click','.cell-data',function(){

   		let calNode = this.id;

   		$('#event-div').append(eventModal(
			calData.months[createId(monthHeader)][calNode].title,
			calData.months[createId(monthHeader)][calNode].startTime,
			calData.months[createId(monthHeader)][calNode].endTime,
			calData.months[createId(monthHeader)][calNode].desc
   		));

   		$('#edit-event').click(function(){
   			editEvent(calNode, 'months', createId(monthHeader));	
   		});

   		$('#verify-btn').click(function(){
   			verify(calNode, 'months', createId(monthHeader));
   		});

   		$('#event-modal').on('hidden.bs.modal', function () {
   			$('#event-modal').remove();
   		});
   	});

   	//event list options

   	$('#create-event').click(function(){
		createNewEvent();
	});

   	
   	$('#event-div').on('click','.cell-data',function(){
   	
   		let currentNode = this.id;
   		
   		$('#event-div').append(eventModal(
			calData.events.eventList[currentNode].title,
			calData.events.eventList[currentNode].startTime,
			calData.events.eventList[currentNode].endTime,
			calData.events.eventList[currentNode].desc
   		));
	   
		$('#edit-event').click(function(){
			editEvent(currentNode, 'events', 'eventList');
   		});

   		$('#verify-btn').click(function(){
   			verify(currentNode, 'events', 'eventList');
   		});

		$('#event-modal').on('hidden.bs.modal', function () {
   			$('#event-modal').remove();
   		});
   	});

   	//edit and x event functions

   	$('#event-div').on('click','.close',function(){
   		let delNode = this.parentNode.childNodes[5].id;
		verify(delNode, 'events', 'eventList');
	});

   	$('#rink-cal').on('click','.close',function(){	
   		let calDelNode = this.parentNode.childNodes[5].id;
		verify(calDelNode, 'months', createId(monthHeader));
	});

	$('#event-div').on('click','.ed',function(){
   		let quickEditNode = this.parentNode.childNodes[5].id;
		editEvent(quickEditNode, 'events', 'eventList');
   	});

   	$('#rink-cal').on('click','.ed',function(){
   		let quickEditCal = this.parentNode.childNodes[5].id;
   		editEvent(quickEditCal, 'months', createId(monthHeader));
   	});

   	//save to database

   	$('#btn-save').click(function(){
   		calData.eventOrder = $('#event-div').html();

   		event.preventDefault();
		$.ajax({
    		type : "POST",
    		url : "/rink-calendar/api/",
    		csrfmiddlewaretoken: "{{ csrf_token }}",
    		data : JSON.stringify({"user_id": calUser, "user_data":calData}),
    		headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
      		},
    	success: function(){
        	$('#event-div').append(successModal());
        	$('#success-modal').modal('show');
        	$('#success-modal').on('hidden.bs.modal', function () {
   				$('#success-modal').remove();
   			});
      	},
    	error: function(XMLHttpRequest, textStatus, errorThrown) {
      		alert("some error " + String(errorThrown) + String(textStatus) + String(XMLHttpRequest.responseText));
      	}
    	});
   	});
});

