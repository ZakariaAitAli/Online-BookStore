package com.onlinebookstore.servlets;

import com.google.gson.Gson;
import com.onlinebookstore.iterator.BookIterator;
import com.onlinebookstore.iterator.BookListIterator;
import com.onlinebookstore.models.Book;
import com.onlinebookstore.models.BookImageFetcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "BookServlet", value = "/book-servlet")
public class BookServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        BookIterator iterator = new BookListIterator();
        List<Book> bookList = new ArrayList<Book>();
        while (iterator.hasNext()) {
            Book book = iterator.next();
            String imageUrl = BookImageFetcher.getImageUrl(book.getTitle());
            book.setImage(imageUrl);
            bookList.add(book);
        }
        String json = gson.toJson(bookList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

}

