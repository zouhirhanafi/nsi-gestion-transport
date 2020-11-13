package ma.nsi.domain.enumeration;

/**
 * The StatutAffectation enumeration.
 */
public enum StatutAffectation {
    C("Confirmée"),
    S("Supprimée"),
    N("Non confirmée");

    private final String value;


    StatutAffectation(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
