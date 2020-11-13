package ma.nsi.repository;

import ma.nsi.domain.Conducteur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Conducteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConducteurRepository extends JpaRepository<Conducteur, Long>, JpaSpecificationExecutor<Conducteur> {
}
