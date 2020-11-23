package ma.nsi.domain;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Engin.
 */
@Entity
@Table(name = "engin")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Engin implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "type", nullable = false)
    private Integer type;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    private Boolean activated = true;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public Engin type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getLibelle() {
        return libelle;
    }

    public Engin libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Boolean getActivated() {
        return activated;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Engin)) {
            return false;
        }
        return id != null && id.equals(((Engin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Engin{" +
            "id=" + getId() +
            ", type=" + getType() +
            ", libelle='" + getLibelle() + "'" +
            "}";
    }
}
