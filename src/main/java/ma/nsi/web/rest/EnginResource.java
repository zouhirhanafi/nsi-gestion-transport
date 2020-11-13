package ma.nsi.web.rest;

import ma.nsi.domain.Engin;
import ma.nsi.service.EnginService;
import ma.nsi.web.rest.errors.BadRequestAlertException;
import ma.nsi.service.dto.EnginCriteria;
import ma.nsi.service.EnginQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ma.nsi.domain.Engin}.
 */
@RestController
@RequestMapping("/api")
public class EnginResource {

    private final Logger log = LoggerFactory.getLogger(EnginResource.class);

    private static final String ENTITY_NAME = "engin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnginService enginService;

    private final EnginQueryService enginQueryService;

    public EnginResource(EnginService enginService, EnginQueryService enginQueryService) {
        this.enginService = enginService;
        this.enginQueryService = enginQueryService;
    }

    /**
     * {@code POST  /engins} : Create a new engin.
     *
     * @param engin the engin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new engin, or with status {@code 400 (Bad Request)} if the engin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/engins")
    public ResponseEntity<Engin> createEngin(@Valid @RequestBody Engin engin) throws URISyntaxException {
        log.debug("REST request to save Engin : {}", engin);
        if (engin.getId() != null) {
            throw new BadRequestAlertException("A new engin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Engin result = enginService.save(engin);
        return ResponseEntity.created(new URI("/api/engins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /engins} : Updates an existing engin.
     *
     * @param engin the engin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated engin,
     * or with status {@code 400 (Bad Request)} if the engin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the engin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/engins")
    public ResponseEntity<Engin> updateEngin(@Valid @RequestBody Engin engin) throws URISyntaxException {
        log.debug("REST request to update Engin : {}", engin);
        if (engin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Engin result = enginService.save(engin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, engin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /engins} : get all the engins.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of engins in body.
     */
    @GetMapping("/engins")
    public ResponseEntity<List<Engin>> getAllEngins(EnginCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Engins by criteria: {}", criteria);
        Page<Engin> page = enginQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /engins/count} : count all the engins.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/engins/count")
    public ResponseEntity<Long> countEngins(EnginCriteria criteria) {
        log.debug("REST request to count Engins by criteria: {}", criteria);
        return ResponseEntity.ok().body(enginQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /engins/:id} : get the "id" engin.
     *
     * @param id the id of the engin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the engin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/engins/{id}")
    public ResponseEntity<Engin> getEngin(@PathVariable Long id) {
        log.debug("REST request to get Engin : {}", id);
        Optional<Engin> engin = enginService.findOne(id);
        return ResponseUtil.wrapOrNotFound(engin);
    }

    /**
     * {@code DELETE  /engins/:id} : delete the "id" engin.
     *
     * @param id the id of the engin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/engins/{id}")
    public ResponseEntity<Void> deleteEngin(@PathVariable Long id) {
        log.debug("REST request to delete Engin : {}", id);
        enginService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
