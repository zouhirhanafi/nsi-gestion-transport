package ma.nsi.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import ma.nsi.domain.Engin;
import ma.nsi.domain.*; // for static metamodels
import ma.nsi.repository.EnginRepository;
import ma.nsi.service.dto.EnginCriteria;

/**
 * Service for executing complex queries for {@link Engin} entities in the database.
 * The main input is a {@link EnginCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Engin} or a {@link Page} of {@link Engin} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EnginQueryService extends QueryService<Engin> {

    private final Logger log = LoggerFactory.getLogger(EnginQueryService.class);

    private final EnginRepository enginRepository;

    public EnginQueryService(EnginRepository enginRepository) {
        this.enginRepository = enginRepository;
    }

    /**
     * Return a {@link List} of {@link Engin} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Engin> findByCriteria(EnginCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Engin> specification = createSpecification(criteria);
        return enginRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Engin} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Engin> findByCriteria(EnginCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Engin> specification = createSpecification(criteria);
        return enginRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EnginCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Engin> specification = createSpecification(criteria);
        return enginRepository.count(specification);
    }

    /**
     * Function to convert {@link EnginCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Engin> createSpecification(EnginCriteria criteria) {
        Specification<Engin> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Engin_.id));
            }
            if (criteria.getType() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getType(), Engin_.type));
            }
            if (criteria.getReference() != null) {
                specification = specification.and(buildStringSpecification(criteria.getReference(), Engin_.reference));
            }
            if (criteria.getLibelle() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLibelle(), Engin_.libelle));
            }
        }
        return specification;
    }
}
