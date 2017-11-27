from rest_framework import serializers
from .models import UserData

class DataSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserData
		fields = ['user_id','user_data']
