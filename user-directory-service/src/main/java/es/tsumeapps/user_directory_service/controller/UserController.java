package es.tsumeapps.user_directory_service.controller;
import es.tsumeapps.user_directory_service.dto.CommonResponse;
import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_directory_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/filter")
    public CommonResponse<List<UserListOutputDTO>> searchUsers(
            @RequestParam(required = false) List<String> locations,
            @RequestParam(required = false) List<String> rolTypes,
            @RequestParam(required = false) List<String> playStyles,
            @RequestParam(required = false) List<Integer> ages,
            @RequestParam(name = "genders", required = false) List<String> genders,
            @RequestParam(name = "gender", required = false)  List<String> genderFallback // acepta singular también
    ) {
        if ((genders == null || genders.isEmpty()) && genderFallback != null && !genderFallback.isEmpty()) {
            genders = genderFallback;
        }
        // Passthrough al service (que a su vez llama a Feign)
        return userService.searchUsers(locations, rolTypes, playStyles, ages, genders);
    }
}
