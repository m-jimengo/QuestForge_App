package es.tsumeapps.user_service.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserInput {

    private String name;
    private Integer age;
    private String gender;
    private String email;
    private String bio;
    private String quote;

    private List<String> avaiability;

    private String image;

    private Long locationId;

    private List<Long> playStyleIds;

    private List<Long> rolTypeIds;
}
