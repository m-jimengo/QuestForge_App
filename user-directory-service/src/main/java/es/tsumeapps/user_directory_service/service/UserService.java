package es.tsumeapps.user_directory_service.service;

import es.tsumeapps.user_directory_service.UserClient;
import es.tsumeapps.user_directory_service.dto.CommonResponse;
import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserClient userClient;

    public CommonResponse<List<UserListOutputDTO>> searchUsers(
            List<String> locations,
            List<String> rolTypes,
            List<String> playStyles,
            List<Integer> ages,
            List<String> genders
    ) {
        // opcional: trata [] como null para que el back filtre solo si hay valores
        locations  = nullIfEmpty(locations);
        rolTypes   = nullIfEmpty(rolTypes);
        playStyles = nullIfEmpty(playStyles);
        ages       = nullIfEmpty(ages);
        genders    = nullIfEmpty(genders);

        return userClient.searchUsers(locations, rolTypes, playStyles, ages, genders);
    }

    private static <T> List<T> nullIfEmpty(List<T> list) {
        return (list == null || list.isEmpty()) ? null : list;
    }
}
