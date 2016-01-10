package com.vasansdomain.pavan.ebayaccess;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import android.graphics.Color;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PorterDuff;
import android.net.Uri;
import android.support.v7.app.ActionBarActivity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.share.Sharer;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.widget.ShareDialog;

public class EBayDetailDisplayActivity extends ActionBarActivity
{
    ImageView TopRated, Facebook, ItemShow, sharepic;
    TextView Description, PriceAndShipping;
    TextView ctA,cnA,bfA;
    TextView unA,fbA,pfbA,fbrA,sA;
    TextView stA,htA,slA;
    ImageView trI,raI,odsI,esI;
    Button BuyItNow, basicinfo, shippinginfo, sellerinfo;
    JSONObject product, basic, shipping, seller;
    String prod, ItemPic, URL, supersizeURL, price, title, toprated, shippingCost, location;
    String CatName, Cond, BuyForm;
    String UsrName, FeedScore, FeedRate, TopRate, Store, PosFeed;
    String ShipType, HandTime, ShipLocs, Expedited, OneDayShip, Returns;
    RelativeLayout ba, se, sh;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.item_info_view);

        prod = getIntent().getExtras().getString("itemDetails");
        try
        {
            product = new JSONObject(prod);
            basic = product.getJSONObject("basicInfo");
            seller = product.getJSONObject("sellerInfo");
            shipping = product.getJSONObject("shippingInfo");
            JSONArray locs = shipping.getJSONArray("shipToLocations");

            ItemPic = basic.getString("galleryURL");
            URL = basic.getString("viewitemURL");
            supersizeURL = basic.getString("pictureURLSuperSize");

            price = ""+basic.getString("convertedCurrentPrice");
            title = basic.getString("title");
            toprated = basic.getString("topRatedListing");
            shippingCost = ""+basic.getInt("shippingServiceCost");
            location = basic.getString("location");

            CatName = basic.getString("categoryName");
            Cond = basic.getString("conditionDisplayName");
            BuyForm = basic.getString("listingType");

            UsrName = seller.getString("sellerUserName");
            FeedScore = ""+seller.getInt("feedbackScore");
            FeedRate = seller.getString("feedbackRatingStar");
            TopRate = seller.getString("topRatedSeller");
            Store = seller.getString("sellerStoreName");
            PosFeed = ""+seller.getInt("positiveFeedbackPercent");

            ShipType = shipping.getString("shippingType");
            HandTime = ""+shipping.getInt("handlingTime");
            Expedited = shipping.getString("expeditedShipping");
            OneDayShip = shipping.getString("oneDayShippingAvailable");
            Returns = shipping.getString("returnsAccepted");
            ShipLocs = "";
            if(locs.length()==1)
            {
                ShipLocs = locs.getString(0);
            }
            else
            {
                int i;
                for(i=0;i<locs.length()-1;i++)
                {
                    ShipLocs=ShipLocs.concat(locs.getString(i)+",");
                }
                ShipLocs = ShipLocs.concat(locs.getString(i));
            }
            Log.e("Locations",ShipLocs);
        }
        catch(JSONException e)
        {
            e.printStackTrace();
        }

        TopRated = (ImageView) findViewById(R.id.topRated);
        Facebook = (ImageView) findViewById(R.id.facebook);
        ItemShow = (ImageView) findViewById(R.id.ProdImageView);
        Description = (TextView) findViewById(R.id.ItemDetails);
        PriceAndShipping = (TextView) findViewById(R.id.PriceDisplay);
        BuyItNow = (Button) findViewById(R.id.BuyNow);
        basicinfo = (Button) findViewById(R.id.basic);
        sellerinfo = (Button) findViewById(R.id.seller);
        shippinginfo = (Button) findViewById(R.id.shipping);

        ctA = (TextView) findViewById(R.id.categoryAns);
        cnA = (TextView) findViewById(R.id.conditionAns);
        bfA = (TextView) findViewById(R.id.BuyingFormatAns);

        unA = (TextView) findViewById(R.id.usernameans);
        fbA = (TextView) findViewById(R.id.feebackscoreans);
        pfbA = (TextView) findViewById(R.id.positivefeedbackans);
        fbrA = (TextView) findViewById(R.id.feedbackratingans);
        sA = (TextView) findViewById(R.id.storeans);

        stA = (TextView) findViewById(R.id.shippingtypeans);
        htA = (TextView) findViewById(R.id.handlingtimeans);
        slA = (TextView) findViewById(R.id.shippingLocationans);

        trI = (ImageView) findViewById(R.id.topratedimage);
        raI = (ImageView) findViewById(R.id.returnsacceptedans);
        odsI = (ImageView) findViewById(R.id.onedayshippingans);
        esI = (ImageView) findViewById(R.id.expeditedShippingans);

        ba = (RelativeLayout) findViewById(R.id.basicinfo);
        se = (RelativeLayout) findViewById(R.id.sellerinfo);
        sh = (RelativeLayout) findViewById(R.id.shippinginfo);

        if(supersizeURL.equals(""))
            new DownloadImageTask(ItemShow).execute(ItemPic);
        else
            new DownloadImageTask(ItemShow).execute(supersizeURL);
        Description.setText(title);
        if(Integer.parseInt(shippingCost) > 0)
            PriceAndShipping.setText("Price:$"+price+"(+"+shippingCost+" For Shipping)"+"\n"+location);
        else
            PriceAndShipping.setText("Price:$"+price+"(FREE Shipping)"+"\n"+location);
        if(toprated.equals("true"))
            TopRated.setImageResource(R.drawable.itemtoprated);

        ctA.setText(CatName);
        cnA.setText(Cond);
        bfA.setText(BuyForm);
        unA.setText(UsrName);
        fbA.setText(FeedScore);
        pfbA.setText(PosFeed);
        fbrA.setText(FeedRate);
        if(Store.equals(""))
            sA.setText("");
        else
            sA.setText(Store);
        stA.setText(ShipType);
        htA.setText(HandTime);
        slA.setText(ShipLocs);

        if(TopRate.equals("false"))
            trI.setImageResource(R.drawable.notthere);
        else if(TopRate.equals("true"))
            trI.setImageResource(R.drawable.there);

        if(Expedited.equals("false"))
            esI.setImageResource(R.drawable.notthere);
        else if(Expedited.equals("true"))
            esI.setImageResource(R.drawable.there);

        if(OneDayShip.equals("false"))
            odsI.setImageResource(R.drawable.notthere);
        else if(OneDayShip.equals("true"))
            odsI.setImageResource(R.drawable.there);

        if(Returns.equals("false"))
            raI.setImageResource(R.drawable.notthere);
        else if(Returns.equals("true"))
            raI.setImageResource(R.drawable.there);

        BuyItNow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_VIEW);
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                intent.setData(Uri.parse(URL));
                startActivity(intent);
            }
        });

        basicinfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                basicinfo.setBackgroundColor(Color.BLUE);
                sellerinfo.setBackgroundColor(Color.GRAY);
                shippinginfo.setBackgroundColor(Color.GRAY);
                ba.setVisibility(View.VISIBLE);
                se.setVisibility(View.GONE);
                sh.setVisibility(View.GONE);
            }
        });

        sellerinfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                basicinfo.setBackgroundColor(Color.GRAY);
                sellerinfo.setBackgroundColor(Color.BLUE);
                shippinginfo.setBackgroundColor(Color.GRAY);
                ba.setVisibility(View.GONE);
                se.setVisibility(View.VISIBLE);
                sh.setVisibility(View.GONE);
            }
        });

        shippinginfo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                basicinfo.setBackgroundColor(Color.GRAY);
                sellerinfo.setBackgroundColor(Color.GRAY);
                shippinginfo.setBackgroundColor(Color.BLUE);
                ba.setVisibility(View.GONE);
                se.setVisibility(View.GONE);
                sh.setVisibility(View.VISIBLE);
            }
        });

    }
    public void onfbClick(View v) {
        FacebookSdk.sdkInitialize(getApplicationContext());
        CallbackManager callbackManager;
        ShareDialog shareDialog;
        callbackManager = CallbackManager.Factory.create();
        shareDialog = new ShareDialog(this);
        ShareLinkContent content = new ShareLinkContent.Builder()
                .setContentUrl(Uri.parse(URL))
                .setContentTitle(title)
                .setContentDescription("Price:$"+price)
                .setImageUrl(Uri.parse(ItemPic))
                .build();
        shareDialog.registerCallback(callbackManager, new FacebookCallback<Sharer.Result>() {
            @Override
            public void onSuccess(Sharer.Result result) {
                Toast.makeText(getApplicationContext(),"Posted Story", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onCancel() {
                Toast.makeText(getApplicationContext(),"Post cancelled", Toast.LENGTH_LONG).show();
            }

            @Override
            public void onError(FacebookException e) {

            }
        });

        if (shareDialog.canShow(ShareLinkContent.class)) {
            shareDialog.show(content);
        }
    }
    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap>
    {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage)
        {
            this.bmImage = bmImage;
            sharepic = bmImage;
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
            sharepic.setImageBitmap(result);
        }
    }
}
