package es.tsumeapps.user_service.Exceptions;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponse {
    private String code;
    private String message;
    private int status;
    private String path;
    private LocalDateTime timestamp;
}