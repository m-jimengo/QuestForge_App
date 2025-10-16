package es.tsumeapps.user_service.controller;

import es.tsumeapps.user_service.dto.CommonResponse;
import es.tsumeapps.user_service.dto.output.commonOutput.CommonOutput;
import es.tsumeapps.user_service.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/get-all")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CommonController {

    private final CommonService commonService;

    @GetMapping("/locations")
    public ResponseEntity<CommonResponse<List<CommonOutput>>> getAllLocations() {
        var data = commonService.getAllLocations();
        return ResponseEntity.ok(CommonResponse.ok(data));
    }

    @GetMapping("/playstyles")
    public ResponseEntity<CommonResponse<List<CommonOutput>>> getAllPlayStyles() {
        var data = commonService.getAllPlayStyles();
        return ResponseEntity.ok(CommonResponse.ok(data));
    }

    @GetMapping("/roltypes")
    public ResponseEntity<CommonResponse<List<CommonOutput>>> getAllRolTypes() {
        var data = commonService.getAllRolTypes();
        return ResponseEntity.ok(CommonResponse.ok(data));
    }

    @GetMapping("/roldetails")
    public ResponseEntity<CommonResponse<List<CommonOutput>>> getAllRolDetails() {
        var data = commonService.getAllRolDetails();
        return ResponseEntity.ok(CommonResponse.ok(data));
    }
}
