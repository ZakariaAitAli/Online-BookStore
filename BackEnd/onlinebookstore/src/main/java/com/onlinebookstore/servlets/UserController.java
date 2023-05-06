package com.onlinebookstore.servlets;

import com.onlinebookstore.builder.ConcreteUserBuilder;
import com.onlinebookstore.builder.UserBuilder;
import com.onlinebookstore.models.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "UserServlet", value = "/register-servlet")
public class UserController extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Get the request parameters
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String address = request.getParameter("address");
        String phoneNumber = request.getParameter("phoneNumber");

        // Create a new UserBuilder object and use it to construct a new User
        UserBuilder builder = new ConcreteUserBuilder();
        builder.setFirstName(firstName);
        builder.setLastName(lastName);
        builder.setEmail(email);
        builder.setPassword(password);
        builder.setAddress(address);
        builder.setPhoneNumber(phoneNumber);
        User user = builder.getUser();

        // Save the User to the database or perform other actions as needed
        // ...

        // Set the response content type and write a success message to the output stream
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head><title>Registration Success</title></head>");
        out.println("<body>");
        out.println("<h1>Registration Success</h1>");
        out.println("<p>Thank you for registering, " + firstName + "!</p>");
        out.println("</body></html>");
    }
}
