package es.tsumeapps.user_service.controller;

import es.tsumeapps.user_service.dto.input.CreateUserInput;
import es.tsumeapps.user_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller that handles all user-related endpoints.
 * Provides REST API operations for listing and creating users.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    /**
     * GET /users
     * Retrieves a list of all registered users.
     */
    @GetMapping
    public ResponseEntity<List<UserListOutputDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * POST /users/new-user
     * Creates a new user.
     */
    @PostMapping("/new-user")
    public ResponseEntity<UserListOutputDTO> createUser(@RequestBody CreateUserInput input) {
        return ResponseEntity.ok(userService.createUser(input));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<UserListOutputDTO>> filterUsers(
            @RequestParam(required = false) List<String> locations,
            @RequestParam(required = false) List<String> rolTypes,
            @RequestParam(required = false) List<String> playStyles,
            @RequestParam(required = false) List<Integer> ages,
            @RequestParam(required = false) List<String> genders
    ) {
        return ResponseEntity.ok(
                userService.filterUsers(locations, rolTypes, playStyles, ages, genders)
        );
    }

}