FROM node:16.15.1-alpine as build
WORKDIR /app
COPY web .
RUN npm install
RUN npm run build

FROM python:3.10.5-alpine as backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip 
COPY papercrane /app/papercrane
WORKDIR /app/papercrane
RUN pip install -r requirements.txt

COPY --from=build /app/build/ /app/web/build

EXPOSE 8000

WORKDIR /app/papercrane

RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]