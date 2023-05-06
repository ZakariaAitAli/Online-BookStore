package com.onlinebookstore.models;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
    public Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection("jdbc:mysql://localhost:3306/bookshop", "root", "");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
