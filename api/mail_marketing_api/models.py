from django.db import models
from django.contrib.auth.models import User

import random

def createId(forClass):
    id = int()
    
    
    while True:
        id = random.randint(10000000,99999999)
        for i in forClass.objects.all():
            if id == i.id:
                break
        
        break    
    
    return str(id)
    



# Create your models here.
class Tasks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    thread_ident = models.IntegerField(blank=True)
    
    repeater_interval= models.CharField(max_length=50,blank=True)
    start_date = models.CharField(max_length=50,blank=True)
    is_started = models.BooleanField(False)
    is_running = models.BooleanField(False)
    
    subject = models.CharField(blank=True,max_length=1000)
    message = models.TextField(blank=True)
    receipts = models.CharField(blank=True,max_length=10000)          
    
    
class Templates(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    template_name = models.CharField(max_length=100) 
    subject = models.CharField(max_length=100)
    message = models.TextField(blank=True)
    
class Subscribers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(blank=True,max_length=100)
    mail_address = models.TextField(blank=True)