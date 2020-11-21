package ma.nsi.repository;

import java.time.Instant;
import java.util.List;
import ma.nsi.domain.Parameter;
import ma.nsi.service.dto.ParameterMinProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Parameter entity.
 */
@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long>, JpaSpecificationExecutor<Parameter> {
    @Query("select max(lastModifiedDate) from Parameter p")
    Instant getLastModifiedDate();

    @Query("select p.id as id, p.label as label, p.lib2 as lib2 from Parameter p where p.lib3 = 'forms'")
    List<ParameterMinProjection> findParamFormList();

    List<ParameterMinProjection> findByTypeIdOrderByOrdre(Long type);
}
