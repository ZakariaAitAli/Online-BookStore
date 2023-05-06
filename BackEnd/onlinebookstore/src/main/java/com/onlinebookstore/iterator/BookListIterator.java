package com.onlinebookstore.iterator;

import com.onlinebookstore.models.Book;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class BookListIterator implements BookIterator {

    private final List<Book> bookList;
    private int index = 0;

    public BookListIterator() {
        bookList = new ArrayList<Book>();
        // Code to populate bookList from database goes here
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/bookshop", "root", "");
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM books");
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Book book = new Book();
                book.setId(rs.getInt("id"));
                book.setTitle(rs.getString("title"));
                book.setType(rs.getString("type"));
                book.setPublishedAt(rs.getDate("published_at"));
                book.setStock(rs.getInt("stock"));
                book.setPrice(rs.getDouble("price"));
                bookList.add(book);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public boolean hasNext() {
        return index < bookList.size();
    }

    public Book next() {
        if (this.hasNext()) {
            return bookList.get(index++);
        } else {
            return null;
        }
    }
}

