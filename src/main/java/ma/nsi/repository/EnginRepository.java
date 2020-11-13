package ma.nsi.repository;

import ma.nsi.domain.Engin;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Engin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnginRepository extends JpaRepository<Engin, Long>, JpaSpecificationExecutor<Engin> {
}
