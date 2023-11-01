package com.organizese.api.exception;

public class BadRequestCustomException extends RuntimeException {
    public BadRequestCustomException(String message) {
        super(message);
    }
}
