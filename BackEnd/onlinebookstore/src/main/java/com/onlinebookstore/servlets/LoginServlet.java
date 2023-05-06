package com.onlinebookstore.servlets;

import com.google.gson.Gson;
import com.onlinebookstore.models.Database;
import com.onlinebookstore.models.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(name = "LoginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session =request.getSession () ;
        Gson gson = new Gson();
        if (session.getAttribute("username") != null) {
            User user = new User();
            user = user.getUserByUsername(session.getAttribute("username").toString());
            String json = gson.toJson(user);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not logged in");
        }

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{
            // Create a new instance of the database connection class
            Database db = new Database();
            Connection conn = db.getConnection();
            if (conn != null) {
                PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE username= ? AND password= ?");
                ps.setString(1, request.getParameter("username"));
                ps.setString(2, request.getParameter("password"));
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    User user = new User(
                            rs.getString("username"),
                            rs.getString("email"),
                            rs.getString("phone"),
                            rs.getString("address"),
                            rs.getString("first_name"),
                            rs.getString("last_name")
                    );
                    HttpSession s =request.getSession () ;
                    s.setAttribute("username", user.getUsername());
                    PrintWriter out = response.getWriter();
                    out.println("Welcome " + user.getUsername());
                }
            }
        } catch (SQLException | RuntimeException e) {
            e.printStackTrace();
        }
    }
}
