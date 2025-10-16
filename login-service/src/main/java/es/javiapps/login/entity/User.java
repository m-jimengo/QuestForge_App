package es.javiapps.login.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.Set;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "\"user\"")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String name;

    @Column(name = "user_email", nullable = false, length = 150, unique = true)
    private String email;

    @Column(name = "user_password", nullable = false, length = 255)
    private String password;

    @Column(name = "user_image", length = 255)
    private String image;
}