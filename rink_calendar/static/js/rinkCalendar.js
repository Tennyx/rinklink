
let monthVar = 0;
let startWeek = moment().startOf('month').add(monthVar, "month").week();
let endWeek = moment().endOf('month').add(monthVar, "month").week();
console.log(moment("2017-September").startOf('month').weekday());
console.log(moment("2017-October-31").daysInMonth());
function createCal(){
	let calendar = [];
	let weeks = ['<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THUR</th><th>FRI</th><th>SAT</th></tr>'];
	let monthHeader = moment().startOf('month').add(monthVar, "month").format("MMMM YYYY");

	for(var week = startWeek;week<endWeek+1;week++){
  		calendar.push({
    		week:week,
    		days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
  		})
	}
	console.log(startWeek);
	console.log(endWeek);
	for(var d=0;d<calendar.length;d++){
		let daysInWeek = [];
		for(var e=0;e<7;e++){
			calDay = calendar[d].days[e].format("D");
			
			if(d == 0 && calDay > 20 || d > 3 && calDay < 7){
				daysInWeek.push('<td className="cellShell nodate"></td>');
			}
			else{
				daysInWeek.push('<td className="cellShell" id="' + calDay + '">' + calDay + '</td>');	
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