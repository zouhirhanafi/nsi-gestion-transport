package ma.nsi.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link ma.nsi.domain.Conducteur} entity. This class is used
 * in {@link ma.nsi.web.rest.ConducteurResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /conducteurs?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ConducteurCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nom;

    private IntegerFilter affectation;

    public ConducteurCriteria() {
    }

    public ConducteurCriteria(ConducteurCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nom = other.nom == null ? null : other.nom.copy();
        this.affectation = other.affectation == null ? null : other.affectation.copy();
    }

    @Override
    public ConducteurCriteria copy() {
        return new ConducteurCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNom() {
        return nom;
    }

    public void setNom(StringFilter nom) {
        this.nom = nom;
    }

    public IntegerFilter getAffectation() {
        return affectation;
    }

    public void setAffectation(IntegerFilter affectation) {
        this.affectation = affectation;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ConducteurCriteria that = (ConducteurCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nom, that.nom) &&
            Objects.equals(affectation, that.affectation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nom,
        affectation
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConducteurCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nom != null ? "nom=" + nom + ", " : "") +
                (affectation != null ? "affectation=" + affectation + ", " : "") +
            "}";
    }

}
