from django.db import models

from api.utils import auto_generate_title


class Post(models.Model):
    title = models.CharField(
        max_length=50, default=auto_generate_title(), unique=True, verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    created = models.DateTimeField(
        auto_created=True, auto_now_add=True, verbose_name='创建时间')
    updated = models.DateTimeField(
        auto_created=True, auto_now=True, verbose_name='最后更新时间')

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'post'
        verbose_name_plural = '千纸鹤写作'
