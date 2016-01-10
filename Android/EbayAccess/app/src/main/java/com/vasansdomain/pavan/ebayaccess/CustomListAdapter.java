package com.vasansdomain.pavan.ebayaccess;

import java.io.InputStream;
import java.util.ArrayList;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class CustomListAdapter extends ArrayAdapter<Items>
{
    private final Activity context;
    ArrayList<Items> itemList;

    public CustomListAdapter(Activity context, ArrayList<Items> itemList) {
        super(context, R.layout.item_details_view, itemList);
        // TODO Auto-generated constructor stub

        this.context=context;
        this.itemList=itemList;
    }

    public View getView(int position,View view,ViewGroup parent) {
        LayoutInflater inflater=context.getLayoutInflater();
        View rowView=inflater.inflate(R.layout.item_details_view, null,true);

        TextView ProdName = (TextView) rowView.findViewById(R.id.product_name);
        ImageView ProdImageView = (ImageView) rowView.findViewById(R.id.item_image);
        ProdImageView.setTag(position);
        TextView ProdPrice = (TextView) rowView.findViewById(R.id.product_price);

        ProdImageView.setImageResource(R.drawable.ebay);
        new DownloadImageTask(ProdImageView).execute(itemList.get(position).getProd_image());
        if(itemList.get(position).getShipping() > 0)
        {
            ProdPrice.setText("Price: $"+itemList.get(position).getProd_price()+"(+"+itemList.get(position).getShipping()+" shipping)");
        }
        else
        {
            ProdPrice.setText("Price: $"+itemList.get(position).getProd_price()+"(FREE shipping)");
        }
        ProdName.setText(itemList.get(position).getProd_name());
        ProdName.setTag(position);
        return rowView;
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap>
    {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage)
        {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls)
        {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try
            {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            }
            catch (Exception e)
            {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result)
        {
            bmImage.setImageBitmap(result);
        }
    }
}