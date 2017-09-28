from rest_framework import serializers
from .models import MonthData

class MonthSerializer(serializers.ModelSerializer):
	class Meta:
		model = MonthData
		fields = '__all__'
