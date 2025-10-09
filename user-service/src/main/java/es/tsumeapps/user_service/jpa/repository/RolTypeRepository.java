package es.tsumeapps.user_service.exception.jpa.repository;

import es.tsumeapps.user_service.exception.jpa.entity.RolType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolTypeRepository extends JpaRepository<RolType, Long> {}