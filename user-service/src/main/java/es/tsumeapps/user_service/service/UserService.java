package es.tsumeapps.user_service.service;

import es.tsumeapps.user_service.dto.input.CreateUserInput;
import es.tsumeapps.user_service.dto.output.userOutput.UserListOutputDTO;
import java.util.List;

public interface UserService {

    List<UserListOutputDTO> getAllUsers();

    UserListOutputDTO createUser(CreateUserInput input);
    List<UserListOutputDTO> filterUsers(
            List<String> locations,
            List<String> rolTypes,
            List<String> playStyles,
            List<Integer> ages,
            List<String> genders
    );
}
