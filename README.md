# Solteq HRM

## Installation

To run this application with:
1. Docker (build docker image)
2. Development servers (Angular CLI, Python)

Run `git clone https://github.com/henrivalimaa/solteq-hrm.git` in your terminal
Then run `cd solteq-hrm` in your terminal

### Docker

To build this application with docker you need to install
1. Docker [https://docs.docker.com/compose/install/]
2. Docker Compose [https://docs.docker.com/compose/install/]

After you have installed docker and docker-compose
Run `docker-compose build`
After build is ready run `docker-compose up`

Now you should see that server(api) and client is up and ready to be tested

You still need to create a superuser for the application.
1. Open new terminal
2. Navigate to the folder where you cloned this repository
3. Run `docker run server python server/manage.py createsuperuser` 

After command terminal asks to fill credentials for admin user.

After you have successfully created application admin user go to [localhost:4200/login]

You should see application login page where you can login with created admin user credentials.

### Development setup