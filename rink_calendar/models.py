# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField
from django.db import models

class UserData(models.Model):
	user_data = JSONField()

	# def __unicode__(self):
	# 	return self.monthYear
