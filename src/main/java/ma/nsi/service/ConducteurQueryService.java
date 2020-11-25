package ma.nsi.service;

import io.github.jhipster.service.QueryService;
import java.util.List;
// for static metamodels
import ma.nsi.domain.Conducteur;
import ma.nsi.domain.Conducteur_;
import ma.nsi.repository.ConducteurRepository;
import ma.nsi.service.dto.ConducteurCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for executing complex queries for {@link Conducteur} entities in the database.
 * The main input is a {@link ConducteurCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Conducteur} or a {@link Page} of {@link Conducteur} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ConducteurQueryService extends QueryService<Conducteur> {
    private final Logger log = LoggerFactory.getLogger(ConducteurQueryService.class);

    private final ConducteurRepository conducteurRepository;

    public ConducteurQueryService(ConducteurRepository conducteurRepository) {
        this.conducteurRepository = conducteurRepository;
    }

    /**
     * Return a {@link List} of {@link Conducteur} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Conducteur> findByCriteria(ConducteurCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Conducteur> specification = createSpecification(criteria);
        return conducteurRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Conducteur} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Conducteur> findByCriteria(ConducteurCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Conducteur> specification = createSpecification(criteria);
        return conducteurRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ConducteurCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Conducteur> specification = createSpecification(criteria);
        return conducteurRepository.count(specification);
    }

    /**
     * Function to convert {@link ConducteurCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Conducteur> createSpecification(ConducteurCriteria criteria) {
        Specification<Conducteur> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Conducteur_.id));
            }
            if (criteria.getNom() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNom(), Conducteur_.nom));
            }
            if (criteria.getActivated() != null) {
                specification = specification.and(buildSpecification(criteria.getActivated(), Conducteur_.activated));
            }
            //            if (criteria.getAffectation() != null) {
            //                specification = specification.and(buildRangeSpecification(criteria.getAffectation(), Conducteur_.affectation));
            //            }
        }
        return specification;
    }
}
