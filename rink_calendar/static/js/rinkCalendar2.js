
let monthVar = 0;
// let startWeek = moment().startOf('month').add(monthVar, "month").week();
// let endWeek = moment().endOf('month').add(monthVar, "month").week();
let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
// // console.log(moment("October 2017").startOf('month').weekday());
// // console.log(moment("October 2017").daysInMonth());
function createCal(date){
	let monthStart = moment(date).startOf('month').weekday();
	let monthDays = moment(date).daysInMonth();
	let monthWeeks = Math.floor((monthDays + monthStart) / 7);
	let firstWeekCounter = monthStart;
	let calendar = [];
	let weeks = ['<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THUR</th><th>FRI</th><th>SAT</th></tr>'];
	let firstWeek = '';
	let firstDays = 1;

	for(i=0;i<7;i++){
				if(firstWeekCounter > 0){
			firstWeek += '<td className="cellShell nodate"></td>';	
			firstWeekCounter -= 1;
		}
		else{
			firstWeek += '<td className="cellShell" id=' + firstDays + '>' + firstDays +'</td>';
			firstDays += 1;
		}
		
	}
	console.log(monthDays);
	if(firstWeek){
		weeks.push('<tr>' + firstWeek + '</tr>')
	}

	for(day=8-monthStart;day<=monthDays;day){
		let daysInWeek = '';
		for(i=0;i<7;i++){
			daysInWeek += '<td className="cellShell" id="' + day + '">' + day + '</td>';
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
					$('#' + num).html(data[i][findKey]);
				}
  			}
  		}
  	});	
}

$( document ).ready(function() {

	createCal();
	
	$('#fwd').click(function(){
   		monthVar += 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
   		startWeek = moment().startOf('month').add(monthVar, "month").week();
   		endWeek = moment().endOf('month').add(monthVar, "month").week();
   		createCal(monthHeader);
   	});

   	$('#back').click(function(){
   		monthVar -= 1;	
   		monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");
   		startWeek = moment().startOf('month').add(monthVar, "month").week();
   		endWeek = moment().endOf('month').add(monthVar, "month").week();
   		createCal(monthHeader);
   	});

});