
//globals

let monthVar = 0;
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
let calData = {
			months: {},
			events: {}
			};
const timeArr = [12,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11];
let toggleSort = false;

//creates HTML IDs, filters anything not alphanumeric

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

//creates display of event tiles

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

//sorts events by time

function sortByTime(parentId){
		
	let sortTimeArr = [];

    $('#' + parentId).children('.cell-data').each(function(){
    	let timeCheck = calData.months[createId(monthHeader)][this.id].startTime;
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

//drag & Drop functions

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
    let idCut = $('#' + data).parent().attr("id").length;
    
    if($('#' + ev.target.id).hasClass('cell-data') || $('#' + ev.target.id).hasClass('date-num')){
    	return
    }

    if(document.getElementById(data).id[0] == '_' || ev.altKey){
    	let nodeCopy = document.getElementById(data).cloneNode(true);

    	if(nodeCopy.id[0] === '_'){
    		nodeMetaData = jQuery.extend(true, {}, calData.events[nodeCopy.id]);		
    		nodeCopy.id = createId(ev.target.id + nodeCopy.id);
    	}
    	else{
    		nodeMetaData = jQuery.extend(true, {}, calData.months[createId(monthHeader)][nodeCopy.id]);
    		nodeCopy.id = createId(ev.target.id + nodeCopy.id.substr(idCut));
    	}

    	while(nodeCopy.id in calData.months[createId(monthHeader)]){
			nodeMetaData.title += ' copy';
			nodeCopy.id = createId(ev.target.id + nodeMetaData.title + nodeMetaData.startTime + nodeMetaData.endTime);
			nodeCopy.innerHTML = createEventDisplay(nodeMetaData.title, nodeMetaData.startTime, nodeMetaData.endTime);
    	}
    	
    	
    	el.appendChild(nodeCopy);
    	calData.months[createId(monthHeader)][nodeCopy.id] = {
    		'title': nodeMetaData.title,
    		'startTime': nodeMetaData.startTime,
    		'endTime': nodeMetaData.endTime,
    		'desc': nodeMetaData.desc,
    		'color': nodeMetaData.color	
    	};
    }
    else{
    	let nodeInd = document.getElementById(data);

    	nodeMetaData = calData.months[createId(monthHeader)][nodeInd.id];
    	
    	delete calData.months[createId(monthHeader)][nodeInd.id];
    	nodeInd.id = createId(ev.target.id + nodeInd.id.substr(idCut));
    	el.appendChild(nodeInd);

    	calData.months[createId(monthHeader)][nodeInd.id] = {
    		'title': nodeMetaData.title,
    		'startTime': nodeMetaData.startTime,
    		'endTime': nodeMetaData.endTime,
    		'desc': nodeMetaData.desc,
    		'color': nodeMetaData.color	
    	};
    }
    
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
				'<td class="cell-shell" ondrop="drop(event, this)" ondragover="allowDrop(event)" id=' + day + '>\
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

	$.getJSON( "/rink-calendar/api/?format=json", function( data ) {
  		for(let i=0; i <data.length;i++){
  			if(data[i].monthYear == monthHeader){
				for(let num=1;num<Object.keys(data[i]).length-2;num++){
					let findKey = 'c' + num;
					$('#' + num).append('<div class="cell-data" id="c' + num + '">' + data[i][findKey] + '</div>');
				}
  			}
  		}
  	});

	if(createId(monthHeader) in calData.months){
		return
	}
	else{
		calData.months[createId(monthHeader)] = {};	
	}
}

//after document loads

$( document ).ready(function() {

	createCal();

	//sortable functions

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
   	});

   	$('#back').click(function(){
   		monthVar -= 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
   		createCal(monthHeader);
   	});

   	//calendar actions

   	$('#rink-cal').on('click','.cell-data',function(){
   		console.log(calData);
   		let calNode = this.id;

   		$('#event-div').append(eventModal(
			calData.months[createId(monthHeader)][calNode].title,
			calData.months[createId(monthHeader)][calNode].startTime,
			calData.months[createId(monthHeader)][calNode].endTime,
			calData.months[createId(monthHeader)][calNode].desc
   		));

   		$('#edit-event').click(function(){
   			$('#event-div').append(editModal(
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
	   			let calId = $('#' + calNode).parent().attr("id") + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
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
	
				sortByTime($('#' + calId).parent().attr("id"));
			});
   			
   			$('#edit-modal').on('hidden.bs.modal', function () {
   				$('#edit-modal').remove();
   			});
   		});

   		$('#verify-btn').click(function(){
   			$('#event-div').append(verifyModal);	

			$('#delete-event').click(function(){
   				delete calData.months[createId(monthHeader)][calNode];
   				$('#' + calNode).remove();
   			});

   			$('#verify-modal').on('hidden.bs.modal', function () {
   				$('#verify-modal').remove();
   			});
   		});

   		$('#event-modal').on('hidden.bs.modal', function () {
   			$('#event-modal').remove();
   		});
   	});

   	//event list options

   	$('#create-event').click(function(){

		$('#event-div').append(editModal('','','#bfbdbd', 'New Event', 'Create Event'));

		$('.dropdown-menu button').click(function(){
			let eventColorPick = $(this).css("background-color");
			$('#edit-main-color').css('background', eventColorPick);
		});

	   	$('#submit-changes').click(function(){
	   		let eventId = '_' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());

	   		if(eventId in calData.events){
	   			alert('Event with same title, start & end time already exists.');
	   			return;
	   		}
	   		else{
	   			calData.events[eventId] = {};
	   			let eventTitle = calData.events[eventId]['title'] = $('#edit-event').val();
	   			let eventStart = calData.events[eventId]['startTime'] = $('#edit-time-start').val();
	   			let eventEnd = calData.events[eventId]['endTime'] = $('#edit-time-end').val()
	   			let eventDesc = calData.events[eventId]['desc'] = $('#edit-desc').val();
	   			let eventColor = calData.events[eventId]['color'] = $('#edit-main-color').css("background-color");
	   			console.log(calData);
		   		$('#event-div').append(
					'<div id="' + eventId + '"' + 'style="background-color:' + eventColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(eventTitle, eventStart, eventEnd) + '</div>'
				);
		   	}
		});

		$('#edit-modal').on('hidden.bs.modal', function () {
	    	$('#edit-modal').remove();
		});
	});

   	
   	$('#event-div').on('click','.cell-data',function(){
   		
   		let currentNode = this.id;
   		
   		$('#event-div').append(eventModal(
			calData.events[currentNode].title,
			calData.events[currentNode].startTime,
			calData.events[currentNode].endTime,
			calData.events[currentNode].desc
   		));
	   

   		$('#edit-event').click(function(){
   			$('#event-div').append(editModal(
   				calData.events[currentNode].title,
   				calData.events[currentNode].desc,
   				calData.events[currentNode].color,
   				'Edit Event',
   				'Submit Changes'
   			));

   			$("#edit-time-start option[value='" + calData.events[currentNode].startTime + "']").attr("selected","selected");
   			$("#edit-time-end option[value='" + calData.events[currentNode].endTime + "']").attr("selected","selected");

   			$('.dropdown-menu button').click(function(){
				let editColorPick = $(this).css("background-color");
				$('#edit-main-color').css('background', editColorPick);
			});

			$('#submit-changes').click(function(){
	   			delete calData.events[currentNode];
	   			let editId = '_' + createId($('#edit-event').val() + $('#edit-time-start').val() + $('#edit-time-end').val());
	   			calData.events[editId] = {};
				let editTitle = calData.events[editId]['title'] = $('#edit-event').val();
				let editColor = calData.events[editId]['color'] = $('#edit-main-color').css("background-color");
	   			let editStart = calData.events[editId]['startTime'] = $('#edit-time-start').val();
	   			let editEnd = calData.events[editId]['endTime'] = $('#edit-time-end').val();
	   			calData.events[editId]['desc'] = $('#edit-desc').val();
	   			
	   			$('#' + currentNode).replaceWith(
					'<div id="' + editId + '"' + 'style="background-color:' + editColor + '" class="cell-data" draggable="true" ondragstart="drag(event)" data-toggle="modal" data-target="#event-modal">' + createEventDisplay(editTitle, editStart, editEnd) + '</div>'
				);
			});
   			
   			$('#edit-modal').on('hidden.bs.modal', function () {
   				$('#edit-modal').remove();
   			});
   		});

   		$('#verify-btn').click(function(){
   			$('#event-div').append(verifyModal);	

			$('#delete-event').click(function(){
   				delete calData.events[currentNode];
   				$('#' + currentNode).remove();
   			});

   			$('#verify-modal').on('hidden.bs.modal', function () {
   				$('#verify-modal').remove();
   			});
   		});

		
		$('#event-modal').on('hidden.bs.modal', function () {
   			$('#event-modal').remove();
   		});
   	});
});

