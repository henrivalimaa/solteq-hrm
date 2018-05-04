# `Solteq HRM`

## Prerequisites

Clone repository this repository and navigate to the folder with commands:

```console
# Clone repository
git clone https://github.com/henrivalimaa/solteq-hrm.git

# Navigate to project folder
cd solteq-hrm
```
#### Dependecies:
1. **You must have `Node.js (nodejs)` and its `package manager (npm)` installed. You can get them from here [here](https://nodejs.org/en/).**
2. **You must have installed `python`, `pip` and `virtualenv`.** 


## Installation

Application can be build and run with:
1. Docker (build docker image)
2. Development server setup

## Docker

To build this application with docker you need to install
1. Docker [https://www.docker.com/community-edition#/download]
2. Docker Compose [https://docs.docker.com/compose/install/]

After you have installed docker and docker-compose run: 

```console
docker-compose build
docker-compose up
```

You need to create a user for the application.
1. Open new terminal window
2. Navigate to the folder where you cloned this repository
3. Run `docker run server python server/manage.py createsuperuser`
4. Fill user credentials 
4. Open your browser and navigate to [localhost:4200].

## Development server setup

#### Client (Angular)

**You need to have installed latest nodejs and npm**
 
 Build and run:
 1. Navigate to `/client` folder
 2. Run commands:

 ```console
 npm install
 ng serve --host 0.0.0.0
 ```
After npm has installed all modules and application is build to the web server open your browser and navigate to [localhost:4200].

#### API (Django REST Framework)

**You need to have installed python, pip and virtualenv**

Setup, build, and run:
To run API 
1. Navigate to `/server` folder
2. Run commands: 

```console
# Create a virtualenv to isolate our package dependencies locally
virtualenv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install requirements into the virtualenv
pip install -r requirements.txt

# Sync your database for the first time
python manage.py migrate

# Create user which can authenticate to the application
python manage.py createsuperuser

# Run
python manage.py runserver
```
After api is up open your browser and navigate to [localhost:8100].
