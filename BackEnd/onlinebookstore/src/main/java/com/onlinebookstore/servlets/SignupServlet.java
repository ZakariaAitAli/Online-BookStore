package com.onlinebookstore.servlets;

import com.google.gson.Gson;
import com.onlinebookstore.builder.ConcreteUserBuilder;
import com.onlinebookstore.builder.UserBuilder;
import com.onlinebookstore.iterator.UserIterator;
import com.onlinebookstore.iterator.UserListIterator;
import com.onlinebookstore.models.Database;
import com.onlinebookstore.models.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "SignupServlet", value = "/signup-servlet")
public class SignupServlet extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        UserIterator iterator = new UserListIterator();
        List<User> userList = new ArrayList<User>();
        while (iterator.hasNext()) {
            User user = iterator.next();
            userList.add(user);
        }
        String json = gson.toJson(userList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Get the request parameters
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String passwordConfirm = request.getParameter("passwordConfirm");

        if (!password.equals(passwordConfirm)) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Passwords do not match");
            return;
        }

        // Create a new UserBuilder object and use it to construct a new User
        UserBuilder builder = new ConcreteUserBuilder();
        builder.setEmail(email);
        builder.setPassword(password);
        builder.setBalance(1000.0);
        User user = builder.getUser();

        // Perform the database operation asynchronously using a separate thread
        Thread saveUserThread = new Thread(() -> {
            // Save the User to the database or perform other actions as needed
            Database database = new Database();
            database.addUser(user);
        });
        saveUserThread.start();

        // Return a response or perform any other necessary actions
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
