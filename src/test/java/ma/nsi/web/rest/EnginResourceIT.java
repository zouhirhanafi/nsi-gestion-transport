package ma.nsi.web.rest;

import ma.nsi.GestionTransportApp;
import ma.nsi.domain.Engin;
import ma.nsi.repository.EnginRepository;
import ma.nsi.service.EnginService;
import ma.nsi.service.dto.EnginCriteria;
import ma.nsi.service.EnginQueryService;

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
 * Integration tests for the {@link EnginResource} REST controller.
 */
@SpringBootTest(classes = GestionTransportApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EnginResourceIT {

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;
    private static final Integer SMALLER_TYPE = 1 - 1;

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    @Autowired
    private EnginRepository enginRepository;

    @Autowired
    private EnginService enginService;

    @Autowired
    private EnginQueryService enginQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEnginMockMvc;

    private Engin engin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Engin createEntity(EntityManager em) {
        Engin engin = new Engin()
            .type(DEFAULT_TYPE)
            .reference(DEFAULT_REFERENCE)
            .libelle(DEFAULT_LIBELLE);
        return engin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Engin createUpdatedEntity(EntityManager em) {
        Engin engin = new Engin()
            .type(UPDATED_TYPE)
            .reference(UPDATED_REFERENCE)
            .libelle(UPDATED_LIBELLE);
        return engin;
    }

    @BeforeEach
    public void initTest() {
        engin = createEntity(em);
    }

    @Test
    @Transactional
    public void createEngin() throws Exception {
        int databaseSizeBeforeCreate = enginRepository.findAll().size();
        // Create the Engin
        restEnginMockMvc.perform(post("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isCreated());

        // Validate the Engin in the database
        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeCreate + 1);
        Engin testEngin = enginList.get(enginList.size() - 1);
        assertThat(testEngin.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testEngin.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testEngin.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
    }

    @Test
    @Transactional
    public void createEnginWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enginRepository.findAll().size();

        // Create the Engin with an existing ID
        engin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnginMockMvc.perform(post("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isBadRequest());

        // Validate the Engin in the database
        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = enginRepository.findAll().size();
        // set the field null
        engin.setType(null);

        // Create the Engin, which fails.


        restEnginMockMvc.perform(post("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isBadRequest());

        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = enginRepository.findAll().size();
        // set the field null
        engin.setReference(null);

        // Create the Engin, which fails.


        restEnginMockMvc.perform(post("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isBadRequest());

        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = enginRepository.findAll().size();
        // set the field null
        engin.setLibelle(null);

        // Create the Engin, which fails.


        restEnginMockMvc.perform(post("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isBadRequest());

        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEngins() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList
        restEnginMockMvc.perform(get("/api/engins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(engin.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)));
    }
    
    @Test
    @Transactional
    public void getEngin() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get the engin
        restEnginMockMvc.perform(get("/api/engins/{id}", engin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(engin.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE));
    }


    @Test
    @Transactional
    public void getEnginsByIdFiltering() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        Long id = engin.getId();

        defaultEnginShouldBeFound("id.equals=" + id);
        defaultEnginShouldNotBeFound("id.notEquals=" + id);

        defaultEnginShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultEnginShouldNotBeFound("id.greaterThan=" + id);

        defaultEnginShouldBeFound("id.lessThanOrEqual=" + id);
        defaultEnginShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllEnginsByTypeIsEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type equals to DEFAULT_TYPE
        defaultEnginShouldBeFound("type.equals=" + DEFAULT_TYPE);

        // Get all the enginList where type equals to UPDATED_TYPE
        defaultEnginShouldNotBeFound("type.equals=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type not equals to DEFAULT_TYPE
        defaultEnginShouldNotBeFound("type.notEquals=" + DEFAULT_TYPE);

        // Get all the enginList where type not equals to UPDATED_TYPE
        defaultEnginShouldBeFound("type.notEquals=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsInShouldWork() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type in DEFAULT_TYPE or UPDATED_TYPE
        defaultEnginShouldBeFound("type.in=" + DEFAULT_TYPE + "," + UPDATED_TYPE);

        // Get all the enginList where type equals to UPDATED_TYPE
        defaultEnginShouldNotBeFound("type.in=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsNullOrNotNull() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type is not null
        defaultEnginShouldBeFound("type.specified=true");

        // Get all the enginList where type is null
        defaultEnginShouldNotBeFound("type.specified=false");
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type is greater than or equal to DEFAULT_TYPE
        defaultEnginShouldBeFound("type.greaterThanOrEqual=" + DEFAULT_TYPE);

        // Get all the enginList where type is greater than or equal to UPDATED_TYPE
        defaultEnginShouldNotBeFound("type.greaterThanOrEqual=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type is less than or equal to DEFAULT_TYPE
        defaultEnginShouldBeFound("type.lessThanOrEqual=" + DEFAULT_TYPE);

        // Get all the enginList where type is less than or equal to SMALLER_TYPE
        defaultEnginShouldNotBeFound("type.lessThanOrEqual=" + SMALLER_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsLessThanSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type is less than DEFAULT_TYPE
        defaultEnginShouldNotBeFound("type.lessThan=" + DEFAULT_TYPE);

        // Get all the enginList where type is less than UPDATED_TYPE
        defaultEnginShouldBeFound("type.lessThan=" + UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void getAllEnginsByTypeIsGreaterThanSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where type is greater than DEFAULT_TYPE
        defaultEnginShouldNotBeFound("type.greaterThan=" + DEFAULT_TYPE);

        // Get all the enginList where type is greater than SMALLER_TYPE
        defaultEnginShouldBeFound("type.greaterThan=" + SMALLER_TYPE);
    }


    @Test
    @Transactional
    public void getAllEnginsByReferenceIsEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference equals to DEFAULT_REFERENCE
        defaultEnginShouldBeFound("reference.equals=" + DEFAULT_REFERENCE);

        // Get all the enginList where reference equals to UPDATED_REFERENCE
        defaultEnginShouldNotBeFound("reference.equals=" + UPDATED_REFERENCE);
    }

    @Test
    @Transactional
    public void getAllEnginsByReferenceIsNotEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference not equals to DEFAULT_REFERENCE
        defaultEnginShouldNotBeFound("reference.notEquals=" + DEFAULT_REFERENCE);

        // Get all the enginList where reference not equals to UPDATED_REFERENCE
        defaultEnginShouldBeFound("reference.notEquals=" + UPDATED_REFERENCE);
    }

    @Test
    @Transactional
    public void getAllEnginsByReferenceIsInShouldWork() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference in DEFAULT_REFERENCE or UPDATED_REFERENCE
        defaultEnginShouldBeFound("reference.in=" + DEFAULT_REFERENCE + "," + UPDATED_REFERENCE);

        // Get all the enginList where reference equals to UPDATED_REFERENCE
        defaultEnginShouldNotBeFound("reference.in=" + UPDATED_REFERENCE);
    }

    @Test
    @Transactional
    public void getAllEnginsByReferenceIsNullOrNotNull() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference is not null
        defaultEnginShouldBeFound("reference.specified=true");

        // Get all the enginList where reference is null
        defaultEnginShouldNotBeFound("reference.specified=false");
    }
                @Test
    @Transactional
    public void getAllEnginsByReferenceContainsSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference contains DEFAULT_REFERENCE
        defaultEnginShouldBeFound("reference.contains=" + DEFAULT_REFERENCE);

        // Get all the enginList where reference contains UPDATED_REFERENCE
        defaultEnginShouldNotBeFound("reference.contains=" + UPDATED_REFERENCE);
    }

    @Test
    @Transactional
    public void getAllEnginsByReferenceNotContainsSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where reference does not contain DEFAULT_REFERENCE
        defaultEnginShouldNotBeFound("reference.doesNotContain=" + DEFAULT_REFERENCE);

        // Get all the enginList where reference does not contain UPDATED_REFERENCE
        defaultEnginShouldBeFound("reference.doesNotContain=" + UPDATED_REFERENCE);
    }


    @Test
    @Transactional
    public void getAllEnginsByLibelleIsEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle equals to DEFAULT_LIBELLE
        defaultEnginShouldBeFound("libelle.equals=" + DEFAULT_LIBELLE);

        // Get all the enginList where libelle equals to UPDATED_LIBELLE
        defaultEnginShouldNotBeFound("libelle.equals=" + UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void getAllEnginsByLibelleIsNotEqualToSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle not equals to DEFAULT_LIBELLE
        defaultEnginShouldNotBeFound("libelle.notEquals=" + DEFAULT_LIBELLE);

        // Get all the enginList where libelle not equals to UPDATED_LIBELLE
        defaultEnginShouldBeFound("libelle.notEquals=" + UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void getAllEnginsByLibelleIsInShouldWork() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle in DEFAULT_LIBELLE or UPDATED_LIBELLE
        defaultEnginShouldBeFound("libelle.in=" + DEFAULT_LIBELLE + "," + UPDATED_LIBELLE);

        // Get all the enginList where libelle equals to UPDATED_LIBELLE
        defaultEnginShouldNotBeFound("libelle.in=" + UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void getAllEnginsByLibelleIsNullOrNotNull() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle is not null
        defaultEnginShouldBeFound("libelle.specified=true");

        // Get all the enginList where libelle is null
        defaultEnginShouldNotBeFound("libelle.specified=false");
    }
                @Test
    @Transactional
    public void getAllEnginsByLibelleContainsSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle contains DEFAULT_LIBELLE
        defaultEnginShouldBeFound("libelle.contains=" + DEFAULT_LIBELLE);

        // Get all the enginList where libelle contains UPDATED_LIBELLE
        defaultEnginShouldNotBeFound("libelle.contains=" + UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void getAllEnginsByLibelleNotContainsSomething() throws Exception {
        // Initialize the database
        enginRepository.saveAndFlush(engin);

        // Get all the enginList where libelle does not contain DEFAULT_LIBELLE
        defaultEnginShouldNotBeFound("libelle.doesNotContain=" + DEFAULT_LIBELLE);

        // Get all the enginList where libelle does not contain UPDATED_LIBELLE
        defaultEnginShouldBeFound("libelle.doesNotContain=" + UPDATED_LIBELLE);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultEnginShouldBeFound(String filter) throws Exception {
        restEnginMockMvc.perform(get("/api/engins?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(engin.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)));

        // Check, that the count call also returns 1
        restEnginMockMvc.perform(get("/api/engins/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultEnginShouldNotBeFound(String filter) throws Exception {
        restEnginMockMvc.perform(get("/api/engins?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restEnginMockMvc.perform(get("/api/engins/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingEngin() throws Exception {
        // Get the engin
        restEnginMockMvc.perform(get("/api/engins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEngin() throws Exception {
        // Initialize the database
        enginService.save(engin);

        int databaseSizeBeforeUpdate = enginRepository.findAll().size();

        // Update the engin
        Engin updatedEngin = enginRepository.findById(engin.getId()).get();
        // Disconnect from session so that the updates on updatedEngin are not directly saved in db
        em.detach(updatedEngin);
        updatedEngin
            .type(UPDATED_TYPE)
            .reference(UPDATED_REFERENCE)
            .libelle(UPDATED_LIBELLE);

        restEnginMockMvc.perform(put("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEngin)))
            .andExpect(status().isOk());

        // Validate the Engin in the database
        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeUpdate);
        Engin testEngin = enginList.get(enginList.size() - 1);
        assertThat(testEngin.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEngin.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testEngin.getLibelle()).isEqualTo(UPDATED_LIBELLE);
    }

    @Test
    @Transactional
    public void updateNonExistingEngin() throws Exception {
        int databaseSizeBeforeUpdate = enginRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnginMockMvc.perform(put("/api/engins")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(engin)))
            .andExpect(status().isBadRequest());

        // Validate the Engin in the database
        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEngin() throws Exception {
        // Initialize the database
        enginService.save(engin);

        int databaseSizeBeforeDelete = enginRepository.findAll().size();

        // Delete the engin
        restEnginMockMvc.perform(delete("/api/engins/{id}", engin.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Engin> enginList = enginRepository.findAll();
        assertThat(enginList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
