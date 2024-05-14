# Generated by Django 3.2.25 on 2024-05-13 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('category', models.CharField(choices=[('计算机基础知识', 'cs'), ('数据库', 'db')], max_length=10)),
                ('kind', models.IntegerField(choices=[('计算机基础知识', 'cs'), ('数据库', 'db')])),
                ('source', models.CharField(max_length=100)),
                ('options', models.TextField(blank=True)),
                ('answer', models.TextField(blank=True)),
            ],
        ),
    ]
