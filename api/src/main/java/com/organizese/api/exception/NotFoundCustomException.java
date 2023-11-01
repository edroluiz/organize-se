package com.organizese.api.exception;

public class NotFoundCustomException extends RuntimeException {
    public NotFoundCustomException(String message) {
        super(message);
    }
}
