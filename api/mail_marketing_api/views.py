from dataclasses import dataclass
from inspect import Attribute
from django.shortcuts import render, get_object_or_404


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny

from mail_marketing_api.models import Tasks, Templates, Subscribers, createId
from mail_marketing_api.serializetions import  TaskSerializer, TemplatesSerializer, SubscribersSerializer
from mail_marketing_api.taskManager import worker, getThread

import json







class TaskViewSet(viewsets.ViewSet):
    

    def list(self,request):
        queryset = Tasks.objects.all()
        serializer = TaskSerializer(queryset , many=True)
        
        return Response(serializer.data)

    def create(self,request):
        data = request.data
        id = createId(Tasks)

        # Record to database
    

        task = Tasks(id=id,user=request.user,name=data["name"],thread_ident="",
                     repeater_interval=data["repeater_interval"],
                     start_date=data["start_date"],is_started=True,
                     is_running=False,subject=data["subject"],
                     message=data["message"],receipts=data["receipts"])

        task.save()

        # Start worker here
        # worker get information from database with id
        w = worker(id=id)
        if w:
            return Response({"Status": "Task added to queuen."})
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def retrieve(self, request ,pk=None):
       
        objs = get_object_or_404(Tasks,id=pk)
        serializer = TaskSerializer(objs)
        return Response(serializer.data)

    def update(self, request, pk=None):
        # Update subject, message and receipts
        objs = get_object_or_404(Tasks,id=pk)

        data = request.data
        try:
            subject = data["subject"]
            message = data["message"]
            receipts = data["receipts"] # list
        except KeyError:
            return Response({"Status":"Unexpected data or key"}, status=status.HTTP_404_NOT_FOUND)

        if isinstance(receipts,list):
            return Response({"Status":"Unexpected data or key, receipts must be a list"})

        objs.subject = subject
        objs.message = message
        #make changes
        objs.receipts = receipts
        objs.save()
        return Response({"Status":"Task updated successfully."})


    def partial_update(self, request, pk=None):
        # stop task adn other stuff
        accepted_actions= ["STOP"]

        objs = get_object_or_404(Tasks,id=pk)


        data = request.data
        try:
            if data["action"] not in accepted_actions:
                return Response({"Status": data["action"]+" is not accepted action!"})

        except KeyError:
            return Response({"Status":"Unexpected data or key"})

        if data["action"] == "STOP":
            # Get Threat from pool
            task = getThread(objs.thread_ident)

            # Stop thread
            try:
                task.cancel()
            except AttributeError as a:
                print(a)


            # Update information
            objs.is_running = False
            objs.save()
            return Response({"Status":"Task ("+pk+") stoped successfully."})




    def destroy(self, request, pk=None):

        objs = get_object_or_404(Tasks,id=pk)


        # Get Threat from pool
        task = getThread(objs.thread_ident)

         # Stop thread
        try:
            task.cancel()
        except AttributeError as a:
            print(a)

        objs.delete()
        return Response({"Status":"Task deleted successfully."})




class TemplateViewSet(viewsets.ViewSet):



    def list(self,request):
        queryset = Templates.objects.all()
        serializer = TemplatesSerializer(queryset,many=True)
        return Response(serializer.data)


    def create(self,request):
        data = request.data

        try:
            template_name = data["template_name"]
            subject = data["subject"]
            message = data["message"]

        except KeyError:
            return Response({"Status":"Unexpected data or key"})

        template = Templates(id=createId(Templates),user=request.user,template_name=template_name,
                             subject=subject,message=message)
        template.save()

        return Response({"Status": "Templates created."})


    def retrieve(self, request ,pk=None):

        objs = get_object_or_404(Templates,id=pk)

        serializer = TemplatesSerializer(objs)
        return Response(serializer.data)



    def update(self, request, pk=None):

        objs = get_object_or_404(Templates,id=pk)


        data = request.data

        try:
            template_name = data["template_name"]
            subject = data["subject"]
            message = data["message"]
        except KeyError:
            return Response({"Status":"Unexpected data or key"})

        objs.template_name = template_name
        objs.subject = subject
        objs.message = message
        objs.save()
        return Response({"Status":"Template updated successfully."})


    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        objs = get_object_or_404(Templates,id=pk)
        objs.delete()
        return Response({"Status":"Template deleted successfully."})



class SubscribersViewSet(viewsets.ViewSet):



    def list(self,request):
        objs = Subscribers.objects.all()
        serializer = SubscribersSerializer(objs, many=True)
        return Response(serializer.data)

    def create(self,request):
        data = request.data

        try:
            name = data["name"]
            mail_address = data["mail_address"]
        except KeyError:
            return Response({"Status":"Unexpected data or key"})

        obj = Subscribers(id = createId(Subscribers),user=request.user, name=name , mail_address= mail_address)
        obj.save()
        return Response({"Status": "Subscribers created."})


    def retrieve(self, request ,pk=None):
        obj = get_object_or_404(Subscribers,id=pk)
        serializer = SubscribersSerializer(obj)
        return Response(serializer.data)

    def update(self, request, pk=None):
        obj = get_object_or_404(Subscribers,id=pk)

        data = request.data
        try:
            name = data["name"]
            mail_address = data["mail_address"]
        except KeyError:
            return Response({"Status":"Unexpected data or key"})

        obj.name= name
        obj.mail_address = mail_address
        obj.save()
        return Response({"Status":"Subscribers updated successfully."})



    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        obj = get_object_or_404(Subscribers,id=pk)
        obj.delete()
        return Response({"Status":"Subscribers deleted successfully."})
