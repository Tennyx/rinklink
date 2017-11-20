from __future__ import unicode_literals

from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import render
from rink_calendar.serializers import DataSerializer
from .models import UserData

from rest_framework import status
from rest_framework.decorators import api_view

def rink_calendar(request):
	return render(request, 'rink_calendar/rink-calendar.html')

@api_view(['GET', 'POST'])
def api(request):
	# queryset = UserData.objects.all()
	# serializer_class = DataSerializer

	# def perform_create(self, serializer):
	# 	user_data = self.request.data
	# 	print user_data['user_data']
	# 	_ = serializer.save(user_data=user_data)
	# 	# return Response(_)

	if request.method == 'GET':
		user_data = UserData.objects.all()
		serializer = DataSerializer(user_data, many=True)
		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = DataSerializer(data=request.data)
		# print serializer
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)