# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
import datetime
import calendar

# Create your views here.
def rink_calendar(request):
	myCal = calendar.HTMLCalendar(calendar.SUNDAY)
	print(type(myCal.formatmonth(2017, 7)))
	data = {'month' : 'January',
			'number_of_days': range(31),
			'calendar': myCal.formatmonth(2017, 7)
			}
	return render(request, 'rink_calendar/rink-calendar.html', {'data': data})