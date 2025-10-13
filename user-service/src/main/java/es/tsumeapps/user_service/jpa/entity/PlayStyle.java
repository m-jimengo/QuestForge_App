package es.tsumeapps.user_service.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "play_style")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // 🔹 solo los que incluyas manualmente
public class PlayStyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "play_style_id")
    @EqualsAndHashCode.Include // ✅ incluir solo el id
    private Long id;

    @Column(name = "play_style_name", nullable = false, length = 100)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "play_style_user",
            joinColumns = @JoinColumn(name = "play_style_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @ToString.Exclude // 🔹 para evitar recursión en logs
    private Set<User> users;
}
