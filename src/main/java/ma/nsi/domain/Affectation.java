package ma.nsi.domain;

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

    //	@JsonFormat(pattern = Constants.DATE_TIME_FORMAT, shape = JsonFormat.Shape.STRING)
    @Column(name = "date_affectation")
    private Instant dateAffectation;

    //	@JsonFormat(pattern = Constants.DATE_TIME_FORMAT, shape = JsonFormat.Shape.STRING)
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

    @ManyToOne
    private Session session;

    @ManyToOne
    private User attributeur;

    @ManyToOne
    private Engin engin;

    @ManyToOne
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

    public String getMotifAnnulation() {
        return motifAnnulation;
    }

    public Affectation motifAnnulation(String motifAnnulation) {
        this.motifAnnulation = motifAnnulation;
        return this;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
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

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
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
