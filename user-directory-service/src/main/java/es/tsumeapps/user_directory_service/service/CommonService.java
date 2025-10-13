package es.tsumeapps.user_directory_service.service;

import es.tsumeapps.user_directory_service.UserClient;
import es.tsumeapps.user_directory_service.dto.output.commonOutput.CommonOutput;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final UserClient userCommonClient;

    public List<CommonOutput> getAllLocations() {
        return userCommonClient.getAllLocations();
    }

    public List<CommonOutput> getAllPlayStyles() {
        return userCommonClient.getAllPlayStyles();
    }

    public List<CommonOutput> getAllRolTypes() {
        return userCommonClient.getAllRolTypes();
    }
}