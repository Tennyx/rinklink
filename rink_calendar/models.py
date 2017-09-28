# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class MonthData(models.Model):
	monthYear = models.CharField(max_length=50)
	days = models.TextField()

	def __unicode__(self):
		return self.monthYear
