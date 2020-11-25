package ma.nsi.repository;

import java.util.List;
import ma.nsi.domain.Affectation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Affectation entity.
 */
@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long>, JpaSpecificationExecutor<Affectation> {
    @Query("select affectation from Affectation affectation where affectation.attributeur.login = ?#{principal.username}")
    List<Affectation> findByAttributeurIsCurrentUser();

    @Query("select affectation from Affectation affectation where affectation.session.id = :sessionId")
    List<Affectation> findBySession(@Param("sessionId") Long sessionId);
}
