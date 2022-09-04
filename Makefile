makemigrations:
	cd papercrane && python manage.py makemigrations

migrate:
	cd papercrane && python manage.py migrate

frontend:
	cd web && npm run build

backend:
	cd papercrane && python manage.py collectstatic && python manage.py runserver

djangoapp:
	cd papercrane && python manage.py runserver

reactapp:
	cd web && npm install && npm start


.PHONY: makemigrations migrate frontend backend djangoapp reactapp