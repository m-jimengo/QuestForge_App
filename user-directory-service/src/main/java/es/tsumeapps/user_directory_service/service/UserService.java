package es.tsumeapps.user_directory_service.service.implementation;

import org.apache.catalina.User;

import java.util.List;

public interface UserService {
    List<User> searchUsers(String location, String rolType, String playStyle, Integer age, String gender);
}