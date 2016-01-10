package com.vasansdomain.pavan.ebayaccess;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.net.Uri;
import android.support.v7.app.ActionBarActivity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.net.ParseException;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;

public class EBayItemListDisplayActivity extends ActionBarActivity {

    ArrayList<Items> itemsList;
    ArrayList<String> itemDetails;
    String EBayDetails;
    JSONObject products;
    CustomListAdapter adapter;
    TextView title;
    String search;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EBayDetails  = getIntent().getExtras().getString("ebay").trim();
        search = getIntent().getExtras().getString("keyword").trim();
        try
        {
            products = new JSONObject(EBayDetails);
        }
        catch (JSONException e)
        {
            e.printStackTrace();
        }
        itemsList = new ArrayList<Items>();
        itemDetails = new ArrayList<String>();
        new JSONAsyncTask().execute();
        setContentView(R.layout.item_details_list);
        ListView listview = (ListView)findViewById(R.id.itemlist);
        title = (TextView)findViewById(R.id.items);
        adapter = new CustomListAdapter(this,itemsList);
        listview.setAdapter(adapter);
        title.setText("Results for "+search);

    }

    public void PageLink(View v)
    {
        Intent intent = new Intent();
        int position = (int) v.getTag();
        Log.e("tagID",position+"");
        intent.setAction(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.setData(Uri.parse(itemsList.get(position).getProd_URL()));
        startActivity(intent);
    }

    public void DisplayDetails(View v)
    {
        Intent intent = new Intent(getApplicationContext(),EBayDetailDisplayActivity.class);
        int position = (int) v.getTag();
        intent.putExtra("itemDetails",itemDetails.get(position));
        startActivity(intent);
    }

    class JSONAsyncTask extends AsyncTask<Void,Void,Void>
    {
        @Override
        protected Void doInBackground(Void... params)
        {
            try
            {
                int ctr = products.getInt("resultCount");
                if(ctr > 5)
                {
                    ctr = 5;
                }
                for(int i=0;i<ctr;i++)
                {
                    JSONObject prod = products.getJSONObject("item"+i);
                    itemDetails.add(prod.toString());
                    JSONObject basic = prod.getJSONObject("basicInfo");
                    Log.e("item"+i,basic.toString());
                    Items item = new Items();
                    item.setProd_URL(basic.getString("viewitemURL"));
                    item.setProd_name(basic.getString("title"));
                    item.setProd_price(basic.getInt("convertedCurrentPrice"));
                    item.setProd_image(basic.getString("galleryURL"));
                    item.setShipping(basic.getInt("shippingServiceCost"));
                    Log.e("link" + i, item.getProd_URL());
                    Log.e("name"+i,item.getProd_name());
                    Log.e("price"+i,""+item.getProd_price());
                    Log.e("image"+i,item.getProd_image());
                    Log.e("shipping"+i,""+item.getShipping());
                    itemsList.add(item);
                    Log.e("no of items",""+itemsList.size());
                }
            }
            catch(JSONException e)
            {
                Log.e("JSON Parser", "Error parsing data " + e.toString());
            }
            return null;
        }
    }
}
