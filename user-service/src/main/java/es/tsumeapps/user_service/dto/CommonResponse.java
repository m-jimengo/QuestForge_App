package es.tsumeapps.user_service;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CommonResponse<T> {
    private boolean success;
    private String message;
    private T response;

    public static <T> CommonResponse<T> ok(T data) {
        return CommonResponse.<T>builder().success(true).response(data).build();
    }
    public static <T> CommonResponse<T> fail(String message) {
        return CommonResponse.<T>builder().success(false).message(message).build();
    }
}