import uuid
from django.db import models


class Post(models.Model):
    uid = models.UUIDField(
        auto_created=True, default=uuid.uuid4, editable=False, verbose_name='ID')
    content = models.TextField(verbose_name='内容')
    created = models.DateField(
        auto_created=True, auto_now_add=True, verbose_name='创建时间')
    updated = models.DateTimeField(
        auto_created=True, auto_now=True, verbose_name='最后更新时间')

    def __str__(self):
        return str(self.uid)

    class Meta:
        db_table = 'post'
        verbose_name_plural = '千纸鹤写作'
