package ma.nsi.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import ma.nsi.domain.Affectation;
import ma.nsi.service.AffectationQueryService;
import ma.nsi.service.AffectationService;
import ma.nsi.service.dto.AffectationCriteria;
import ma.nsi.service.dto.WrappedValue;
import ma.nsi.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing {@link ma.nsi.domain.Affectation}.
 */
@RestController
@RequestMapping("/api")
public class AffectationResource {
    private final Logger log = LoggerFactory.getLogger(AffectationResource.class);

    private static final String ENTITY_NAME = "affectation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AffectationService affectationService;

    private final AffectationQueryService affectationQueryService;

    public AffectationResource(AffectationService affectationService, AffectationQueryService affectationQueryService) {
        this.affectationService = affectationService;
        this.affectationQueryService = affectationQueryService;
    }

    /**
     * {@code POST  /affectations} : Create a new affectation.
     *
     * @param affectation the affectation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectation, or with status {@code 400 (Bad Request)} if the affectation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectations")
    public ResponseEntity<Affectation> createAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to save Affectation : {}", affectation);
        if (affectation.getId() != null) {
            throw new BadRequestAlertException("A new affectation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Affectation result = affectationService.save(affectation);
        return ResponseEntity
            .created(new URI("/api/affectations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /affectations} : Updates an existing affectation.
     *
     * @param affectation the affectation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectation,
     * or with status {@code 400 (Bad Request)} if the affectation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the affectation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/affectations")
    public ResponseEntity<Affectation> updateAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to update Affectation : {}", affectation);
        if (affectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Affectation result = affectationService.save(affectation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectation.getId().toString()))
            .body(result);
    }

    @PutMapping("/affectations/{id}/cancel")
    public ResponseEntity<Affectation> cancelAffectation(@PathVariable Long id, @RequestBody WrappedValue<String> motif)
        throws URISyntaxException {
        log.debug("REST request to cancel Affectation : {}", id);
        affectationService.cancel(id, motif.getValue());
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code GET  /affectations} : get all the affectations.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectations in body.
     */
    @GetMapping("/affectations")
    public ResponseEntity<List<Affectation>> getAllAffectations(AffectationCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Affectations by criteria: {}", criteria);
        Page<Affectation> page = affectationQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /affectations/count} : count all the affectations.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/affectations/count")
    public ResponseEntity<Long> countAffectations(AffectationCriteria criteria) {
        log.debug("REST request to count Affectations by criteria: {}", criteria);
        return ResponseEntity.ok().body(affectationQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /affectations/:id} : get the "id" affectation.
     *
     * @param id the id of the affectation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectations/{id}")
    public ResponseEntity<Affectation> getAffectation(@PathVariable Long id) {
        log.debug("REST request to get Affectation : {}", id);
        Optional<Affectation> affectation = affectationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(affectation);
    }

    /**
     * {@code DELETE  /affectations/:id} : delete the "id" affectation.
     *
     * @param id the id of the affectation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectations/{id}")
    public ResponseEntity<Void> deleteAffectation(@PathVariable Long id) {
        log.debug("REST request to delete Affectation : {}", id);
        affectationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
