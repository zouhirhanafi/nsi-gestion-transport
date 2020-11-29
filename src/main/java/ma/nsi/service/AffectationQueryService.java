package ma.nsi.service;

import io.github.jhipster.service.QueryService;
import java.util.List;
import javax.persistence.criteria.JoinType;
import ma.nsi.domain.*; // for static metamodels
import ma.nsi.domain.Affectation;
import ma.nsi.repository.AffectationRepository;
import ma.nsi.service.dto.AffectationCriteria;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for executing complex queries for {@link Affectation} entities in the database.
 * The main input is a {@link AffectationCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Affectation} or a {@link Page} of {@link Affectation} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AffectationQueryService extends QueryService<Affectation> {
    private final Logger log = LoggerFactory.getLogger(AffectationQueryService.class);

    private final AffectationRepository affectationRepository;

    public AffectationQueryService(AffectationRepository affectationRepository) {
        this.affectationRepository = affectationRepository;
    }

    /**
     * Return a {@link List} of {@link Affectation} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Affectation> findByCriteria(AffectationCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Affectation> specification = createSpecification(criteria);
        return affectationRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Affectation} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Affectation> findByCriteria(AffectationCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Affectation> specification = createSpecification(criteria);
        return affectationRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AffectationCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Affectation> specification = createSpecification(criteria);
        return affectationRepository.count(specification);
    }

    /**
     * Function to convert {@link AffectationCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Affectation> createSpecification(AffectationCriteria criteria) {
        Specification<Affectation> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Affectation_.id));
            }
            if (criteria.getDateAffectation() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateAffectation(), Affectation_.dateAffectation));
            }
            if (criteria.getDateCreation() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateCreation(), Affectation_.dateCreation));
            }
            if (criteria.getStatut() != null) {
                specification = specification.and(buildSpecification(criteria.getStatut(), Affectation_.statut));
            }
            if (criteria.getMotifAnnulation() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMotifAnnulation(), Affectation_.motifAnnulation));
            }
            if (criteria.getOperation() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getOperation(), Affectation_.operation));
            }
            if (criteria.getReference() != null) {
                specification = specification.and(buildStringSpecification(criteria.getReference(), Affectation_.reference));
            }
            if (criteria.getCommentaire() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCommentaire(), Affectation_.commentaire));
            }
            if (criteria.getAttributeurId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAttributeurId(),
                            root -> root.join(Affectation_.attributeur, JoinType.LEFT).get(User_.id)
                        )
                    );
            }
            if (criteria.getEnginId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getEnginId(), root -> root.join(Affectation_.engin, JoinType.LEFT).get(Engin_.id))
                    );
            }
            if (criteria.getAgentId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAgentId(), root -> root.join(Affectation_.agent, JoinType.LEFT).get(Conducteur_.id))
                    );
            }
        }
        return specification;
    }
}
