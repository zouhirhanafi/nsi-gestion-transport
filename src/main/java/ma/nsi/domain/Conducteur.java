package ma.nsi.domain;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conducteur.
 */
@Entity
@Table(name = "conducteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Conducteur implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "conducteur_affectations")
    private Set<String> affectations;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Conducteur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<String> getAffectations() {
        return affectations;
    }

    public Conducteur affectation(Set<String> affectations) {
        this.affectations = affectations;
        return this;
    }

    public void setAffectations(Set<String> affectations) {
        this.affectations = affectations;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conducteur)) {
            return false;
        }
        return id != null && id.equals(((Conducteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conducteur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", affectation=" + getAffectations() +
            "}";
    }
}
