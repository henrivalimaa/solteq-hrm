# Solteq HRM

This is an awesome description about this project...

## Getting started

### Prerequisites

1. You need to have `git` installed. You can get git from [here](https://git-scm.com/downloads).
2. You must have `Node.js (nodejs)` and its `package manager (npm)` installed. You can get them from here [here](https://nodejs.org/en/).
3. You must have `python`, `pip` and `virtualenv` installed.

Clone the `solteq-hrm` repository using git:

```console
# Clone repository
git clone https://github.com/henrivalimaa/solteq-hrm.git

# Navigate to project folder
cd solteq-hrm
``` 

Application can be build and run with:
1. Docker setup
2. Development server setup (developers)

## Docker setup

To build this application with docker you need to install
1. [Docker](https://www.docker.com/community-edition#/download)
2. [Docker Compose](https://docs.docker.com/compose/install/)

After you have installed docker and docker-compose run: 

```console
# Build client and api images
docker-compose build

# Start services
docker-compose up
```

You need to create a user for the application.
1. Open new terminal window
2. Navigate to the folder where you cloned this repository
3. Run `docker run server python server/manage.py createsuperuser`
4. Fill user credentials 
4. Open browser and navigate to [http://localhost:4200/login](http://localhost:4200/login).

## Development server setup

### Client (Angular)
 
Build and run `client`:
1. Navigate to `/client` folder
2. Run commands:

```console
# Install dependencies
npm install

# Build and run web server
ng serve
```
3. Open browser and navigate to [http://localhost:4200/login](http://localhost:4200/login)

If nothing happens on command `ng serve` run `npm install -g @angular/cli`

### API (Django REST Framework)

Setup, build, and run `api`:
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
4. API is browsable at [https://localhost:8000](http://localhost:8000).
