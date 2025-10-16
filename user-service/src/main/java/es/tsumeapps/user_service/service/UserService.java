package es.tsumeapps.user_service.service;

import es.tsumeapps.user_service.dto.input.CreateUserInput;
import es.tsumeapps.user_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_service.jpa.entity.User;

import java.util.List;

public interface UserService {

    List<UserListOutputDTO> getAllUsers();

    UserListOutputDTO createUser(CreateUserInput input);

    // 🔹 Firma actualizada: añade List<String> rolDetails
    List<UserListOutputDTO> filterUsers(
            List<String> location,
            List<String> rolType,
            List<String> playStyle,
            List<String> rolDetails,
            List<Integer> age,
            List<String> gender
    );

    UserListOutputDTO getUserProfile(String email);
    UserListOutputDTO mapToOutputDTO(User user);
}
