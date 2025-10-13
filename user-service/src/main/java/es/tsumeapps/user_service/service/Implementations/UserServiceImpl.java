package es.tsumeapps.user_service.service.Implementations;

import es.tsumeapps.user_service.dto.input.CreateUserInput;
import es.tsumeapps.user_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_service.exception.ApiException;
import es.tsumeapps.user_service.exception.ErrorCode;
import es.tsumeapps.user_service.jpa.entity.Location;
import es.tsumeapps.user_service.jpa.entity.PlayStyle;
import es.tsumeapps.user_service.jpa.entity.RolType;
import es.tsumeapps.user_service.jpa.entity.User;
import es.tsumeapps.user_service.jpa.repository.LocationRepository;
import es.tsumeapps.user_service.jpa.repository.PlayStyleRepository;
import es.tsumeapps.user_service.jpa.repository.RolTypeRepository;
import es.tsumeapps.user_service.jpa.repository.UserRepository;
import es.tsumeapps.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final PlayStyleRepository playStyleRepository;
    private final RolTypeRepository rolTypeRepository;

    // 🔹 List all users
    @Override
    public List<UserListOutputDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new ApiException(
                    ErrorCode.USER_NOT_FOUND.code(),
                    ErrorCode.USER_NOT_FOUND.message(),
                    ErrorCode.USER_NOT_FOUND.status()
            );
        }

        return users.stream()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

    // 🔹 Create a new user
    @Override
    @Transactional
    public UserListOutputDTO createUser(CreateUserInput input) {
        if (userRepository.existsByEmail(input.getEmail())) {
            throw new ApiException(
                    ErrorCode.EMAIL_ALREADY_EXISTS.code(),
                    ErrorCode.EMAIL_ALREADY_EXISTS.message(),
                    ErrorCode.EMAIL_ALREADY_EXISTS.status()
            );
        }

        Location location = null;
        if (input.getLocationId() != null) {
            location = locationRepository.findById(input.getLocationId())
                    .orElseThrow(() -> new ApiException(
                            ErrorCode.INVALID_INPUT.code(),
                            "Invalid location ID: " + input.getLocationId(),
                            ErrorCode.INVALID_INPUT.status()
                    ));
        }

        Set<PlayStyle> playStyles = null;
        if (input.getPlayStyleIds() != null && !input.getPlayStyleIds().isEmpty()) {
            playStyles = input.getPlayStyleIds().stream()
                    .map(id -> playStyleRepository.findById(id)
                            .orElseThrow(() -> new ApiException(
                                    ErrorCode.INVALID_INPUT.code(),
                                    "Invalid play style ID: " + id,
                                    ErrorCode.INVALID_INPUT.status()
                            )))
                    .collect(Collectors.toSet());
        }

        // 🧙‍♂️ Recuperar múltiples RolTypes
        Set<RolType> rolTypes = null;
        if (input.getRolTypeIds() != null && !input.getRolTypeIds().isEmpty()) {
            rolTypes = input.getRolTypeIds().stream()
                    .map(id -> rolTypeRepository.findById(id)
                            .orElseThrow(() -> new ApiException(
                                    ErrorCode.INVALID_INPUT.code(),
                                    "Invalid role type ID: " + id,
                                    ErrorCode.INVALID_INPUT.status()
                            )))
                    .collect(Collectors.toSet());
        }

        User user = User.builder()
                .name(input.getName())
                .age(input.getAge())
                .gender(input.getGender())
                .email(input.getEmail())
                .bio(input.getBio())
                .quote(input.getQuote())
                .avaiability(input.getAvaiability())
                .image(input.getImage())
                .location(location)
                .playStyles(playStyles)
                .rolTypes(rolTypes)
                .build();

        User savedUser = userRepository.save(user);
        return toOutputDTO(savedUser);
    }
    private UserListOutputDTO toOutputDTO(User user) {
        return UserListOutputDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .age(user.getAge())
                .gender(user.getGender())
                .email(user.getEmail())
                .bio(user.getBio())
                .quote(user.getQuote())
                .avaiability(user.getAvaiability())
                .image(user.getImage())
                .location(user.getLocation() != null ? user.getLocation().getName() : null) // 👈 AÑADIDO
                .playStyles(user.getPlayStyles() != null
                        ? user.getPlayStyles().stream().map(PlayStyle::getName).collect(Collectors.toSet())
                        : null)
                .rolTypes(user.getRolTypes() != null
                        ? user.getRolTypes().stream().map(RolType::getName).collect(Collectors.toSet())
                        : null)
                .build();
    }

    // Filter user
    @Override
    public List<UserListOutputDTO> filterUsers(
            List<String> location,
            List<String> rolType,
            List<String> playStyle,
            List<Integer> age,
            List<String> gender
    ) {
        List<User> users = userRepository.findAll();

        return users.stream()
                .filter(u -> location == null || (u.getLocation() != null && location.contains(u.getLocation().getName())))
                .filter(u -> rolType == null || (u.getRolTypes() != null && u.getRolTypes().stream().anyMatch(r -> rolType.contains(r.getName()))))
                .filter(u -> playStyle == null || (u.getPlayStyles() != null && u.getPlayStyles().stream().anyMatch(p -> playStyle.contains(p.getName()))))
                .filter(u -> age == null || age.contains(u.getAge()))
                .filter(u -> gender == null || gender.contains(u.getGender()))
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
    }

}
