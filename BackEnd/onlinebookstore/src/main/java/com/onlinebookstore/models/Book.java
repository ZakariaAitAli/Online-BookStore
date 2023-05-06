package com.onlinebookstore.models;

public class Book {
    private int id;
    private String title;
    private String type;
    private java.sql.Date publishedAt;
    private int stock;
    private double price;

    public Book() {
    }

    public Book(int id, String title, String type, java.sql.Date publishedAt, int stock, double price) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.publishedAt = publishedAt;
        this.stock = stock;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public java.sql.Date getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(java.sql.Date publishedAt) {
        this.publishedAt = publishedAt;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
