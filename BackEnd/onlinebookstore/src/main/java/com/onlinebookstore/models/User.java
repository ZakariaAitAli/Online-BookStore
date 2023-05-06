package com.onlinebookstore.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class User {
    private String username;
    private String email;
    private String phone;
    private String address;
    private String firstName;
    private String lastName;

    public User(String username, String email, String phone, String address, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User() {
        this.username = "";
        this.email = "";
        this.phone = "";
        this.address = "";
        this.firstName = "";
        this.lastName = "";
    }

    public User getUserByUsername(String username) {
        Database db = new Database();
        Connection conn = db.getConnection();
        if (conn != null) {
            try {
                PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username= ?");
                ps.setString(1, username);
                ResultSet rs = ps.executeQuery();
                return new User(
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getString("phone"),
                        rs.getString("address"),
                        rs.getString("first_name"),
                        rs.getString("last_name")
                );
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return null;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
    }

    public void setPassword(String password) {
    }
}
