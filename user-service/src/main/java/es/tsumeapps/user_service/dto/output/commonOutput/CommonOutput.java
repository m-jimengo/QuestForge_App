package es.tsumeapps.user_service.dto.output.commonOutput;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple DTO for lightweight list items like PlayStyle, Location, RolType.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonOutput {
    private Long id;
    private String name;
}
