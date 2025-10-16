package es.javiapps.login.security;

import es.javiapps.login.dto.LoginRequest;
import es.javiapps.login.entity.User;
import es.javiapps.login.repository.UserRepository;
import es.javiapps.login.service.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    return new RuntimeException("User not found");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtService.generateToken(
                user.getEmail(),
                Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail()
                )
        );
        return new LoginResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImage()
        );
    }
}
