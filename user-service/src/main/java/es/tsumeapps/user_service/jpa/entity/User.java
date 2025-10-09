package es.tsumeapps.user_service.exception.jpa.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

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

    @Column(name = "user_bio")
    private String bio;

    @ManyToOne
    @JoinColumn(name = "user_location")
    private Location location;

    @Column(name = "user_quote", length = 255)
    private String quote;

    @Column(name = "user_avaiability", length = 255)
    private String avaiability;

    @ManyToOne
    @JoinColumn(name = "user_play_style")
    private PlayStyle playStyle;

    @ManyToOne
    @JoinColumn(name = "user_rol_type")
    private RolType rolType;

    @Column(name = "user_image", length = 255)
    private String image;

    @ManyToMany(mappedBy = "users")
    private Set<Location> locations;

    @ManyToMany(mappedBy = "users")
    private Set<PlayStyle> playStyles;

    @ManyToMany(mappedBy = "users")
    private Set<RolType> rolTypes;
}