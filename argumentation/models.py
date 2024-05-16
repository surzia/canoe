from django.db import models


class Exam(models.Model):
    name = models.CharField(max_length=100, unique=True)
    year = models.IntegerField()

    def __str__(self):
        return self.name

    def is_complete(self):
        """
        1: completed
        0: not completed
        -1 unread
        :return: -1/0/1
        """
        reads = self.reading_set.all()
        status = -1
        flag = True
        for read in reads:
            if read.has_answer():
                status = 0
            else:
                flag = False
        if flag:
            return -1
        return status


class Reading(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    code = models.IntegerField()
    score = models.IntegerField()
    question = models.TextField()
    required = models.IntegerField(default=0)

    def __str__(self):
        return '{} 材料{}'.format(self.exam.name, self.code)

    def has_answer(self):
        ans = self.answer_set.all()
        return len(ans) > 0


class Paragraph(models.Model):
    reading = models.ForeignKey(Reading, on_delete=models.CASCADE)
    no = models.IntegerField(default=0)
    content = models.TextField()


class Answer(models.Model):
    reading = models.ForeignKey(Reading, on_delete=models.CASCADE)
    answer = models.TextField()
    word_count = models.IntegerField()
