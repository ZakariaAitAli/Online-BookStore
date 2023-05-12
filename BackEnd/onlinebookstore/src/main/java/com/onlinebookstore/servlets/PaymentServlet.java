package com.onlinebookstore.servlets;

import com.onlinebookstore.models.Payment;
import com.onlinebookstore.proxy.PaymentService;
import com.onlinebookstore.proxy.PaymentServiceProxy;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "PaymentServlet", value = "/payment-servlet")
public class PaymentServlet extends HttpServlet {
    private PaymentService paymentService = new PaymentServiceProxy();

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Parse the payment details from the request parameters
        String cardNumber = request.getParameter("cardNumber");
        double amount = Double.parseDouble(request.getParameter("amount"));
        Payment payment = new Payment(cardNumber, amount);

        // Process the payment
        try {
            paymentService.processPayment(payment);

            // Payment succeeded, return a success JSON response
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"status\": \"success\"}");
            out.flush();
        } catch (Exception e) {
            // Payment failed due to authorization error, return an error JSON response
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"status\": \"error\", \"message\": \"" + e.getMessage() + "\"}");
            out.flush();
        }
    }
}

