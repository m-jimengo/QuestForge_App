package es.tsumeapps.user_service.exception.jpa.repository;
import es.tsumeapps.user_service.exception.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}