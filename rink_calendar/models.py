# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.postgres.fields import JSONField
from django.db import models

class UserData(models.Model):
	user_id = models.CharField(max_length=25, primary_key=True, blank=True)
	user_data = JSONField()

