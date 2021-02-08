FROM python:3.9-alpine
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add --virtual .build-deps gcc musl-dev postgresql-dev libffi-dev
RUN pip install --upgrade pip
RUN pip install pipenv==2020.8.13

WORKDIR /code
COPY Pipfile /code/
COPY Pipfile.lock /code/

RUN pipenv install --system --deploy --dev
COPY . /code/

RUN chmod +x /code/*.sh
CMD ["sh", "entrypoint.sh"]
