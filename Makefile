makemigrations:
	cd papercrane && python manage.py makemigrations

migrate:
	cd papercrane && python manage.py migrate

runserver:
	cd papercrane && python manage.py runserver

reactapp:
	cd web && npm install && npm start

.PHONY: makemigrations migrate runserver