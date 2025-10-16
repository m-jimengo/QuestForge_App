package es.tsumeapps.user_service.jpa.repository;

import es.tsumeapps.user_service.jpa.entity.RolDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolDetailsRepository extends JpaRepository<RolDetails, Long> {
}