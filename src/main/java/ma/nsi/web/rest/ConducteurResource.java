package ma.nsi.web.rest;

import ma.nsi.domain.Conducteur;
import ma.nsi.service.ConducteurService;
import ma.nsi.web.rest.errors.BadRequestAlertException;
import ma.nsi.service.dto.ConducteurCriteria;
import ma.nsi.service.ConducteurQueryService;

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
 * REST controller for managing {@link ma.nsi.domain.Conducteur}.
 */
@RestController
@RequestMapping("/api")
public class ConducteurResource {

    private final Logger log = LoggerFactory.getLogger(ConducteurResource.class);

    private static final String ENTITY_NAME = "conducteur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConducteurService conducteurService;

    private final ConducteurQueryService conducteurQueryService;

    public ConducteurResource(ConducteurService conducteurService, ConducteurQueryService conducteurQueryService) {
        this.conducteurService = conducteurService;
        this.conducteurQueryService = conducteurQueryService;
    }

    /**
     * {@code POST  /conducteurs} : Create a new conducteur.
     *
     * @param conducteur the conducteur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conducteur, or with status {@code 400 (Bad Request)} if the conducteur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conducteurs")
    public ResponseEntity<Conducteur> createConducteur(@Valid @RequestBody Conducteur conducteur) throws URISyntaxException {
        log.debug("REST request to save Conducteur : {}", conducteur);
        if (conducteur.getId() != null) {
            throw new BadRequestAlertException("A new conducteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conducteur result = conducteurService.save(conducteur);
        return ResponseEntity.created(new URI("/api/conducteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conducteurs} : Updates an existing conducteur.
     *
     * @param conducteur the conducteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conducteur,
     * or with status {@code 400 (Bad Request)} if the conducteur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conducteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conducteurs")
    public ResponseEntity<Conducteur> updateConducteur(@Valid @RequestBody Conducteur conducteur) throws URISyntaxException {
        log.debug("REST request to update Conducteur : {}", conducteur);
        if (conducteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Conducteur result = conducteurService.save(conducteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conducteur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /conducteurs} : get all the conducteurs.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conducteurs in body.
     */
    @GetMapping("/conducteurs")
    public ResponseEntity<List<Conducteur>> getAllConducteurs(ConducteurCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Conducteurs by criteria: {}", criteria);
        Page<Conducteur> page = conducteurQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /conducteurs/count} : count all the conducteurs.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/conducteurs/count")
    public ResponseEntity<Long> countConducteurs(ConducteurCriteria criteria) {
        log.debug("REST request to count Conducteurs by criteria: {}", criteria);
        return ResponseEntity.ok().body(conducteurQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /conducteurs/:id} : get the "id" conducteur.
     *
     * @param id the id of the conducteur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conducteur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conducteurs/{id}")
    public ResponseEntity<Conducteur> getConducteur(@PathVariable Long id) {
        log.debug("REST request to get Conducteur : {}", id);
        Optional<Conducteur> conducteur = conducteurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(conducteur);
    }

    /**
     * {@code DELETE  /conducteurs/:id} : delete the "id" conducteur.
     *
     * @param id the id of the conducteur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conducteurs/{id}")
    public ResponseEntity<Void> deleteConducteur(@PathVariable Long id) {
        log.debug("REST request to delete Conducteur : {}", id);
        conducteurService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
