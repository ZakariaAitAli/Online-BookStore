package com.onlinebookstore.iterator;

import com.onlinebookstore.models.Book;

public interface BookIterator {
    public boolean hasNext();
    public Book next();
}

