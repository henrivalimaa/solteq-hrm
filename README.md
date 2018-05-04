# Solteq HRM

## Installation

Application can be build and run with:
1. Docker (build docker image)
2. Development servers (Angular CLI, Python)

Clone repository this repository and navigate to the folder with commands:
```
git clone https://github.com/henrivalimaa/solteq-hrm.git
cd solteq-hrm
```

### Docker

To build this application with docker you need to install
1. Docker [https://docs.docker.com/compose/install/]
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

After you have successfully created application admin user open your browser and navigate to [http:localhost:4200/login].

You should see application login page where you can login with created admin user credentials.

### Development server setup