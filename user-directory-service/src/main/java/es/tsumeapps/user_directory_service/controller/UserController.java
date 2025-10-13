package es.tsumeapps.user_directory_service.controller;

import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_directory_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/filter")
    public List<UserListOutputDTO> searchUsers(
            @RequestParam(required = false) List<String> location,
            @RequestParam(required = false) List<String> rolType,
            @RequestParam(required = false) List<String> playStyle,
            @RequestParam(required = false) List<Integer> age,
            @RequestParam(required = false) List<String> gender
    ) {
        return userService.searchUsers(location, rolType, playStyle, age, gender);
    }
}
