package es.tsumeapps.user_directory_service.dto.output.userOutput;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserListOutputDTO {
    private Long id;
    private String name;
    private Integer age;
    private String gender;
    private String email;
    private String bio;
    private String quote;
    private List<String> avaiability;
    private String image;
    private Set<String> playStyles;
    private Set<String> rolTypes;
}

