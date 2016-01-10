package com.vasansdomain.pavan.ebayaccess;

public class Items {

    private String Prod_name;
    private String Prod_image;
    private String Prod_URL;
    private int Prod_price;
    private double Shipping;

    public Items() {
        // TODO Auto-generated constructor stub
    }

    public Items(String Prod_name, String Prod_image, String Prod_URL, int Prod_price, double Shipping)
    {
        super();
        this.Prod_name = Prod_name;
        this.Prod_image = Prod_image;
        this.Prod_URL = Prod_URL;
        this.Prod_price = Prod_price;
        this.Shipping = Shipping;
    }


    public String getProd_name() {
        return Prod_name;
    }

    public void setProd_name(String Prod_name) {
        this.Prod_name = Prod_name;
    }

    public String getProd_image() {
        return Prod_image;
    }

    public void setProd_image(String Prod_image) {
        this.Prod_image = Prod_image;
    }

    public String getProd_URL() {
        return Prod_URL;
    }

    public void setProd_URL(String Prod_URL) {
        this.Prod_URL = Prod_URL;
    }

    public int getProd_price() {
        return Prod_price;
    }

    public void setProd_price(int Prod_price) {
        this.Prod_price = Prod_price;
    }

    public double getShipping() {
        return Shipping;
    }

    public void setShipping(double Shipping) {
        this.Shipping = Shipping;
    }

}
