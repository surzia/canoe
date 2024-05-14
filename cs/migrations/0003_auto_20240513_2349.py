# Generated by Django 3.2.25 on 2024-05-13 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs', '0002_alter_questions_kind'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questions',
            name='category',
            field=models.CharField(choices=[('cs', '计算机基础知识'), ('db', '数据库')], max_length=10),
        ),
        migrations.AlterField(
            model_name='questions',
            name='kind',
            field=models.IntegerField(choices=[(1, '单选题'), (2, '多选题'), (3, '应用题')]),
        ),
    ]
