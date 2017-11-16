from django.conf.urls import include, url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	url(r'^$', views.rink_calendar, name="rink_calendar"),
	url(r'^api/$', views.api, name="api")
]

urlpatterns = format_suffix_patterns(urlpatterns)