package es.tsumeapps.user_service.exception.jpa.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "rol_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_type_id")
    private Long id;

    @Column(name = "rol_type_name", nullable = false, length = 100)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "rol_type_user",
            joinColumns = @JoinColumn(name = "rol_type_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;
}