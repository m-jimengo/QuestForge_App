package es.tsumeapps.user_directory_service.controller;

import es.tsumeapps.user_directory_service.dto.output.commonOutput.CommonOutput;
import es.tsumeapps.user_directory_service.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get-all")
@RequiredArgsConstructor
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/locations")
    public List<CommonOutput> getAllLocations() {
        return commonService.getAllLocations();
    }

    @GetMapping("/playstyles")
    public List<CommonOutput> getAllPlayStyles() {
        return commonService.getAllPlayStyles();
    }

    @GetMapping("/roltypes")
    public List<CommonOutput> getAllRolTypes() {
        return commonService.getAllRolTypes();
    }
}