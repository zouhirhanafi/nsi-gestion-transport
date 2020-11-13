package ma.nsi.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ma.nsi.domain.Parameter;
import ma.nsi.service.dto.ParameterMinProjection;

/**
 * Spring Data  repository for the Parameter entity.
 */
@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long>, JpaSpecificationExecutor<Parameter> {
	
	@Query("select max(lastModifiedDate) from Parameter p")
	Instant getLastModifiedDate();

	@Query("select p.id as id, p.lib2 as label from Parameter p where p.lib3 = 'forms'")
	List<ParameterMinProjection> findParamFormList();

	List<ParameterMinProjection> findByTypeIdOrderByOrdre(Integer type);
}
