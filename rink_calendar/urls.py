from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.rink_calendar, name="rink_calendar")
]