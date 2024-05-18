from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Language


def word_list(request):
    query = request.GET.get('s')
    if query is None:
        words = Language.objects.all().order_by('id')
    else:
        words = Language.objects.filter(word__contains=query).order_by('id')
    per_page = 10
    paginator = Paginator(words, per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'words': page_obj,
        'query': query,
    }
    return render(request, 'language/language.html', context)
