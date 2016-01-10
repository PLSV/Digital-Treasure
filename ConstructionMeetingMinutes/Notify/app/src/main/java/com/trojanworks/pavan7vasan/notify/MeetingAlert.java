package com.trojanworks.pavan7vasan.notify;

import android.app.Application;

import com.parse.Parse;
import com.parse.ParseInstallation;
import com.parse.ParsePush;

public class MeetingAlert extends Application
{
    public void onCreate()
    {
        super.onCreate();
        Parse.initialize(this, "GU1puU3CnF2aHEAQFIh3aRtS1dSkB9Zlmhs3pVqG", "qVq0lzdbiNBLiuWSUjs4jvkECV3u9pettITZLVKd");
        ParseInstallation.getCurrentInstallation().saveInBackground();
    }
}
