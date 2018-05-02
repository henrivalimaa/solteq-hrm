FROM python:3

ENV PYTHONUNBUFFERED 1

RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl

RUN mkdir app
WORKDIR /app/
COPY . /app/

RUN pip install -r requirements.txt