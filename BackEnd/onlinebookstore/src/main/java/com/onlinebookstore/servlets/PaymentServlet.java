package com.onlinebookstore.servlets;

import com.google.gson.Gson;
import com.onlinebookstore.models.Payment;
import com.onlinebookstore.proxy.PaymentService;
import com.onlinebookstore.proxy.PaymentServiceProxy;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "PaymentServlet", value = "/payment-servlet")
public class PaymentServlet extends HttpServlet {
    private PaymentService paymentService = new PaymentServiceProxy();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Payment payment = parsePaymentFromRequest(request);
        try {
            paymentService.processPayment(payment);
            Gson gson = new Gson();
            String json = gson.toJson("Payment processed successfully");
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

        } catch (Exception e) {
            Gson gson = new Gson();
            String json = gson.toJson("Payment failed");
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);

        }

    }

    private Payment parsePaymentFromRequest(HttpServletRequest request) throws IOException {
        String cardNumber = "";
        double amount = 0.0;
        return new Payment(cardNumber, amount);
    }
}
