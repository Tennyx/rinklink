from rest_framework import serializers
from .models import UserData

class DataSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserData
		fields = '__all__'
