from django.db import models


class Questions(models.Model):
    SUBJECT_CHOICES = (
        ('cs', '计算机基础知识'),
        ('db', '数据库')
    )
    KIND_CHOICES = (
        (1, '单选题'),
        (2, '多选题'),
        (3, '应用题')
    )
    text = models.TextField()
    category = models.CharField(max_length=10, choices=SUBJECT_CHOICES)
    kind = models.IntegerField(choices=KIND_CHOICES)
    source = models.CharField(max_length=100)
    options = models.TextField(blank=True)
    answer = models.TextField(blank=True)
