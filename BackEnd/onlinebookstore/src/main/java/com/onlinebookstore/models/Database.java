package com.onlinebookstore.models;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;

public class Database {

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection("jdbc:mysql://localhost:3306/bookshop", "root", "");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void addUser(User user) {
        try {
            Connection con = getConnection();
            java.sql.PreparedStatement stmt = con.prepareStatement("INSERT INTO users (balance, email, password) VALUES (?, ?, ?)");
            stmt.setString(2, user.getEmail());
            stmt.setString(3, user.getPassword());
            stmt.setDouble(1, user.getBalance());
            stmt.executeUpdate();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public Book getBookById(int bookId) {
        try {
            Connection con = getConnection();
            java.sql.PreparedStatement stmt = con.prepareStatement("SELECT * FROM books WHERE id = ?");
            stmt.setInt(1, bookId);
            java.sql.ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Book book = new Book();
                book.setId(rs.getInt("id"));
                book.setTitle(rs.getString("title"));
                book.setType(rs.getString("type"));
                book.setPublishedAt(Date.valueOf(rs.getString("published_at")));
                book.setStock(rs.getInt("stock"));
                book.setPrice(rs.getDouble("price"));
                book.setAuthor(rs.getString("author"));
                return book;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
}
