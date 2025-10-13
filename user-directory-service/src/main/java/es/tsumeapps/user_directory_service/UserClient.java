package es.tsumeapps.user_directory_service;
import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_directory_service.dto.output.commonOutput.CommonOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/users/filter")
    List<UserListOutputDTO> searchUsers(
            @RequestParam(required = false) List<String> location,
            @RequestParam(required = false) List<String> rolType,
            @RequestParam(required = false) List<String> playStyle,
            @RequestParam(required = false) List<Integer> age,
            @RequestParam(required = false) List<String> gender
    );
    @GetMapping("/get-all/locations")
    List<CommonOutput> getAllLocations();

    @GetMapping("/get-all/playstyles")
    List<CommonOutput> getAllPlayStyles();

    @GetMapping("/get-all/roltypes")
    List<CommonOutput> getAllRolTypes();
}

