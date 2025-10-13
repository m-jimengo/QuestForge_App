package es.tsumeapps.user_service.controller;
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
    public ResponseEntity<List<CommonOutput>> getAllLocations() {
        return ResponseEntity.ok(commonService.getAllLocations());
    }

    @GetMapping("/playstyles")
    public ResponseEntity<List<CommonOutput>> getAllPlayStyles() {
        return ResponseEntity.ok(commonService.getAllPlayStyles());
    }

    @GetMapping("/roltypes")
    public ResponseEntity<List<CommonOutput>> getAllRolTypes() {
        return ResponseEntity.ok(commonService.getAllRolTypes());
    }
}
