from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from solteq_services.api.models import Employee
from solteq_services.api.serializers import UserSerializer, GroupSerializer, EmployeeSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
