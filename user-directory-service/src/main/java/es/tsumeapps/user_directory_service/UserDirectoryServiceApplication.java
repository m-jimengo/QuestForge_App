package es.tsumeapps.user_directory_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class UserDirectoryServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserDirectoryServiceApplication.class, args);
	}
}