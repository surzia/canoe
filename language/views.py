from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Language


def word_list(request):
    words = Language.objects.all().order_by('id')
    per_page = 10
    paginator = Paginator(words, per_page)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {
        'words': page_obj,
    }
    return render(request, 'language.html', context)
