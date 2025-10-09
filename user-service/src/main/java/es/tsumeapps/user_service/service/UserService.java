package es.tsumeapps.user_service.Services;

import es.tsumeapps.user_service.DTO.Outputs.UserOutput.UserListOutputDTO;

import java.util.List;

public interface UserService {
    List<UserListOutputDTO> getAllUsers();
}