package ma.nsi.service.dto;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.InstantFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import java.io.Serializable;
import java.util.Objects;
import ma.nsi.domain.enumeration.StatutAffectation;

/**
 * Criteria class for the {@link ma.nsi.domain.Affectation} entity. This class is used
 * in {@link ma.nsi.web.rest.AffectationResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /affectations?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AffectationCriteria implements Serializable, Criteria {

    /**
     * Class for filtering StatutAffectation
     */
    public static class StatutAffectationFilter extends Filter<StatutAffectation> {

        public StatutAffectationFilter() {}

        public StatutAffectationFilter(StatutAffectationFilter filter) {
            super(filter);
        }

        @Override
        public StatutAffectationFilter copy() {
            return new StatutAffectationFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private InstantFilter dateAffectation;

    private InstantFilter dateCreation;

    private StatutAffectationFilter statut;

    private StringFilter motifAnnulation;

    private IntegerFilter operation;

    private StringFilter reference;

    private StringFilter commentaire;

    private LongFilter attributeurId;

    private LongFilter enginId;

    private LongFilter agentId;

    public AffectationCriteria() {}

    public AffectationCriteria(AffectationCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.dateAffectation = other.dateAffectation == null ? null : other.dateAffectation.copy();
        this.dateCreation = other.dateCreation == null ? null : other.dateCreation.copy();
        this.statut = other.statut == null ? null : other.statut.copy();
        this.motifAnnulation = other.motifAnnulation == null ? null : other.motifAnnulation.copy();
        this.operation = other.operation == null ? null : other.operation.copy();
        this.reference = other.reference == null ? null : other.reference.copy();
        this.commentaire = other.commentaire == null ? null : other.commentaire.copy();
        this.attributeurId = other.attributeurId == null ? null : other.attributeurId.copy();
        this.enginId = other.enginId == null ? null : other.enginId.copy();
        this.agentId = other.agentId == null ? null : other.agentId.copy();
    }

    @Override
    public AffectationCriteria copy() {
        return new AffectationCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public InstantFilter getDateAffectation() {
        return dateAffectation;
    }

    public void setDateAffectation(InstantFilter dateAffectation) {
        this.dateAffectation = dateAffectation;
    }

    public InstantFilter getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(InstantFilter dateCreation) {
        this.dateCreation = dateCreation;
    }

    public StatutAffectationFilter getStatut() {
        return statut;
    }

    public void setStatut(StatutAffectationFilter statut) {
        this.statut = statut;
    }

    public StringFilter getMotifAnnulation() {
        return motifAnnulation;
    }

    public void setMotifAnnulation(StringFilter motifAnnulation) {
        this.motifAnnulation = motifAnnulation;
    }

    public IntegerFilter getOperation() {
        return operation;
    }

    public void setOperation(IntegerFilter operation) {
        this.operation = operation;
    }

    public StringFilter getReference() {
        return reference;
    }

    public void setReference(StringFilter reference) {
        this.reference = reference;
    }

    public StringFilter getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(StringFilter commentaire) {
        this.commentaire = commentaire;
    }

    public LongFilter getAttributeurId() {
        return attributeurId;
    }

    public void setAttributeurId(LongFilter attributeurId) {
        this.attributeurId = attributeurId;
    }

    public LongFilter getEnginId() {
        return enginId;
    }

    public void setEnginId(LongFilter enginId) {
        this.enginId = enginId;
    }

    public LongFilter getAgentId() {
        return agentId;
    }

    public void setAgentId(LongFilter agentId) {
        this.agentId = agentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AffectationCriteria that = (AffectationCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(dateAffectation, that.dateAffectation) &&
            Objects.equals(dateCreation, that.dateCreation) &&
            Objects.equals(statut, that.statut) &&
            Objects.equals(motifAnnulation, that.motifAnnulation) &&
            Objects.equals(operation, that.operation) &&
            Objects.equals(reference, that.reference) &&
            Objects.equals(commentaire, that.commentaire) &&
            Objects.equals(attributeurId, that.attributeurId) &&
            Objects.equals(enginId, that.enginId) &&
            Objects.equals(agentId, that.agentId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            dateAffectation,
            dateCreation,
            statut,
            motifAnnulation,
            operation,
            reference,
            commentaire,
            attributeurId,
            enginId,
            agentId
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AffectationCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (dateAffectation != null ? "dateAffectation=" + dateAffectation + ", " : "") +
                (dateCreation != null ? "dateCreation=" + dateCreation + ", " : "") +
                (statut != null ? "statut=" + statut + ", " : "") +
                (motifAnnulation != null ? "motifAnnulation=" + motifAnnulation + ", " : "") +
                (operation != null ? "operation=" + operation + ", " : "") +
                (reference != null ? "reference=" + reference + ", " : "") +
                (commentaire != null ? "commentaire=" + commentaire + ", " : "") +
                (attributeurId != null ? "attributeurId=" + attributeurId + ", " : "") +
                (enginId != null ? "enginId=" + enginId + ", " : "") +
                (agentId != null ? "agentId=" + agentId + ", " : "") +
            "}";
    }
}
