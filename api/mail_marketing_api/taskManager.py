
from unittest import case
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.models import User
from mail_marketing_api.models import Tasks

from api.settings import EMAIL_HOST_USER

import threading
import time
import datetime
import json


JUST_ONES = 10
QUARTER = 900
HALF = 1800
HOUR = 3600
DAY = 86400
WEEK = 604800
MONTH = 2592000


def get_interval(Repeater_Interval):
    print(Repeater_Interval)
    if Repeater_Interval == "10 Second":
        return JUST_ONES
    elif Repeater_Interval == "15 Min":
        return QUARTER
    elif Repeater_Interval == "30 Min":
        return HALF
    elif Repeater_Interval == "Every hours":
        return HOUR
    elif Repeater_Interval == "Ones a Day":
        return DAY
    elif Repeater_Interval == "Ones day a Week":
        return WEEK
    elif Repeater_Interval == "Ones day a Monthly":
        return MONTH


class Repeater(threading.Timer):
    def run(self):
        while not self.finished.wait(self.interval):
            self.function(*self.args,*self.kwargs)


def SendMail(id=None):
    # Get Messages and maill adresses from database and process sending
    # Add timeout here


    obj = Tasks.objects.get(id=id)

    subject = obj.subject
    message = obj.message
    receipts = obj.receipts
    receipt_list = json.loads(receipts)

    for receiver in receipt_list:
        send_mail(subject,message,EMAIL_HOST_USER,[receiver])


def getThread(ident : int):
    return threading._active.get(ident)

def getSecondBetwenCurrentTime(timestamp):
    currentTime = time.time()
    if(timestamp < currentTime):
        return 0
    return currentTime - timestamp





def worker(id=None):
    # Get all time with timestamp format
    # Get Mail addresess storet as list of json

    try:
        obj = Tasks.objects.get(id=id)
    except Tasks.DoesNotExist:
        # To awiot any exception here stop here
        return False

    # for Get intervall as string
    interval = get_interval(obj.repeater_interval)
    # for get interval as second
    # interval = obj.repeater_interval

    # if user want to start sending message now with interval
    if obj.start_now:

        # start sending message now
        task = Repeater(interval,SendMail,args=[id])
        task.start()

        # Update İnformations
        obj.thread_ident = task._ident
        obj.is_running = True
        obj.save()
    else:
        # get Waiting second that startTime - CurrentTime
        # start_date should be timestamp format
        waiting_second = getSecondBetwenCurrentTime(obj.start_date)

        # use timer to wait start time
        task = threading.Timer(waiting_second,postponed)

        # Start timer and store ident for future
        task.start()
        obj.thread_ident = task._ident
        obj.save()



    def postponed():
        # When function start
        # create new Timer and update Task informations
        task = Repeater(interval,SendMail,args=[id])
        task.start()

        obj.thread_ident = task._ident
        obj.is_running = True
        obj.save()

    return True
