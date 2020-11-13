package ma.nsi.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

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

    @Column(name = "affectation")
    private Integer affectation;

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

    public Integer getAffectation() {
        return affectation;
    }

    public Conducteur affectation(Integer affectation) {
        this.affectation = affectation;
        return this;
    }

    public void setAffectation(Integer affectation) {
        this.affectation = affectation;
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
            ", affectation=" + getAffectation() +
            "}";
    }
}
