# API setup (Django REST Framework)

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

# Run server
python manage.py runserver
```
3. API is browsable at URL: [localhost:8000](localhost:8000).
