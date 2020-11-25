package ma.nsi.repository;

import java.util.List;
import ma.nsi.domain.Affectation;
import ma.nsi.domain.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Affectation entity.
 */
@Repository
public interface SessionRepository extends JpaRepository<Session, Long>, JpaSpecificationExecutor<Affectation> {
    @Query("select session from Session session where session.createdBy = ?#{principal.username}")
    List<Session> findByCreatedByIsCurrentUser();

    @Query("select session from Session session where session.createdBy = ?#{principal.username} and closed = false")
    List<Session> findCurrentSessions();
}
