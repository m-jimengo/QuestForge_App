package es.tsumeapps.user_directory_service; // ⬅️ importa tu wrapper
import es.tsumeapps.user_directory_service.dto.CommonResponse;
import es.tsumeapps.user_directory_service.dto.output.userOutput.UserListOutputDTO;
import es.tsumeapps.user_directory_service.dto.output.commonOutput.CommonOutput;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserClient {

    // Este sí va bajo /users en el user-service
    @GetMapping("/users/filter")
    CommonResponse<List<UserListOutputDTO>> searchUsers(
            @RequestParam(name = "locations",  required = false) List<String> locations,
            @RequestParam(name = "rolTypes",   required = false) List<String> rolTypes,
            @RequestParam(name = "playStyles", required = false) List<String> playStyles,
            @RequestParam(name = "ages",       required = false) List<Integer> ages,
            @RequestParam(name = "genders",    required = false) List<String> genders
    );

    // Estos van bajo /get-all según tu CommonController
    @GetMapping("/get-all/locations")
    CommonResponse<List<CommonOutput>> getAllLocations();

    @GetMapping("/get-all/playstyles")
    CommonResponse<List<CommonOutput>> getAllPlayStyles();

    @GetMapping("/get-all/roltypes")
    CommonResponse<List<CommonOutput>> getAllRolTypes();
}