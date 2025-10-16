package es.tsumeapps.user_directory_service.controller;
import es.tsumeapps.user_directory_service.dto.CommonResponse;
import es.tsumeapps.user_directory_service.dto.output.commonOutput.CommonOutput;
import es.tsumeapps.user_directory_service.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get-all")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/locations")
    public CommonResponse<List<CommonOutput>> getAllLocations() {
        return commonService.getAllLocations(); // ya devuelve CommonResponse
    }

    @GetMapping("/playstyles")
    public CommonResponse<List<CommonOutput>> getAllPlayStyles() {
        return commonService.getAllPlayStyles();
    }

    @GetMapping("/roltypes")
    public CommonResponse<List<CommonOutput>> getAllRolTypes() {
        return commonService.getAllRolTypes();
    }
}
