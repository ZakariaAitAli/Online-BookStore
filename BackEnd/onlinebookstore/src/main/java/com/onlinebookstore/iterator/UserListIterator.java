package com.onlinebookstore.iterator;

import com.onlinebookstore.builder.ConcreteUserBuilder;
import com.onlinebookstore.builder.UserBuilder;
import com.onlinebookstore.models.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserListIterator implements UserIterator {

    private final List<User> userList;
    private int index = 0;

    public UserListIterator() {
        userList = new ArrayList<User>();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/bookshop", "root", "");
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM users");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                UserBuilder builder = new ConcreteUserBuilder();
                builder.setEmail(rs.getString("email"));
                builder.setPassword(rs.getString("password"));
                builder.setBalance(rs.getDouble("balance"));
                User u = builder.getUser();
                userList.add(u);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public boolean hasNext() {
        return index < userList.size();
    }

    public User next() {
        if (this.hasNext()) {
            return userList.get(index++);
        } else {
            return null;
        }
    }
}

