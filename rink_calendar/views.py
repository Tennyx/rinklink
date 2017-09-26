# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
import datetime

# Create your views here.
def rink_calendar(request):
	print(datetime.date(2017,8,17))
	data = {'month' : 'January',
			'number_of_days': range(31),


	}
	return render(request, 'rink_calendar/rink-calendar.html', {'data': data})