package ma.nsi.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ma.nsi.web.rest.TestUtil;

public class ConducteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conducteur.class);
        Conducteur conducteur1 = new Conducteur();
        conducteur1.setId(1L);
        Conducteur conducteur2 = new Conducteur();
        conducteur2.setId(conducteur1.getId());
        assertThat(conducteur1).isEqualTo(conducteur2);
        conducteur2.setId(2L);
        assertThat(conducteur1).isNotEqualTo(conducteur2);
        conducteur1.setId(null);
        assertThat(conducteur1).isNotEqualTo(conducteur2);
    }
}
