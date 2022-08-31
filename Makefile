makemigrations:
	cd papercrane && python manage.py makemigrations

migrate:
	cd papercrane && python manage.py migrate

runserver:
	cd papercrane && python manage.py collectstatic && python manage.py runserver

reactapp:
	cd web && npm install && npm start

frontend:
	cd web && npm run build

.PHONY: makemigrations migrate runserver reactapp frontend