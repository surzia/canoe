FROM python:3.10.5-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip 
COPY ./papercrane/requirements.txt /app
RUN pip install -r requirements.txt

COPY ./papercrane/ /app/papercrane
COPY ./web/ /app/web

EXPOSE 8000

WORKDIR /app/papercrane

RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]