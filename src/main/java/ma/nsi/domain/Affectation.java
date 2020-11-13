package ma.nsi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import ma.nsi.domain.enumeration.StatutAffectation;

/**
 * A Affectation.
 */
@Entity
@Table(name = "affectation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Affectation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_affectation")
    private ZonedDateTime dateAffectation;

    @Column(name = "date_creation")
    private ZonedDateTime dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutAffectation statut;

    @Column(name = "motif_annulation")
    private String motifAnnulation;

    @Column(name = "operation")
    private Integer operation;

    @ManyToOne
    @JsonIgnoreProperties(value = "affectations", allowSetters = true)
    private User attributeur;

    @ManyToOne
    @JsonIgnoreProperties(value = "affectations", allowSetters = true)
    private Engin engin;

    @ManyToOne
    @JsonIgnoreProperties(value = "affectations", allowSetters = true)
    private Conducteur agent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateAffectation() {
        return dateAffectation;
    }

    public Affectation dateAffectation(ZonedDateTime dateAffectation) {
        this.dateAffectation = dateAffectation;
        return this;
    }

    public void setDateAffectation(ZonedDateTime dateAffectation) {
        this.dateAffectation = dateAffectation;
    }

    public ZonedDateTime getDateCreation() {
        return dateCreation;
    }

    public Affectation dateCreation(ZonedDateTime dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(ZonedDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public StatutAffectation getStatut() {
        return statut;
    }

    public Affectation statut(StatutAffectation statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(StatutAffectation statut) {
        this.statut = statut;
    }

    public String getMotifAnnulation() {
        return motifAnnulation;
    }

    public Affectation motifAnnulation(String motifAnnulation) {
        this.motifAnnulation = motifAnnulation;
        return this;
    }

    public void setMotifAnnulation(String motifAnnulation) {
        this.motifAnnulation = motifAnnulation;
    }

    public Integer getOperation() {
        return operation;
    }

    public Affectation operation(Integer operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(Integer operation) {
        this.operation = operation;
    }

    public User getAttributeur() {
        return attributeur;
    }

    public Affectation attributeur(User user) {
        this.attributeur = user;
        return this;
    }

    public void setAttributeur(User user) {
        this.attributeur = user;
    }

    public Engin getEngin() {
        return engin;
    }

    public Affectation engin(Engin engin) {
        this.engin = engin;
        return this;
    }

    public void setEngin(Engin engin) {
        this.engin = engin;
    }

    public Conducteur getAgent() {
        return agent;
    }

    public Affectation agent(Conducteur conducteur) {
        this.agent = conducteur;
        return this;
    }

    public void setAgent(Conducteur conducteur) {
        this.agent = conducteur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Affectation)) {
            return false;
        }
        return id != null && id.equals(((Affectation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Affectation{" +
            "id=" + getId() +
            ", dateAffectation='" + getDateAffectation() + "'" +
            ", dateCreation='" + getDateCreation() + "'" +
            ", statut='" + getStatut() + "'" +
            ", motifAnnulation='" + getMotifAnnulation() + "'" +
            ", operation=" + getOperation() +
            "}";
    }
}
