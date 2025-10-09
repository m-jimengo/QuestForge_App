package es.tsumeapps.user_service.Controllers;

import es.tsumeapps.user_service.DTO.Outputs.UserOutput.UserListOutputDTO;
import es.tsumeapps.user_service.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserListOutputDTO>> getAllUsers() {
        List<UserListOutputDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}