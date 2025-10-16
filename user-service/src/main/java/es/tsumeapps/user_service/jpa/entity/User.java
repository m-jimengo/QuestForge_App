package es.tsumeapps.user_service.jpa.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;
import java.util.List;

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

    @Column(name = "user_age")
    private Integer age;

    @Column(name = "user_gender", length = 20)
    private String gender;

    @Column(name = "user_email", length = 150, unique = true)
    private String email;

    @Column(name = "user_password", nullable = false, length = 255)
    private String password;

    @Column(name = "user_bio")
    private String bio;

    @ManyToOne
    @JoinColumn(name = "user_location")
    private Location location;

    @Column(name = "user_quote", length = 255)
    private String quote;

    @Column(name = "user_avaiability", columnDefinition = "text[]")
    private List<String> avaiability;

    @Column(name = "user_image", length = 255)
    private String image;

    @ManyToMany
    @JoinTable(
            name = "play_style_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "play_style_id")
    )
    private Set<PlayStyle> playStyles;

    @ManyToMany
    @JoinTable(
            name = "rol_type_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_type_id")
    )
    private Set<RolType> rolTypes;

    @ManyToMany
    @JoinTable(
            name = "rol_details_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_details_id")
    )
    private Set<RolDetails> rolDetails;

}