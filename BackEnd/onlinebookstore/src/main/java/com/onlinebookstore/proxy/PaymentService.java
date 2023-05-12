package com.onlinebookstore.proxy;

import com.onlinebookstore.models.Payment;

public interface PaymentService {
    public void processPayment(Payment payment) throws Exception;
}
