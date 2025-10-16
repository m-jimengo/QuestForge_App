package es.tsumeapps.user_service.service;

import es.tsumeapps.user_service.dto.output.commonOutput.CommonOutput;

import java.util.List;

public interface CommonService {
    List<CommonOutput> getAllLocations();
    List<CommonOutput> getAllPlayStyles();
    List<CommonOutput> getAllRolTypes();
    List<CommonOutput> getAllRolDetails();

}