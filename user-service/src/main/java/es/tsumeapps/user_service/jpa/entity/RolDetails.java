package es.tsumeapps.user_service.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "rol_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_details_id")
    private Long id;

    @Column(name = "rol_details", nullable = false, unique = true, length = 100)
    private String name;

    @ManyToMany(mappedBy = "rolDetails")
    private Set<User> users;
}