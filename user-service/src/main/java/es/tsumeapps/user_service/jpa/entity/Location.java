package es.tsumeapps.user_service.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "location")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // ✅ Solo incluir campos marcados
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    @EqualsAndHashCode.Include // ✅ Solo el ID entra en equals/hashCode
    private Long id;

    @Column(name = "location_name", nullable = false, length = 100)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "location_user",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @ToString.Exclude // ✅ Evita bucles en logs y JSON
    private Set<User> users;
}
