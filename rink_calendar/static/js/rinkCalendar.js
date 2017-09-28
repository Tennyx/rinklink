
let monthVar = 0;
let startWeek = moment().startOf('month').add(monthVar, "month").week();
let endWeek = moment().endOf('month').add(monthVar, "month").week();

function createCal(){
	let calendar = [];
	let weeks = ['<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THUR</th><th>FRI</th><th>SAT</th></tr>'];

	for(var week = startWeek;week<endWeek+1;week++){
  		calendar.push({
    		week:week,
    		days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
  		})
	}


	for(var d=0;d<calendar.length;d++){
		let daysInWeek = [];
		for(var e=0;e<7;e++){
			daysInWeek.push('<td className="cellShell">' + calendar[d].days[e].format("D") + '</td>');	
		}
		weeks.push('<tr>' + daysInWeek + '</tr>');
	}
	$('#rinkCal').empty();
	$('#rinkCal').append(weeks);
	$('#month-header').html(moment().startOf('month').add(monthVar, "month").format("MMMM YYYY"));

}
$( document ).ready(function() {

	createCal();

	
	
   	$('#fwd').click(function(){
   		monthVar += 1;	
   		startWeek = moment().startOf('month').add(monthVar, "month").week();
   		endWeek = moment().endOf('month').add(monthVar, "month").week();
   		createCal();
   	});

   	$('#back').click(function(){
   		monthVar -= 1;	
   		startWeek = moment().startOf('month').add(monthVar, "month").week();
   		endWeek = moment().endOf('month').add(monthVar, "month").week();
   		createCal();
   	});








});