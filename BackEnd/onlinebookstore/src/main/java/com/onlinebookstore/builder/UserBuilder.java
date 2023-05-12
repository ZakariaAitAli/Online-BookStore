package com.onlinebookstore.builder;

import com.onlinebookstore.models.User;

public interface UserBuilder {
    public void setEmail(String email);
    public void setPassword(String password);
    public User getUser();
    void setBalance(double balance);
}

