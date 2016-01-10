package com.trojanworks.pavan7vasan.notify;

import android.app.Application;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.parse.ParseInstallation;
import com.parse.ParsePush;

public class MainActivity extends AppCompatActivity
{
    EditText msg;
    Button notify;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        msg = (EditText) findViewById(R.id.Message);
        notify = (Button) findViewById(R.id.Notify);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG).setAction("Action", null).show();
            }
        });

        notify.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                ParsePush.subscribeInBackground("cmm4dpw");
                ParsePush push = new ParsePush();
                push.setChannel("cmm4dpw");
                push.setMessage(msg.getText().toString());
                push.sendInBackground();
                ParseInstallation installation = ParseInstallation.getCurrentInstallation();
                installation.put("sentmsg",msg.getText().toString());
                installation.saveInBackground();
            }
        });
    }
}
