from __future__ import unicode_literals

from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render
from rink_calendar.serializers import DataSerializer
from .models import UserData

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.renderers import JSONRenderer

def rink_calendar(request):
	return render(request, 'rink_calendar/rink-calendar.html')

@api_view(['GET', 'POST'])
def api(request):
	
	if request.method == 'GET':

		q_param = request.GET.get('q', '')

		if q_param:
			return Response(DataSerializer(UserData.objects.get(user_id=q_param)).data)
		else:	
			user_data = UserData.objects.all()
			serializer = DataSerializer(user_data, many=True)
			return Response(serializer.data)

	elif request.method == 'POST':
		

		print(request.data['user_id'])

		if UserData.objects.all().filter(user_id=request.data['user_id']):
			serializer = DataSerializer(instance=UserData.objects.get(user_id=request.data['user_id']), data=request.data)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
				
		else:
			serializer = DataSerializer(data=request.data)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)