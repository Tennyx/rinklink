from __future__ import unicode_literals

from django.shortcuts import render
from datetime import datetime
import calendar

def rink_calendar(request):
	myCal = calendar.HTMLCalendar(calendar.SUNDAY)
	today = datetime.today()
	print(datetime(today.year,today.month, 1))
	data = {
			'calendar': myCal.formatmonth(2017, 7)
			}
	return render(request, 'rink_calendar/rink-calendar.html', {'data': data})