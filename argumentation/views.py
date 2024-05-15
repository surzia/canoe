import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from argumentation.models import Exam, Reading, Paragraph, Answer


def display_all_exams(request):
    exams = Exam.objects.all()
    context = {'exams': exams}
    return render(request, 'argumentation.html', context)


def display_exam(request, exam_id):
    read_id = request.GET.get('read_id')
    if read_id is None:
        read_id = 1
    exam = Exam.objects.get(pk=exam_id)
    read = Reading.objects.get(exam=exam, code=read_id)
    paragraph = Paragraph.objects.filter(reading=read)
    context = {
        'exam': exam,
        'read': read,
        'paragraph': paragraph
    }
    return render(request, 'detail.html', context)


def answer(request, exam_id, read_id):
    exam = Exam.objects.get(pk=exam_id)
    read = Reading.objects.get(exam=exam, code=read_id)
    paragraph = Paragraph.objects.filter(reading=read)
    context = {
        'exam': exam,
        'read': read,
        'paragraph': paragraph
    }
    return render(request, 'answer.html', context)


@csrf_exempt
def submit_exam(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        exam_id = data['exam_id']
        read_id = data['read_id']
        exam = Exam.objects.get(pk=exam_id)
        read = Reading.objects.get(exam=exam, code=read_id)
        answer_text = data['answer']
        word_count = len(answer_text.strip())
        ans = Answer(reading=read, answer=answer_text, word_count=word_count)
        ans.save()
        try:
            n = Reading.objects.get(exam=exam, code=read_id + 1)
            return JsonResponse({'id': n.code})
        except Reading.DoesNotExist:
            return JsonResponse({'id': -1})
