package ma.nsi.service;

import ma.nsi.domain.Engin;
import ma.nsi.repository.EnginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Engin}.
 */
@Service
@Transactional
public class EnginService {

    private final Logger log = LoggerFactory.getLogger(EnginService.class);

    private final EnginRepository enginRepository;

    public EnginService(EnginRepository enginRepository) {
        this.enginRepository = enginRepository;
    }

    /**
     * Save a engin.
     *
     * @param engin the entity to save.
     * @return the persisted entity.
     */
    public Engin save(Engin engin) {
        log.debug("Request to save Engin : {}", engin);
        return enginRepository.save(engin);
    }

    /**
     * Get all the engins.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Engin> findAll(Pageable pageable) {
        log.debug("Request to get all Engins");
        return enginRepository.findAll(pageable);
    }


    /**
     * Get one engin by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Engin> findOne(Long id) {
        log.debug("Request to get Engin : {}", id);
        return enginRepository.findById(id);
    }

    /**
     * Delete the engin by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Engin : {}", id);
        enginRepository.deleteById(id);
    }
}
