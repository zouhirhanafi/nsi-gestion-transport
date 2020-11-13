package ma.nsi.service;

import ma.nsi.domain.Parameter;
import ma.nsi.repository.ParameterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Parameter}.
 */
@Service
@Transactional
public class ParameterService {

    private final Logger log = LoggerFactory.getLogger(ParameterService.class);

    private final ParameterRepository parameterRepository;

    public ParameterService(ParameterRepository parameterRepository) {
        this.parameterRepository = parameterRepository;
    }

    /**
     * Save a parameter.
     *
     * @param parameter the entity to save.
     * @return the persisted entity.
     */
    public Parameter save(Parameter parameter) {
        log.debug("Request to save Parameter : {}", parameter);
        return parameterRepository.save(parameter);
    }

    /**
     * Get all the parameters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Parameter> findAll(Pageable pageable) {
        log.debug("Request to get all Parameters");
        return parameterRepository.findAll(pageable);
    }


    /**
     * Get one parameter by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Parameter> findOne(Long id) {
        log.debug("Request to get Parameter : {}", id);
        return parameterRepository.findById(id);
    }

    /**
     * Delete the parameter by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Parameter : {}", id);
        parameterRepository.deleteById(id);
    }
}
