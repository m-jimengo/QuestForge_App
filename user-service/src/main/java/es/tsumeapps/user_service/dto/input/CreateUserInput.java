package es.tsumeapps.user_service.dto.input;

import lombok.Data;
import java.util.List;
import java.util.Set;

@Data
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
    private Set<Long> playStyleIds;
    private Set<Long> rolTypeIds;

    private Set<Long> rolDetailsIds;
}
