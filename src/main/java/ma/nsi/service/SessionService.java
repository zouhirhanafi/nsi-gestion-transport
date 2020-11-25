package ma.nsi.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import ma.nsi.domain.Affectation;
import ma.nsi.domain.Session;
import ma.nsi.repository.AffectationRepository;
import ma.nsi.repository.SessionRepository;
import ma.nsi.service.dto.SessionDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Session}.
 */
@Service
@Transactional
public class SessionService {
    private final Logger log = LoggerFactory.getLogger(SessionService.class);

    private final AffectationRepository affectationRepository;
    private final SessionRepository sessionRepository;
    private final SessionManager sessionManager;

    public SessionService(AffectationRepository affectationRepository, SessionRepository sessionRepository, SessionManager sessionManager) {
        this.affectationRepository = affectationRepository;
        this.sessionRepository = sessionRepository;
        this.sessionManager = sessionManager;
    }

    /**
     * Save a session.
     *
     * @param session the entity to save.
     * @return the persisted entity.
     */
    public Session save(Session session) {
        log.debug("Request to save Session : {}", session);
        return sessionRepository.save(session);
    }

    @Transactional(readOnly = true)
    public Optional<Session> findCurrentSession() {
        log.debug("Request to get my current session");
        return sessionManager.findCurrentSession();
    }

    @Transactional(readOnly = true)
    public List<Session> findMySessionList() {
        log.debug("Request to get my list of sessions");
        return sessionRepository.findByCreatedByIsCurrentUser();
    }

    /**
     * Get all the affectations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Session> findAll(Pageable pageable) {
        log.debug("Request to get all Affectations");
        return sessionRepository.findAll(pageable);
    }

    /**
     * Get one session by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Session> findOne(Long id) {
        log.debug("Request to get Session : {}", id);
        return sessionRepository.findById(id);
    }

    /**
     * Delete the session by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Session : {}", id);
        sessionRepository.deleteById(id);
    }

    public Session close(SessionDto sessionDto) {
        log.debug("Request to close Session : {}", sessionDto);
        Long id = sessionDto.getId();
        Session session = new Session();
        session.setId(id);
        if (id == null) {
            session.setShift(sessionDto.getShift());
            session.setClosed(true);
            session.setDate(sessionDto.getDate());
            session.setLastModifiedDate(Instant.now());
            session = save(session);
        } else {
            findOne(id)
                .ifPresent(
                    s -> {
                        s.setClosed(true);
                        s.setLastModifiedDate(Instant.now());
                    }
                );
        }
        List<Affectation> affectations = sessionDto.getAffectations();
        for (Affectation affectation : affectations) {
            affectation.setSession(session);
            affectationRepository.save(affectation);
        }
        return session;
    }
}
