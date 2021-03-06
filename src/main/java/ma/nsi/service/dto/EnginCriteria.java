package ma.nsi.service.dto;

import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import java.io.Serializable;
import java.util.Objects;

/**
 * Criteria class for the {@link ma.nsi.domain.Engin} entity. This class is used
 * in {@link ma.nsi.web.rest.EnginResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /engins?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EnginCriteria implements Serializable, Criteria {
    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter type;

    private BooleanFilter activated;

    private StringFilter libelle;

    public EnginCriteria() {}

    public EnginCriteria(EnginCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.type = other.type == null ? null : other.type.copy();
        this.activated = other.activated == null ? null : other.activated.copy();
        this.libelle = other.libelle == null ? null : other.libelle.copy();
    }

    @Override
    public EnginCriteria copy() {
        return new EnginCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getType() {
        return type;
    }

    public void setType(IntegerFilter type) {
        this.type = type;
    }

    public BooleanFilter getActivated() {
        return activated;
    }

    public void setActivated(BooleanFilter activated) {
        this.activated = activated;
    }

    public StringFilter getLibelle() {
        return libelle;
    }

    public void setLibelle(StringFilter libelle) {
        this.libelle = libelle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EnginCriteria that = (EnginCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(type, that.type) &&
            Objects.equals(activated, that.activated) &&
            Objects.equals(libelle, that.libelle)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, activated, libelle);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EnginCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (type != null ? "type=" + type + ", " : "") +
                (activated != null ? "activated=" + activated + ", " : "") +
                (libelle != null ? "libelle=" + libelle + ", " : "") +
            "}";
    }
}
