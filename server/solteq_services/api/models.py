from django.db import models

class Employee(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=50)
	position = models.CharField(max_length=50)
	created_at = models.DateTimeField(auto_now_add=True)
	salary = models.IntegerField()
	phone = models.CharField(max_length=50)
	email = models.EmailField(max_length=254)
	street = models.CharField(max_length=100)
	code = models.CharField(max_length=50)
	city = models.CharField(max_length=50)
	country = models.CharField(max_length=50)

	class Meta:
		ordering = ('id',)
