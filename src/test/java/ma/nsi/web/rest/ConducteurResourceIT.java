package ma.nsi.web.rest;

import ma.nsi.GestionTransportApp;
import ma.nsi.domain.Conducteur;
import ma.nsi.repository.ConducteurRepository;
import ma.nsi.service.ConducteurService;
import ma.nsi.service.dto.ConducteurCriteria;
import ma.nsi.service.ConducteurQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConducteurResource} REST controller.
 */
@SpringBootTest(classes = GestionTransportApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConducteurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AFFECTATION = 1;
    private static final Integer UPDATED_AFFECTATION = 2;
    private static final Integer SMALLER_AFFECTATION = 1 - 1;

    @Autowired
    private ConducteurRepository conducteurRepository;

    @Autowired
    private ConducteurService conducteurService;

    @Autowired
    private ConducteurQueryService conducteurQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConducteurMockMvc;

    private Conducteur conducteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conducteur createEntity(EntityManager em) {
        Conducteur conducteur = new Conducteur()
            .nom(DEFAULT_NOM)
            .affectation(DEFAULT_AFFECTATION);
        return conducteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conducteur createUpdatedEntity(EntityManager em) {
        Conducteur conducteur = new Conducteur()
            .nom(UPDATED_NOM)
            .affectation(UPDATED_AFFECTATION);
        return conducteur;
    }

    @BeforeEach
    public void initTest() {
        conducteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createConducteur() throws Exception {
        int databaseSizeBeforeCreate = conducteurRepository.findAll().size();
        // Create the Conducteur
        restConducteurMockMvc.perform(post("/api/conducteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conducteur)))
            .andExpect(status().isCreated());

        // Validate the Conducteur in the database
        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeCreate + 1);
        Conducteur testConducteur = conducteurList.get(conducteurList.size() - 1);
        assertThat(testConducteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testConducteur.getAffectation()).isEqualTo(DEFAULT_AFFECTATION);
    }

    @Test
    @Transactional
    public void createConducteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conducteurRepository.findAll().size();

        // Create the Conducteur with an existing ID
        conducteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConducteurMockMvc.perform(post("/api/conducteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conducteur)))
            .andExpect(status().isBadRequest());

        // Validate the Conducteur in the database
        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = conducteurRepository.findAll().size();
        // set the field null
        conducteur.setNom(null);

        // Create the Conducteur, which fails.


        restConducteurMockMvc.perform(post("/api/conducteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conducteur)))
            .andExpect(status().isBadRequest());

        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConducteurs() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList
        restConducteurMockMvc.perform(get("/api/conducteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conducteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].affectation").value(hasItem(DEFAULT_AFFECTATION)));
    }
    
    @Test
    @Transactional
    public void getConducteur() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get the conducteur
        restConducteurMockMvc.perform(get("/api/conducteurs/{id}", conducteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(conducteur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.affectation").value(DEFAULT_AFFECTATION));
    }


    @Test
    @Transactional
    public void getConducteursByIdFiltering() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        Long id = conducteur.getId();

        defaultConducteurShouldBeFound("id.equals=" + id);
        defaultConducteurShouldNotBeFound("id.notEquals=" + id);

        defaultConducteurShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultConducteurShouldNotBeFound("id.greaterThan=" + id);

        defaultConducteurShouldBeFound("id.lessThanOrEqual=" + id);
        defaultConducteurShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllConducteursByNomIsEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom equals to DEFAULT_NOM
        defaultConducteurShouldBeFound("nom.equals=" + DEFAULT_NOM);

        // Get all the conducteurList where nom equals to UPDATED_NOM
        defaultConducteurShouldNotBeFound("nom.equals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllConducteursByNomIsNotEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom not equals to DEFAULT_NOM
        defaultConducteurShouldNotBeFound("nom.notEquals=" + DEFAULT_NOM);

        // Get all the conducteurList where nom not equals to UPDATED_NOM
        defaultConducteurShouldBeFound("nom.notEquals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllConducteursByNomIsInShouldWork() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom in DEFAULT_NOM or UPDATED_NOM
        defaultConducteurShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

        // Get all the conducteurList where nom equals to UPDATED_NOM
        defaultConducteurShouldNotBeFound("nom.in=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllConducteursByNomIsNullOrNotNull() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom is not null
        defaultConducteurShouldBeFound("nom.specified=true");

        // Get all the conducteurList where nom is null
        defaultConducteurShouldNotBeFound("nom.specified=false");
    }
                @Test
    @Transactional
    public void getAllConducteursByNomContainsSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom contains DEFAULT_NOM
        defaultConducteurShouldBeFound("nom.contains=" + DEFAULT_NOM);

        // Get all the conducteurList where nom contains UPDATED_NOM
        defaultConducteurShouldNotBeFound("nom.contains=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllConducteursByNomNotContainsSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where nom does not contain DEFAULT_NOM
        defaultConducteurShouldNotBeFound("nom.doesNotContain=" + DEFAULT_NOM);

        // Get all the conducteurList where nom does not contain UPDATED_NOM
        defaultConducteurShouldBeFound("nom.doesNotContain=" + UPDATED_NOM);
    }


    @Test
    @Transactional
    public void getAllConducteursByAffectationIsEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation equals to DEFAULT_AFFECTATION
        defaultConducteurShouldBeFound("affectation.equals=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation equals to UPDATED_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.equals=" + UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation not equals to DEFAULT_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.notEquals=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation not equals to UPDATED_AFFECTATION
        defaultConducteurShouldBeFound("affectation.notEquals=" + UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsInShouldWork() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation in DEFAULT_AFFECTATION or UPDATED_AFFECTATION
        defaultConducteurShouldBeFound("affectation.in=" + DEFAULT_AFFECTATION + "," + UPDATED_AFFECTATION);

        // Get all the conducteurList where affectation equals to UPDATED_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.in=" + UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsNullOrNotNull() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation is not null
        defaultConducteurShouldBeFound("affectation.specified=true");

        // Get all the conducteurList where affectation is null
        defaultConducteurShouldNotBeFound("affectation.specified=false");
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation is greater than or equal to DEFAULT_AFFECTATION
        defaultConducteurShouldBeFound("affectation.greaterThanOrEqual=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation is greater than or equal to UPDATED_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.greaterThanOrEqual=" + UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation is less than or equal to DEFAULT_AFFECTATION
        defaultConducteurShouldBeFound("affectation.lessThanOrEqual=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation is less than or equal to SMALLER_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.lessThanOrEqual=" + SMALLER_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsLessThanSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation is less than DEFAULT_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.lessThan=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation is less than UPDATED_AFFECTATION
        defaultConducteurShouldBeFound("affectation.lessThan=" + UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllConducteursByAffectationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        conducteurRepository.saveAndFlush(conducteur);

        // Get all the conducteurList where affectation is greater than DEFAULT_AFFECTATION
        defaultConducteurShouldNotBeFound("affectation.greaterThan=" + DEFAULT_AFFECTATION);

        // Get all the conducteurList where affectation is greater than SMALLER_AFFECTATION
        defaultConducteurShouldBeFound("affectation.greaterThan=" + SMALLER_AFFECTATION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultConducteurShouldBeFound(String filter) throws Exception {
        restConducteurMockMvc.perform(get("/api/conducteurs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conducteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].affectation").value(hasItem(DEFAULT_AFFECTATION)));

        // Check, that the count call also returns 1
        restConducteurMockMvc.perform(get("/api/conducteurs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultConducteurShouldNotBeFound(String filter) throws Exception {
        restConducteurMockMvc.perform(get("/api/conducteurs?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restConducteurMockMvc.perform(get("/api/conducteurs/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingConducteur() throws Exception {
        // Get the conducteur
        restConducteurMockMvc.perform(get("/api/conducteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConducteur() throws Exception {
        // Initialize the database
        conducteurService.save(conducteur);

        int databaseSizeBeforeUpdate = conducteurRepository.findAll().size();

        // Update the conducteur
        Conducteur updatedConducteur = conducteurRepository.findById(conducteur.getId()).get();
        // Disconnect from session so that the updates on updatedConducteur are not directly saved in db
        em.detach(updatedConducteur);
        updatedConducteur
            .nom(UPDATED_NOM)
            .affectation(UPDATED_AFFECTATION);

        restConducteurMockMvc.perform(put("/api/conducteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConducteur)))
            .andExpect(status().isOk());

        // Validate the Conducteur in the database
        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeUpdate);
        Conducteur testConducteur = conducteurList.get(conducteurList.size() - 1);
        assertThat(testConducteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testConducteur.getAffectation()).isEqualTo(UPDATED_AFFECTATION);
    }

    @Test
    @Transactional
    public void updateNonExistingConducteur() throws Exception {
        int databaseSizeBeforeUpdate = conducteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConducteurMockMvc.perform(put("/api/conducteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(conducteur)))
            .andExpect(status().isBadRequest());

        // Validate the Conducteur in the database
        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConducteur() throws Exception {
        // Initialize the database
        conducteurService.save(conducteur);

        int databaseSizeBeforeDelete = conducteurRepository.findAll().size();

        // Delete the conducteur
        restConducteurMockMvc.perform(delete("/api/conducteurs/{id}", conducteur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conducteur> conducteurList = conducteurRepository.findAll();
        assertThat(conducteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
