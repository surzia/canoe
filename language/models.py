from django.db import models


class Language(models.Model):
    word = models.CharField(max_length=100)
    expression = models.CharField(max_length=100)


class Usage(models.Model):
    word = models.ForeignKey(Language, on_delete=models.CASCADE)
    example = models.CharField(max_length=100)
