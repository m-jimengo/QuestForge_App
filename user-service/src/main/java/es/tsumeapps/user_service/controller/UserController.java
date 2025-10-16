package es.tsumeapps.user_service.controller;

import es.tsumeapps.user_service.dto.CommonResponse;
import es.tsumeapps.user_service.dto.input.CreateUserInput;
import es.tsumeapps.user_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_service.jpa.entity.User;
import es.tsumeapps.user_service.jpa.repository.UserRepository;
import es.tsumeapps.user_service.security.JwtService;
import es.tsumeapps.user_service.service.UserService;
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
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // 🔹 Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<CommonResponse<List<UserListOutputDTO>>> getAllUsers() {
        var data = userService.getAllUsers();
        return ResponseEntity.ok(CommonResponse.ok(data));
    }

    // 🔹 Crear nuevo usuario
    @PostMapping("/new-user")
    public ResponseEntity<CommonResponse<UserListOutputDTO>> createUser(@RequestBody CreateUserInput input) {
        var created = userService.createUser(input);
        return ResponseEntity.ok(CommonResponse.ok(created));
    }

    // 🔹 Filtrar usuarios (ahora incluye rolDetails)
    @GetMapping("/filter")
    public ResponseEntity<CommonResponse<List<UserListOutputDTO>>> filterUsers(
            @RequestParam(required = false) List<String> locations,
            @RequestParam(required = false) List<String> rolTypes,
            @RequestParam(required = false) List<String> playStyles,
            @RequestParam(required = false) List<String> rolDetails,
            @RequestParam(required = false) List<Integer> ages,
            @RequestParam(required = false) List<String> genders
    ) {
        var result = userService.filterUsers(
                locations,
                rolTypes,
                playStyles,
                rolDetails, // 👈 nuevo parámetro añadido
                ages,
                genders
        );
        return ResponseEntity.ok(CommonResponse.ok(result));
    }

    // 🔹 Obtener perfil del usuario logueado
    @GetMapping("/me")
    public ResponseEntity<UserListOutputDTO> getLoggedUser(@RequestHeader("Authorization") String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String token = header.substring(7);
        Long userId = jwtService.extractUserId(token);

        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(userService.mapToOutputDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }
}
