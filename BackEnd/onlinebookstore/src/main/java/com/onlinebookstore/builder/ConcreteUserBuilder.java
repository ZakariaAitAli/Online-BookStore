package com.onlinebookstore.builder;

import com.onlinebookstore.models.User;



public class ConcreteUserBuilder implements UserBuilder {
    private User user;
    public ConcreteUserBuilder() {
        user = new User();
    }
    public void setEmail(String email) {
        user.setEmail(email);
    }
    public void setPassword(String password) {
        user.setPassword(password);
    }
    public User getUser() {
        return user;
    }

    public void setBalance(double balance) {
        user.setBalance(balance);
    }
}
