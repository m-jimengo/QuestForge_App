package es.tsumeapps.user_service.exception.jpa.repository;

import es.tsumeapps.user_service.exception.jpa.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {}