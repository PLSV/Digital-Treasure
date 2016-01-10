package com.vasansdomain.pavan.ebayaccess;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.view.View;
import android.widget.TextView;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.json.JSONException;
import java.util.ArrayList;
import java.util.List;

public class EBayMainActivity extends ActionBarActivity
{
    private static String url = "http://cs-server.usc.edu:27952/EbayDataRetrieval.php";
    //private static String url = "http://pavanvasansworld-env.elasticbeanstalk.com/index.php";
    private static final String TAG_ACK = "ack";
    Button clear, search;
    EditText keyword, pricefrom, priceto;
    TextView error;
    Spinner sort;
    static String spinnerVal;
    String Ack;
    int entries;
    JSONObject JSON;
    JSONParser JP = new JSONParser();
    List<NameValuePair> params;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ebay_main);
        clear = (Button) findViewById(R.id.Clr);
        search = (Button) findViewById(R.id.Srch);
        keyword = (EditText) findViewById(R.id.itemName);
        pricefrom = (EditText) findViewById(R.id.MinPrice);
        priceto = (EditText) findViewById(R.id.MaxPrice);
        error = (TextView) findViewById(R.id.errorText);
        sort = (Spinner) findViewById(R.id.Sort);

        sort.setOnItemSelectedListener(new CustomOnItemSelectedListener());

        search.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                if(keyword.getText().toString().isEmpty() == true)
                {
                    error.setText("Please enter a keyword");
                }
                else if(!(pricefrom.getText().toString().isEmpty()) && !(priceto.getText().toString().isEmpty()))
                {
                    int pf = Integer.parseInt(pricefrom.getText().toString());
                    int pt = Integer.parseInt(priceto.getText().toString());
                    if(pf > pt)
                    {
                        error.setText("Max price cannot be lower than Min price");
                        return;
                    }
                    new DataRetrieve().execute();
                }
                else
                    new DataRetrieve().execute();
            }
        });

        clear.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                new Thread(new Runnable()
                {
                    public void run()
                    {
                       clearUp();
                    }
                }).start();
            }
        });
    }

    void clearUp()
    {
        Intent loginscreen=new Intent(this,EBayMainActivity.class);
        loginscreen.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(loginscreen);
        this.finish();
    }

    class DataRetrieve extends AsyncTask<Void,Void,Void>
    {
        @Override
        protected void onPreExecute()
        {
            Log.e("The data values passed","Sending the data now");
            params = new ArrayList<NameValuePair>();
            params.add(new BasicNameValuePair("keywords", keyword.getText().toString().trim()));
            params.add(new BasicNameValuePair("MinPrice", pricefrom.getText().toString().trim()));
            params.add(new BasicNameValuePair("MaxPrice", priceto.getText().toString().trim()));
            params.add(new BasicNameValuePair("SortOrder", spinnerVal));
            Log.e("Calling the HTTP method","params sent");
        }

        @Override
        protected Void doInBackground(Void... args)
        {
            try
            {
                JSON = JP.makeHttpRequest(url, "POST", params);
                Ack = JSON.getString(TAG_ACK);
                entries = JSON.getInt("resultCount");
                Log.e("The acknowledgement,",Ack);
            }
            catch(JSONException E)
            {
                E.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void Result)
        {
            Log.e("JSON sent",JSON.toString());
            Log.e("total entries",""+entries);
            if(Ack.equals("No Results Found") || entries == 0)
            {
                error.setText("No Results Found");
            }
            else
            {
                Intent i = new Intent(getApplicationContext(), EBayItemListDisplayActivity.class);
                i.putExtra("ebay", JSON.toString());
                i.putExtra("keyword", keyword.getText().toString().trim());
                startActivity(i);
            }
        }
    }
}

