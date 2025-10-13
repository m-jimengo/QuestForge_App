package es.tsumeapps.user_service.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private final HttpStatus status;
    private final String code;

    public ApiException(String code, String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.code = code;
    }
}