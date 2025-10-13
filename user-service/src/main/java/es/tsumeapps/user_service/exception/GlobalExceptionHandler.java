package es.tsumeapps.user_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex, HttpServletRequest request) {
        ErrorResponse response = ErrorResponse.builder()
                .code(ex.getCode())
                .message(ex.getMessage())
                .status(ex.getStatus().value())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(ex.getStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        ErrorResponse response = ErrorResponse.builder()
                .code(ErrorCode.INTERNAL_ERROR.code())
                .message(ErrorCode.INTERNAL_ERROR.message())
                .status(ErrorCode.INTERNAL_ERROR.status().value())
                .path(request.getRequestURI())
                .timestamp(LocalDateTime.now())
                .build();

        ex.printStackTrace();
        return ResponseEntity.status(ErrorCode.INTERNAL_ERROR.status()).body(response);
    }
}