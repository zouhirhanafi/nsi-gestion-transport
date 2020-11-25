package ma.nsi.service;

import java.util.List;
import java.util.Optional;
import ma.nsi.domain.Session;
import ma.nsi.repository.SessionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

@Service
public class SessionManager {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final SessionRepository sessionRepository;

    public SessionManager(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Transactional(readOnly = true)
    public Optional<Session> findCurrentSession() {
        log.debug("Request to get my current session");
        List<Session> list = sessionRepository.findCurrentSessions();
        Session session = null;
        if (!CollectionUtils.isEmpty(list)) {
            session = list.get(0);
        }
        return Optional.ofNullable(session);
    }
}
