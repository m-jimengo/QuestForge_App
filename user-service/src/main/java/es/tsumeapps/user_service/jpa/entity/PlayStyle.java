package es.tsumeapps.user_service.exception.jpa.entity;


import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "play_style")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayStyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "play_style_id")
    private Long id;

    @Column(name = "play_style_name", nullable = false, length = 100)
    private String name;

    @ManyToMany
    @JoinTable(
            name = "play_style_user",
            joinColumns = @JoinColumn(name = "play_style_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;
}