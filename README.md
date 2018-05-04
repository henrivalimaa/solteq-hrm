# Solteq HRM

## Installation

Application can be build and run with:
1. Docker (build docker image)
2. Development server setup (Angular CLI, Python)

Clone repository this repository and navigate to the folder with commands:
```
git clone https://github.com/henrivalimaa/solteq-hrm.git
cd solteq-hrm
```

### Docker

To build this application with docker you need to install
1. Docker [https://www.docker.com/community-edition#/download]
2. Docker Compose [https://docs.docker.com/compose/install/]

After you have installed docker and docker-compose run: 
```
docker-compose build
docker-compose up
```

You still need to create a superuser for the application.
1. Open new terminal window
2. Navigate to the folder where you cloned this repository
3. Run `docker run server python server/manage.py createsuperuser` 

**After you have successfully created application admin user open your browser and navigate to [http://localhost:4200/login].**

### Development server setup

#### Client (Angular)
 
 1. Navigate to `/client` folder
 2. Run commands:
 ```
 npm install
 ng serve --host 0.0.0.0
 ```
After npm has installed all modules and application is build to the web server open your browser and navigate to [http://localhost:4200/login].

#### API (Django REST Framework)

1. Navigate to `server` folder
2. Run commands: 

```
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
After api is up open your browser and navigate to [http://localhost:8100].
