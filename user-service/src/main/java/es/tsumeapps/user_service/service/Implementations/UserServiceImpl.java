package es.tsumeapps.user_service.Services.Implementations;

import es.tsumeapps.user_service.DTO.Outputs.UserOutput.UserListOutputDTO;
import es.tsumeapps.user_service.Entities.Location;
import es.tsumeapps.user_service.Entities.PlayStyle;
import es.tsumeapps.user_service.Entities.RolType;
import es.tsumeapps.user_service.Entities.User;
import es.tsumeapps.user_service.Interfaces.UserInterface;
import es.tsumeapps.user_service.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserInterface userRepository;

    @Override
    public List<UserListOutputDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toOutputDTO)
                .collect(Collectors.toList());
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
                .locationName(user.getLocation() != null ? user.getLocation().getName() : null)
                .playStyleName(user.getPlayStyle() != null ? user.getPlayStyle().getName() : null)
                .rolTypeName(user.getRolType() != null ? user.getRolType().getName() : null)
                .locations(user.getLocations() != null ?
                        user.getLocations().stream()
                                .map(Location::getName)
                                .collect(Collectors.toSet()) : null)
                .playStyles(user.getPlayStyles() != null ?
                        user.getPlayStyles().stream()
                                .map(PlayStyle::getName)
                                .collect(Collectors.toSet()) : null)
                .rolTypes(user.getRolTypes() != null ?
                        user.getRolTypes().stream()
                                .map(RolType::getName)
                                .collect(Collectors.toSet()) : null)
                .build();
    }
}