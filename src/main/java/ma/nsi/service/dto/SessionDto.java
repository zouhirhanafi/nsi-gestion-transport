package ma.nsi.service.dto;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.NotNull;
import ma.nsi.domain.Affectation;

public class SessionDto {
    private Long id;

    @NotNull
    private Integer shift;

    private LocalDate date;

    private List<Affectation> affectations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getShift() {
        return shift;
    }

    public void setShift(Integer shift) {
        this.shift = shift;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<Affectation> getAffectations() {
        return affectations;
    }

    public void setAffectations(List<Affectation> affectations) {
        this.affectations = affectations;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("SessionDTO [id=");
        builder.append(id);
        builder.append(", shift=");
        builder.append(shift);
        builder.append(", date=");
        builder.append(date);
        builder.append(", affectations=");
        builder.append(affectations);
        builder.append("]");
        return builder.toString();
    }
}
