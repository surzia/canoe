makemigrations:
	cd papercrane && python manage.py makemigrations

migrate:
	cd papercrane && python manage.py migrate

runserver:
	cd papercrane && python manage.py runserver

.PHONY: runserver