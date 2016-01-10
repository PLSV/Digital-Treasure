package com.vasansdomain.pavan.gaeapplication;

import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.example.pavan.myapplication.backend.quoteEndpoint.QuoteEndpoint;
import com.example.pavan.myapplication.backend.quoteEndpoint.model.Quote;
import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.extensions.android.json.AndroidJsonFactory;


import java.io.IOException;
public class MainActivity extends ActionBarActivity {

    EditText DelId, Id, Who, What;
    Quote insertion;
    private static QuoteEndpoint myApiService = null;
    String ifException, id, InsId, InsWhat, InsWho;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Id = (EditText) findViewById(R.id.Id);
        Who = (EditText) findViewById(R.id.Who);
        What = (EditText) findViewById(R.id.What);
        DelId = (EditText) findViewById(R.id.IdToDelete);
    }

    public void getQuotes(View v)
    {
        new EndpointsAsyncTask(this).execute();
    }

    public void insertQuote(View v)
    {
        new EndpointsInsertAsyncTask().execute();
    }

    public void deleteQuote(View v)
    {
        new EndpointsDeleteAsyncTask().execute();
    }

    class EndpointsInsertAsyncTask extends AsyncTask<Void, Void, Quote>
    {
        @Override
        protected void onPreExecute()
        {
            insertion =new Quote();
            insertion.setId(Long.valueOf(Id.getText().toString()));
            insertion.setWhat(What.getText().toString());
            insertion.setWho(Who.getText().toString());
        }
        @Override
        protected Quote doInBackground(Void... params)
        {
            QuoteEndpoint.Builder builder = new QuoteEndpoint.Builder(AndroidHttp.newCompatibleTransport(),
                    new AndroidJsonFactory(), null)
                    .setRootUrl("https://gaebackend-1106.appspot.com/_ah/api/");
            myApiService = builder.build();
            try
            {
                return myApiService.insertQuote(insertion).execute();
            }
            catch(Exception e)
            {
                ifException = e.getMessage().toString();
                return null;
            }
        }

        @Override
        protected void onPostExecute(Quote Result)
        {
            if(Result == null)
            {
                Toast.makeText(getApplicationContext(),"The Meeting could not be inserted and the reason is "+ifException,
                        Toast.LENGTH_SHORT).show();
            }
            else
            {
                Toast.makeText(getApplicationContext(),"Meeting added with id: "+Result.getId(),
                        Toast.LENGTH_SHORT).show();
            }
        }
    }

    class EndpointsDeleteAsyncTask extends AsyncTask<Void, Void, String>
    {
        @Override
        protected void onPreExecute()
        {
            insertion =new Quote();
            insertion.setId(Long.valueOf(DelId.getText().toString()));
            insertion.setWhat(null);
            insertion.setWho(null);
        }
        @Override
        protected String doInBackground(Void... params)
        {
            QuoteEndpoint.Builder builder = new QuoteEndpoint.Builder(AndroidHttp.newCompatibleTransport(),
                    new AndroidJsonFactory(), null)
                    .setRootUrl("https://gaebackend-1106.appspot.com/_ah/api/");
            myApiService = builder.build();
            try
            {
                myApiService.removeQuote(insertion.getId()).execute();
            }
            catch(Exception e)
            {
                ifException = e.getMessage().toString();
                return null;
            }
            return "Deletion Successful";
        }

        @Override
        protected void onPostExecute(String Result)
        {
            if(Result == null)
            {
                Toast.makeText(getApplicationContext(),"The Meeting could not be deleted and the reason is "+ifException,
                        Toast.LENGTH_SHORT).show();
            }
            else
            {
                Toast.makeText(getApplicationContext(),"The meeting has been deleted",
                        Toast.LENGTH_SHORT).show();
            }
        }
    }
}
