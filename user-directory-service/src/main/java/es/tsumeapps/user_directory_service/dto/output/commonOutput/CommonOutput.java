package es.tsumeapps.user_directory_service.dto.output.commonOutput;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonOutput {
    private Long id;
    private String name;
}