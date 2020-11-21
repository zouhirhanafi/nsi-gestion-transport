package ma.nsi.service;

import java.util.Optional;
import ma.nsi.domain.Affectation;
import ma.nsi.domain.enumeration.StatutAffectation;
import ma.nsi.repository.AffectationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Affectation}.
 */
@Service
@Transactional
public class AffectationService {
    private final Logger log = LoggerFactory.getLogger(AffectationService.class);

    private final AffectationRepository affectationRepository;

    public AffectationService(AffectationRepository affectationRepository) {
        this.affectationRepository = affectationRepository;
    }

    /**
     * Save a affectation.
     *
     * @param affectation the entity to save.
     * @return the persisted entity.
     */
    public Affectation save(Affectation affectation) {
        log.debug("Request to save Affectation : {}", affectation);
        return affectationRepository.save(affectation);
    }

    /**
     * Get all the affectations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Affectation> findAll(Pageable pageable) {
        log.debug("Request to get all Affectations");
        return affectationRepository.findAll(pageable);
    }

    /**
     * Get one affectation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Affectation> findOne(Long id) {
        log.debug("Request to get Affectation : {}", id);
        return affectationRepository.findById(id);
    }

    /**
     * Delete the affectation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Affectation : {}", id);
        findOne(id)
            .ifPresent(
                affectation -> {
                    affectation.setStatut(StatutAffectation.S);
                }
            );
        //        affectationRepository.deleteById(id);
    }

    public void cancel(Long id, String motif) {
        log.debug("Request to cancel Affectation : {} with motif : {}", id, motif);
        findOne(id)
            .ifPresent(
                affectation -> {
                    affectation.setStatut(StatutAffectation.N);
                    affectation.setMotifAnnulation(motif);
                }
            );
        //        affectationRepository.deleteById(id);
    }
}
