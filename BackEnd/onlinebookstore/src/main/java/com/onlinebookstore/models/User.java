package com.onlinebookstore.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class User {
    private String email;
    private String password;
    private double balance;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {
        this.email = "";
        this.password = "";
    }

    public User getUserByEmail(String email) {
        Database db = new Database();
        Connection conn = db.getConnection();
        if (conn != null) {
            try {
                PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE email= ?");
                ps.setString(1, email);
                ResultSet rs = ps.executeQuery();
                return new User(rs.getString("email"), rs.getString("password"));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return this.balance;
    }

    public int getId() {
        Database db = new Database();
        Connection conn = db.getConnection();
        if (conn != null) {
            try {
                PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE email= ?");
                ps.setString(1, this.email);
                ResultSet rs = ps.executeQuery();
                return rs.getInt("id");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return -1;
    }
}
