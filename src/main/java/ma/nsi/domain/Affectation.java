package ma.nsi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import ma.nsi.domain.enumeration.StatutAffectation;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Affectation.
 */
@Entity
@Table(name = "affectation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Affectation extends AbstractAuditingEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_affectation")
    private Instant dateAffectation;

    @Column(name = "date_creation")
    private Instant dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutAffectation statut;

    @Column(name = "motif_annulation")
    private String motifAnnulation;

    @Column(name = "operation")
    private Integer operation;

    @Column(name = "reference")
    private String reference;

    @Column(name = "commentaire", length = 1000)
    private String commentaire;

    @NotNull
    @Column(name = "client", nullable = false)
    private String client;

    @Column(name = "navire")
    private Integer navire;

    @ManyToOne
    @JsonIgnoreProperties(value = "affectations", allowSetters = true)
    private Session session;

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

    public Instant getDateAffectation() {
        return dateAffectation;
    }

    public Affectation dateAffectation(Instant dateAffectation) {
        this.dateAffectation = dateAffectation;
        return this;
    }

    public void setDateAffectation(Instant dateAffectation) {
        this.dateAffectation = dateAffectation;
    }

    public Instant getDateCreation() {
        return dateCreation;
    }

    public Affectation dateCreation(Instant dateCreation) {
        this.dateCreation = dateCreation;
        return this;
    }

    public void setDateCreation(Instant dateCreation) {
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

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
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

    public String getReference() {
        return reference;
    }

    public Affectation reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Affectation commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getClient() {
        return client;
    }

    public Affectation client(String client) {
        this.client = client;
        return this;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public Integer getNavire() {
        return navire;
    }

    public Affectation navire(Integer navire) {
        this.navire = navire;
        return this;
    }

    public void setNavire(Integer navire) {
        this.navire = navire;
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
		StringBuilder builder = new StringBuilder();
		builder.append("Affectation [id=");
		builder.append(id);
		builder.append(", dateAffectation=");
		builder.append(dateAffectation);
		builder.append(", dateCreation=");
		builder.append(dateCreation);
		builder.append(", statut=");
		builder.append(statut);
		builder.append(", motifAnnulation=");
		builder.append(motifAnnulation);
		builder.append(", operation=");
		builder.append(operation);
		builder.append(", reference=");
		builder.append(reference);
		builder.append(", commentaire=");
		builder.append(commentaire);
		builder.append(", client=");
		builder.append(client);
		builder.append(", navire=");
		builder.append(navire);
		builder.append(", session=");
		builder.append(session);
		builder.append(", attributeur=");
		builder.append(attributeur);
		builder.append(", engin=");
		builder.append(engin);
		builder.append(", agent=");
		builder.append(agent);
		builder.append("]");
		return builder.toString();
	}
}
