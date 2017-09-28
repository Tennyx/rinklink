from __future__ import unicode_literals
from rest_framework import generics
from django.shortcuts import render
from datetime import datetime
from rink_calendar.serializers import MonthSerializer
from .models import MonthData
import calendar


def rink_calendar(request):
	myCal = calendar.HTMLCalendar(calendar.SUNDAY)
	today = datetime.today()
	print(datetime(today.year,today.month, 1))
	data = {
			'calendar': myCal.formatmonth(2017, 7)
			}
	return render(request, 'rink_calendar/rink-calendar.html', {'data': data})

class api(generics.ListCreateAPIView):
	queryset = MonthData.objects.all()
	serializer_class = MonthSerializer

