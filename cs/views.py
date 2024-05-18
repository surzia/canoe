import json

from django.core.paginator import Paginator
from django.shortcuts import render

from cs.models import Questions


def question_list(request):
    query = request.GET.get('s')
    if query is None:
        questions = Questions.objects.all()
    else:
        questions = Questions.objects.filter(text__contains=query).order_by('id')
    per_page = 10
    paginator = Paginator(questions, per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'questions': page_obj,
        'query': query,
    }
    return render(request, 'cs/cs.html', context)


def question_detail(request, question_id):
    size = 40
    end = Questions.objects.all().count()
    if question_id <= 20:
        pages = [i for i in range(1, size+1)]
    elif question_id > end - 20:
        pages = [i for i in range(end - 39, end+1)]
    else:
        pages = [i for i in range(question_id-19, question_id+21)]
    question = Questions.objects.get(pk=question_id)
    options = json.loads(question.options)
    context = {
        'question': question,
        'options': list(options.items()),
        'pages': pages
    }
    return render(request, 'cs/detail.html', context)
