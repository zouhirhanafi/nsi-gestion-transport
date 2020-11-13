package ma.nsi.service;

import ma.nsi.domain.Conducteur;
import ma.nsi.repository.ConducteurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Conducteur}.
 */
@Service
@Transactional
public class ConducteurService {

    private final Logger log = LoggerFactory.getLogger(ConducteurService.class);

    private final ConducteurRepository conducteurRepository;

    public ConducteurService(ConducteurRepository conducteurRepository) {
        this.conducteurRepository = conducteurRepository;
    }

    /**
     * Save a conducteur.
     *
     * @param conducteur the entity to save.
     * @return the persisted entity.
     */
    public Conducteur save(Conducteur conducteur) {
        log.debug("Request to save Conducteur : {}", conducteur);
        return conducteurRepository.save(conducteur);
    }

    /**
     * Get all the conducteurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Conducteur> findAll(Pageable pageable) {
        log.debug("Request to get all Conducteurs");
        return conducteurRepository.findAll(pageable);
    }


    /**
     * Get one conducteur by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Conducteur> findOne(Long id) {
        log.debug("Request to get Conducteur : {}", id);
        return conducteurRepository.findById(id);
    }

    /**
     * Delete the conducteur by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Conducteur : {}", id);
        conducteurRepository.deleteById(id);
    }
}
