package com.onlinebookstore.builder;

import com.onlinebookstore.models.User;

public interface UserBuilder {
    public void setFirstName(String firstName);
    public void setLastName(String lastName);
    public void setEmail(String email);
    public void setPassword(String password);
    public void setAddress(String address);
    public void setPhoneNumber(String phoneNumber);
    public User getUser();
}

