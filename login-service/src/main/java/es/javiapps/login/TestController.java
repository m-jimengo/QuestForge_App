package es.javiapps.login;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String test() {
        return "Hello World from login!";
    }


    @GetMapping("/login/hello")
    public String test2() {
        return "Hello World from login and long path!";
    }
}
