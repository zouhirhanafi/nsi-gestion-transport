package ma.nsi.repository;

import ma.nsi.domain.Affectation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Affectation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long>, JpaSpecificationExecutor<Affectation> {

    @Query("select affectation from Affectation affectation where affectation.attributeur.login = ?#{principal.username}")
    List<Affectation> findByAttributeurIsCurrentUser();
}
