package es.tsumeapps.user_service.Outputs;

import lombok.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOutputDTO {
    private Long id;
    private String name;
    private Integer age;
    private String gender;
    private String email;
    private String bio;
    private String quote;
    private String avaiability;
    private String image;

    private String locationName;
    private String playStyleName;
    private String rolTypeName;

    private Set<String> locations;
    private Set<String> playStyles;
    private Set<String> rolTypes;
}