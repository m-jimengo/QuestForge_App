package es.tsumeapps.user_directory_service.service;


import es.tsumeapps.user_directory_service.UserClient;
import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserClient userClient;

    public List<UserListOutputDTO> searchUsers(
            List<String> location,
            List<String> rolType,
            List<String> playStyle,
            List<Integer> age,
            List<String> gender
    ) {
        return userClient.searchUsers(location, rolType, playStyle, age, gender);
    }
}
