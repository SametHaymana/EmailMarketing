from rest_framework import serializers

class TaskSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=50) 
    thread_ident = serializers.IntegerField()
    
    repeater_interval= serializers.CharField(max_length=50)
    start_date = serializers.CharField(max_length=50)
    is_started = serializers.BooleanField()
    is_running = serializers.BooleanField()
    
    subject = serializers.CharField(max_length=1000)
    message = serializers.CharField(max_length=100000)
    receipts = serializers.CharField(max_length=10000)
    
    
class TemplatesSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    template_name = serializers.CharField(max_length=100)
    subject = serializers.CharField(max_length=100)
    message = serializers.CharField(max_length=100000)
    
class SubscribersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    mail_address = serializers.CharField(max_length=100000)
    