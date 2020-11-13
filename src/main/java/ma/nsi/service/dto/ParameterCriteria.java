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
 * Criteria class for the {@link ma.nsi.domain.Parameter} entity. This class is used
 * in {@link ma.nsi.web.rest.ParameterResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /parameters?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ParameterCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter label;

    private StringFilter lib2;

    private StringFilter lib3;

    private StringFilter refExterne;

    private StringFilter val1;

    private StringFilter val2;

    private StringFilter val3;

    private IntegerFilter ordre;

    private LongFilter typeId;

    private LongFilter paraentId;

    public ParameterCriteria() {
    }

    public ParameterCriteria(ParameterCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.label = other.label == null ? null : other.label.copy();
        this.lib2 = other.lib2 == null ? null : other.lib2.copy();
        this.lib3 = other.lib3 == null ? null : other.lib3.copy();
        this.refExterne = other.refExterne == null ? null : other.refExterne.copy();
        this.val1 = other.val1 == null ? null : other.val1.copy();
        this.val2 = other.val2 == null ? null : other.val2.copy();
        this.val3 = other.val3 == null ? null : other.val3.copy();
        this.ordre = other.ordre == null ? null : other.ordre.copy();
        this.typeId = other.typeId == null ? null : other.typeId.copy();
        this.paraentId = other.paraentId == null ? null : other.paraentId.copy();
    }

    @Override
    public ParameterCriteria copy() {
        return new ParameterCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getLabel() {
        return label;
    }

    public void setLabel(StringFilter label) {
        this.label = label;
    }

    public StringFilter getLib2() {
        return lib2;
    }

    public void setLib2(StringFilter lib2) {
        this.lib2 = lib2;
    }

    public StringFilter getLib3() {
        return lib3;
    }

    public void setLib3(StringFilter lib3) {
        this.lib3 = lib3;
    }

    public StringFilter getRefExterne() {
        return refExterne;
    }

    public void setRefExterne(StringFilter refExterne) {
        this.refExterne = refExterne;
    }

    public StringFilter getVal1() {
        return val1;
    }

    public void setVal1(StringFilter val1) {
        this.val1 = val1;
    }

    public StringFilter getVal2() {
        return val2;
    }

    public void setVal2(StringFilter val2) {
        this.val2 = val2;
    }

    public StringFilter getVal3() {
        return val3;
    }

    public void setVal3(StringFilter val3) {
        this.val3 = val3;
    }

    public IntegerFilter getOrdre() {
        return ordre;
    }

    public void setOrdre(IntegerFilter ordre) {
        this.ordre = ordre;
    }

    public LongFilter getTypeId() {
        return typeId;
    }

    public void setTypeId(LongFilter typeId) {
        this.typeId = typeId;
    }

    public LongFilter getParaentId() {
        return paraentId;
    }

    public void setParaentId(LongFilter paraentId) {
        this.paraentId = paraentId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ParameterCriteria that = (ParameterCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(label, that.label) &&
            Objects.equals(lib2, that.lib2) &&
            Objects.equals(lib3, that.lib3) &&
            Objects.equals(refExterne, that.refExterne) &&
            Objects.equals(val1, that.val1) &&
            Objects.equals(val2, that.val2) &&
            Objects.equals(val3, that.val3) &&
            Objects.equals(ordre, that.ordre) &&
            Objects.equals(typeId, that.typeId) &&
            Objects.equals(paraentId, that.paraentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        label,
        lib2,
        lib3,
        refExterne,
        val1,
        val2,
        val3,
        ordre,
        typeId,
        paraentId
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParameterCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (label != null ? "label=" + label + ", " : "") +
                (lib2 != null ? "lib2=" + lib2 + ", " : "") +
                (lib3 != null ? "lib3=" + lib3 + ", " : "") +
                (refExterne != null ? "refExterne=" + refExterne + ", " : "") +
                (val1 != null ? "val1=" + val1 + ", " : "") +
                (val2 != null ? "val2=" + val2 + ", " : "") +
                (val3 != null ? "val3=" + val3 + ", " : "") +
                (ordre != null ? "ordre=" + ordre + ", " : "") +
                (typeId != null ? "typeId=" + typeId + ", " : "") +
                (paraentId != null ? "paraentId=" + paraentId + ", " : "") +
            "}";
    }

}
