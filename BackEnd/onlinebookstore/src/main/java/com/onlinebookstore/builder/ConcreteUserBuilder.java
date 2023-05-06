package com.onlinebookstore.builder;

import com.onlinebookstore.models.User;

public class ConcreteUserBuilder implements UserBuilder {
    private User user;

    public ConcreteUserBuilder() {
        user = new User();
    }

    public void setFirstName(String firstName) {
        user.setFirstName(firstName);
    }

    public void setLastName(String lastName) {
        user.setLastName(lastName);
    }

    public void setEmail(String email) {
        user.setEmail(email);
    }

    public void setPassword(String password) {
        user.setPassword(password);
    }

    public void setAddress(String address) {
        user.setAddress(address);
    }

    public void setPhoneNumber(String phoneNumber) {
        user.setPhoneNumber(phoneNumber);
    }

    public User getUser() {
        return user;
    }
}
