package ma.nsi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Parameter.
 */
@Entity
@Table(name = "parameter")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Parameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "lib_2")
    private String lib2;

    @Column(name = "lib_3")
    private String lib3;

    @Column(name = "ref_externe")
    private String refExterne;

    @Column(name = "val_1")
    private String val1;

    @Column(name = "val_2")
    private String val2;

    @Column(name = "val_3")
    private String val3;

    @Column(name = "ordre")
    private Integer ordre;

    @ManyToOne
    @JsonIgnoreProperties(value = "parameters", allowSetters = true)
    private Parameter type;

    @ManyToOne
    @JsonIgnoreProperties(value = "parameters", allowSetters = true)
    private Parameter paraent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Parameter label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLib2() {
        return lib2;
    }

    public Parameter lib2(String lib2) {
        this.lib2 = lib2;
        return this;
    }

    public void setLib2(String lib2) {
        this.lib2 = lib2;
    }

    public String getLib3() {
        return lib3;
    }

    public Parameter lib3(String lib3) {
        this.lib3 = lib3;
        return this;
    }

    public void setLib3(String lib3) {
        this.lib3 = lib3;
    }

    public String getRefExterne() {
        return refExterne;
    }

    public Parameter refExterne(String refExterne) {
        this.refExterne = refExterne;
        return this;
    }

    public void setRefExterne(String refExterne) {
        this.refExterne = refExterne;
    }

    public String getVal1() {
        return val1;
    }

    public Parameter val1(String val1) {
        this.val1 = val1;
        return this;
    }

    public void setVal1(String val1) {
        this.val1 = val1;
    }

    public String getVal2() {
        return val2;
    }

    public Parameter val2(String val2) {
        this.val2 = val2;
        return this;
    }

    public void setVal2(String val2) {
        this.val2 = val2;
    }

    public String getVal3() {
        return val3;
    }

    public Parameter val3(String val3) {
        this.val3 = val3;
        return this;
    }

    public void setVal3(String val3) {
        this.val3 = val3;
    }

    public Integer getOrdre() {
        return ordre;
    }

    public Parameter ordre(Integer ordre) {
        this.ordre = ordre;
        return this;
    }

    public void setOrdre(Integer ordre) {
        this.ordre = ordre;
    }

    public Parameter getType() {
        return type;
    }

    public Parameter type(Parameter parameter) {
        this.type = parameter;
        return this;
    }

    public void setType(Parameter parameter) {
        this.type = parameter;
    }

    public Parameter getParaent() {
        return paraent;
    }

    public Parameter paraent(Parameter parameter) {
        this.paraent = parameter;
        return this;
    }

    public void setParaent(Parameter parameter) {
        this.paraent = parameter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parameter)) {
            return false;
        }
        return id != null && id.equals(((Parameter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parameter{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", lib2='" + getLib2() + "'" +
            ", lib3='" + getLib3() + "'" +
            ", refExterne='" + getRefExterne() + "'" +
            ", val1='" + getVal1() + "'" +
            ", val2='" + getVal2() + "'" +
            ", val3='" + getVal3() + "'" +
            ", ordre=" + getOrdre() +
            "}";
    }
}
