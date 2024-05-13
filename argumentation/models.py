from django.db import models


class Exam(models.Model):
    name = models.CharField(max_length=100, unique=True)
    year = models.IntegerField()

    def __str__(self):
        return self.name


class Reading(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    code = models.IntegerField()
    score = models.IntegerField()
    question = models.TextField()
    required = models.IntegerField(default=0)

    def __str__(self):
        return '{} 材料{}'.format(self.exam.name, self.code)


class Paragraph(models.Model):
    reading = models.ForeignKey(Reading, on_delete=models.CASCADE)
    no = models.IntegerField(default=0)
    content = models.TextField()


class Answer(models.Model):
    reading = models.ForeignKey(Reading, on_delete=models.CASCADE)
    answer = models.TextField()
    word_count = models.IntegerField()
