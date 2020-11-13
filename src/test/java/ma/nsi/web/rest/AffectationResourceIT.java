package ma.nsi.web.rest;

import ma.nsi.GestionTransportApp;
import ma.nsi.domain.Affectation;
import ma.nsi.domain.User;
import ma.nsi.domain.Engin;
import ma.nsi.domain.Conducteur;
import ma.nsi.repository.AffectationRepository;
import ma.nsi.service.AffectationService;
import ma.nsi.service.dto.AffectationCriteria;
import ma.nsi.service.AffectationQueryService;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static ma.nsi.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ma.nsi.domain.enumeration.StatutAffectation;
/**
 * Integration tests for the {@link AffectationResource} REST controller.
 */
@SpringBootTest(classes = GestionTransportApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AffectationResourceIT {

    private static final ZonedDateTime DEFAULT_DATE_AFFECTATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_AFFECTATION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE_AFFECTATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_DATE_CREATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_CREATION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE_CREATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final StatutAffectation DEFAULT_STATUT = StatutAffectation.C;
    private static final StatutAffectation UPDATED_STATUT = StatutAffectation.S;

    private static final String DEFAULT_MOTIF_ANNULATION = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF_ANNULATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_OPERATION = 1;
    private static final Integer UPDATED_OPERATION = 2;
    private static final Integer SMALLER_OPERATION = 1 - 1;

    @Autowired
    private AffectationRepository affectationRepository;

    @Autowired
    private AffectationService affectationService;

    @Autowired
    private AffectationQueryService affectationQueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAffectationMockMvc;

    private Affectation affectation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Affectation createEntity(EntityManager em) {
        Affectation affectation = new Affectation()
            .dateAffectation(DEFAULT_DATE_AFFECTATION)
            .dateCreation(DEFAULT_DATE_CREATION)
            .statut(DEFAULT_STATUT)
            .motifAnnulation(DEFAULT_MOTIF_ANNULATION)
            .operation(DEFAULT_OPERATION);
        return affectation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Affectation createUpdatedEntity(EntityManager em) {
        Affectation affectation = new Affectation()
            .dateAffectation(UPDATED_DATE_AFFECTATION)
            .dateCreation(UPDATED_DATE_CREATION)
            .statut(UPDATED_STATUT)
            .motifAnnulation(UPDATED_MOTIF_ANNULATION)
            .operation(UPDATED_OPERATION);
        return affectation;
    }

    @BeforeEach
    public void initTest() {
        affectation = createEntity(em);
    }

    @Test
    @Transactional
    public void createAffectation() throws Exception {
        int databaseSizeBeforeCreate = affectationRepository.findAll().size();
        // Create the Affectation
        restAffectationMockMvc.perform(post("/api/affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectation)))
            .andExpect(status().isCreated());

        // Validate the Affectation in the database
        List<Affectation> affectationList = affectationRepository.findAll();
        assertThat(affectationList).hasSize(databaseSizeBeforeCreate + 1);
        Affectation testAffectation = affectationList.get(affectationList.size() - 1);
        assertThat(testAffectation.getDateAffectation()).isEqualTo(DEFAULT_DATE_AFFECTATION);
        assertThat(testAffectation.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
        assertThat(testAffectation.getStatut()).isEqualTo(DEFAULT_STATUT);
        assertThat(testAffectation.getMotifAnnulation()).isEqualTo(DEFAULT_MOTIF_ANNULATION);
        assertThat(testAffectation.getOperation()).isEqualTo(DEFAULT_OPERATION);
    }

    @Test
    @Transactional
    public void createAffectationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = affectationRepository.findAll().size();

        // Create the Affectation with an existing ID
        affectation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAffectationMockMvc.perform(post("/api/affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectation)))
            .andExpect(status().isBadRequest());

        // Validate the Affectation in the database
        List<Affectation> affectationList = affectationRepository.findAll();
        assertThat(affectationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAffectations() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList
        restAffectationMockMvc.perform(get("/api/affectations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateAffectation").value(hasItem(sameInstant(DEFAULT_DATE_AFFECTATION))))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(sameInstant(DEFAULT_DATE_CREATION))))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].motifAnnulation").value(hasItem(DEFAULT_MOTIF_ANNULATION)))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION)));
    }
    
    @Test
    @Transactional
    public void getAffectation() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get the affectation
        restAffectationMockMvc.perform(get("/api/affectations/{id}", affectation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(affectation.getId().intValue()))
            .andExpect(jsonPath("$.dateAffectation").value(sameInstant(DEFAULT_DATE_AFFECTATION)))
            .andExpect(jsonPath("$.dateCreation").value(sameInstant(DEFAULT_DATE_CREATION)))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()))
            .andExpect(jsonPath("$.motifAnnulation").value(DEFAULT_MOTIF_ANNULATION))
            .andExpect(jsonPath("$.operation").value(DEFAULT_OPERATION));
    }


    @Test
    @Transactional
    public void getAffectationsByIdFiltering() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        Long id = affectation.getId();

        defaultAffectationShouldBeFound("id.equals=" + id);
        defaultAffectationShouldNotBeFound("id.notEquals=" + id);

        defaultAffectationShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAffectationShouldNotBeFound("id.greaterThan=" + id);

        defaultAffectationShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAffectationShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation equals to DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.equals=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation equals to UPDATED_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.equals=" + UPDATED_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation not equals to DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.notEquals=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation not equals to UPDATED_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.notEquals=" + UPDATED_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsInShouldWork() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation in DEFAULT_DATE_AFFECTATION or UPDATED_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.in=" + DEFAULT_DATE_AFFECTATION + "," + UPDATED_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation equals to UPDATED_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.in=" + UPDATED_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsNullOrNotNull() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation is not null
        defaultAffectationShouldBeFound("dateAffectation.specified=true");

        // Get all the affectationList where dateAffectation is null
        defaultAffectationShouldNotBeFound("dateAffectation.specified=false");
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation is greater than or equal to DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.greaterThanOrEqual=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation is greater than or equal to UPDATED_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.greaterThanOrEqual=" + UPDATED_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation is less than or equal to DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.lessThanOrEqual=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation is less than or equal to SMALLER_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.lessThanOrEqual=" + SMALLER_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsLessThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation is less than DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.lessThan=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation is less than UPDATED_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.lessThan=" + UPDATED_DATE_AFFECTATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateAffectationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateAffectation is greater than DEFAULT_DATE_AFFECTATION
        defaultAffectationShouldNotBeFound("dateAffectation.greaterThan=" + DEFAULT_DATE_AFFECTATION);

        // Get all the affectationList where dateAffectation is greater than SMALLER_DATE_AFFECTATION
        defaultAffectationShouldBeFound("dateAffectation.greaterThan=" + SMALLER_DATE_AFFECTATION);
    }


    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation equals to DEFAULT_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.equals=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation equals to UPDATED_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.equals=" + UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation not equals to DEFAULT_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.notEquals=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation not equals to UPDATED_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.notEquals=" + UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsInShouldWork() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation in DEFAULT_DATE_CREATION or UPDATED_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.in=" + DEFAULT_DATE_CREATION + "," + UPDATED_DATE_CREATION);

        // Get all the affectationList where dateCreation equals to UPDATED_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.in=" + UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsNullOrNotNull() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation is not null
        defaultAffectationShouldBeFound("dateCreation.specified=true");

        // Get all the affectationList where dateCreation is null
        defaultAffectationShouldNotBeFound("dateCreation.specified=false");
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation is greater than or equal to DEFAULT_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.greaterThanOrEqual=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation is greater than or equal to UPDATED_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.greaterThanOrEqual=" + UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation is less than or equal to DEFAULT_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.lessThanOrEqual=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation is less than or equal to SMALLER_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.lessThanOrEqual=" + SMALLER_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsLessThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation is less than DEFAULT_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.lessThan=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation is less than UPDATED_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.lessThan=" + UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByDateCreationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where dateCreation is greater than DEFAULT_DATE_CREATION
        defaultAffectationShouldNotBeFound("dateCreation.greaterThan=" + DEFAULT_DATE_CREATION);

        // Get all the affectationList where dateCreation is greater than SMALLER_DATE_CREATION
        defaultAffectationShouldBeFound("dateCreation.greaterThan=" + SMALLER_DATE_CREATION);
    }


    @Test
    @Transactional
    public void getAllAffectationsByStatutIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where statut equals to DEFAULT_STATUT
        defaultAffectationShouldBeFound("statut.equals=" + DEFAULT_STATUT);

        // Get all the affectationList where statut equals to UPDATED_STATUT
        defaultAffectationShouldNotBeFound("statut.equals=" + UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void getAllAffectationsByStatutIsNotEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where statut not equals to DEFAULT_STATUT
        defaultAffectationShouldNotBeFound("statut.notEquals=" + DEFAULT_STATUT);

        // Get all the affectationList where statut not equals to UPDATED_STATUT
        defaultAffectationShouldBeFound("statut.notEquals=" + UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void getAllAffectationsByStatutIsInShouldWork() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where statut in DEFAULT_STATUT or UPDATED_STATUT
        defaultAffectationShouldBeFound("statut.in=" + DEFAULT_STATUT + "," + UPDATED_STATUT);

        // Get all the affectationList where statut equals to UPDATED_STATUT
        defaultAffectationShouldNotBeFound("statut.in=" + UPDATED_STATUT);
    }

    @Test
    @Transactional
    public void getAllAffectationsByStatutIsNullOrNotNull() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where statut is not null
        defaultAffectationShouldBeFound("statut.specified=true");

        // Get all the affectationList where statut is null
        defaultAffectationShouldNotBeFound("statut.specified=false");
    }

    @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation equals to DEFAULT_MOTIF_ANNULATION
        defaultAffectationShouldBeFound("motifAnnulation.equals=" + DEFAULT_MOTIF_ANNULATION);

        // Get all the affectationList where motifAnnulation equals to UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldNotBeFound("motifAnnulation.equals=" + UPDATED_MOTIF_ANNULATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation not equals to DEFAULT_MOTIF_ANNULATION
        defaultAffectationShouldNotBeFound("motifAnnulation.notEquals=" + DEFAULT_MOTIF_ANNULATION);

        // Get all the affectationList where motifAnnulation not equals to UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldBeFound("motifAnnulation.notEquals=" + UPDATED_MOTIF_ANNULATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationIsInShouldWork() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation in DEFAULT_MOTIF_ANNULATION or UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldBeFound("motifAnnulation.in=" + DEFAULT_MOTIF_ANNULATION + "," + UPDATED_MOTIF_ANNULATION);

        // Get all the affectationList where motifAnnulation equals to UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldNotBeFound("motifAnnulation.in=" + UPDATED_MOTIF_ANNULATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationIsNullOrNotNull() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation is not null
        defaultAffectationShouldBeFound("motifAnnulation.specified=true");

        // Get all the affectationList where motifAnnulation is null
        defaultAffectationShouldNotBeFound("motifAnnulation.specified=false");
    }
                @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationContainsSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation contains DEFAULT_MOTIF_ANNULATION
        defaultAffectationShouldBeFound("motifAnnulation.contains=" + DEFAULT_MOTIF_ANNULATION);

        // Get all the affectationList where motifAnnulation contains UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldNotBeFound("motifAnnulation.contains=" + UPDATED_MOTIF_ANNULATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByMotifAnnulationNotContainsSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where motifAnnulation does not contain DEFAULT_MOTIF_ANNULATION
        defaultAffectationShouldNotBeFound("motifAnnulation.doesNotContain=" + DEFAULT_MOTIF_ANNULATION);

        // Get all the affectationList where motifAnnulation does not contain UPDATED_MOTIF_ANNULATION
        defaultAffectationShouldBeFound("motifAnnulation.doesNotContain=" + UPDATED_MOTIF_ANNULATION);
    }


    @Test
    @Transactional
    public void getAllAffectationsByOperationIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation equals to DEFAULT_OPERATION
        defaultAffectationShouldBeFound("operation.equals=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation equals to UPDATED_OPERATION
        defaultAffectationShouldNotBeFound("operation.equals=" + UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsNotEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation not equals to DEFAULT_OPERATION
        defaultAffectationShouldNotBeFound("operation.notEquals=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation not equals to UPDATED_OPERATION
        defaultAffectationShouldBeFound("operation.notEquals=" + UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsInShouldWork() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation in DEFAULT_OPERATION or UPDATED_OPERATION
        defaultAffectationShouldBeFound("operation.in=" + DEFAULT_OPERATION + "," + UPDATED_OPERATION);

        // Get all the affectationList where operation equals to UPDATED_OPERATION
        defaultAffectationShouldNotBeFound("operation.in=" + UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsNullOrNotNull() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation is not null
        defaultAffectationShouldBeFound("operation.specified=true");

        // Get all the affectationList where operation is null
        defaultAffectationShouldNotBeFound("operation.specified=false");
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation is greater than or equal to DEFAULT_OPERATION
        defaultAffectationShouldBeFound("operation.greaterThanOrEqual=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation is greater than or equal to UPDATED_OPERATION
        defaultAffectationShouldNotBeFound("operation.greaterThanOrEqual=" + UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation is less than or equal to DEFAULT_OPERATION
        defaultAffectationShouldBeFound("operation.lessThanOrEqual=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation is less than or equal to SMALLER_OPERATION
        defaultAffectationShouldNotBeFound("operation.lessThanOrEqual=" + SMALLER_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsLessThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation is less than DEFAULT_OPERATION
        defaultAffectationShouldNotBeFound("operation.lessThan=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation is less than UPDATED_OPERATION
        defaultAffectationShouldBeFound("operation.lessThan=" + UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void getAllAffectationsByOperationIsGreaterThanSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);

        // Get all the affectationList where operation is greater than DEFAULT_OPERATION
        defaultAffectationShouldNotBeFound("operation.greaterThan=" + DEFAULT_OPERATION);

        // Get all the affectationList where operation is greater than SMALLER_OPERATION
        defaultAffectationShouldBeFound("operation.greaterThan=" + SMALLER_OPERATION);
    }


    @Test
    @Transactional
    public void getAllAffectationsByAttributeurIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);
        User attributeur = UserResourceIT.createEntity(em);
        em.persist(attributeur);
        em.flush();
        affectation.setAttributeur(attributeur);
        affectationRepository.saveAndFlush(affectation);
        Long attributeurId = attributeur.getId();

        // Get all the affectationList where attributeur equals to attributeurId
        defaultAffectationShouldBeFound("attributeurId.equals=" + attributeurId);

        // Get all the affectationList where attributeur equals to attributeurId + 1
        defaultAffectationShouldNotBeFound("attributeurId.equals=" + (attributeurId + 1));
    }


    @Test
    @Transactional
    public void getAllAffectationsByEnginIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);
        Engin engin = EnginResourceIT.createEntity(em);
        em.persist(engin);
        em.flush();
        affectation.setEngin(engin);
        affectationRepository.saveAndFlush(affectation);
        Long enginId = engin.getId();

        // Get all the affectationList where engin equals to enginId
        defaultAffectationShouldBeFound("enginId.equals=" + enginId);

        // Get all the affectationList where engin equals to enginId + 1
        defaultAffectationShouldNotBeFound("enginId.equals=" + (enginId + 1));
    }


    @Test
    @Transactional
    public void getAllAffectationsByAgentIsEqualToSomething() throws Exception {
        // Initialize the database
        affectationRepository.saveAndFlush(affectation);
        Conducteur agent = ConducteurResourceIT.createEntity(em);
        em.persist(agent);
        em.flush();
        affectation.setAgent(agent);
        affectationRepository.saveAndFlush(affectation);
        Long agentId = agent.getId();

        // Get all the affectationList where agent equals to agentId
        defaultAffectationShouldBeFound("agentId.equals=" + agentId);

        // Get all the affectationList where agent equals to agentId + 1
        defaultAffectationShouldNotBeFound("agentId.equals=" + (agentId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAffectationShouldBeFound(String filter) throws Exception {
        restAffectationMockMvc.perform(get("/api/affectations?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(affectation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateAffectation").value(hasItem(sameInstant(DEFAULT_DATE_AFFECTATION))))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(sameInstant(DEFAULT_DATE_CREATION))))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())))
            .andExpect(jsonPath("$.[*].motifAnnulation").value(hasItem(DEFAULT_MOTIF_ANNULATION)))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION)));

        // Check, that the count call also returns 1
        restAffectationMockMvc.perform(get("/api/affectations/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAffectationShouldNotBeFound(String filter) throws Exception {
        restAffectationMockMvc.perform(get("/api/affectations?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAffectationMockMvc.perform(get("/api/affectations/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingAffectation() throws Exception {
        // Get the affectation
        restAffectationMockMvc.perform(get("/api/affectations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAffectation() throws Exception {
        // Initialize the database
        affectationService.save(affectation);

        int databaseSizeBeforeUpdate = affectationRepository.findAll().size();

        // Update the affectation
        Affectation updatedAffectation = affectationRepository.findById(affectation.getId()).get();
        // Disconnect from session so that the updates on updatedAffectation are not directly saved in db
        em.detach(updatedAffectation);
        updatedAffectation
            .dateAffectation(UPDATED_DATE_AFFECTATION)
            .dateCreation(UPDATED_DATE_CREATION)
            .statut(UPDATED_STATUT)
            .motifAnnulation(UPDATED_MOTIF_ANNULATION)
            .operation(UPDATED_OPERATION);

        restAffectationMockMvc.perform(put("/api/affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAffectation)))
            .andExpect(status().isOk());

        // Validate the Affectation in the database
        List<Affectation> affectationList = affectationRepository.findAll();
        assertThat(affectationList).hasSize(databaseSizeBeforeUpdate);
        Affectation testAffectation = affectationList.get(affectationList.size() - 1);
        assertThat(testAffectation.getDateAffectation()).isEqualTo(UPDATED_DATE_AFFECTATION);
        assertThat(testAffectation.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testAffectation.getStatut()).isEqualTo(UPDATED_STATUT);
        assertThat(testAffectation.getMotifAnnulation()).isEqualTo(UPDATED_MOTIF_ANNULATION);
        assertThat(testAffectation.getOperation()).isEqualTo(UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void updateNonExistingAffectation() throws Exception {
        int databaseSizeBeforeUpdate = affectationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAffectationMockMvc.perform(put("/api/affectations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(affectation)))
            .andExpect(status().isBadRequest());

        // Validate the Affectation in the database
        List<Affectation> affectationList = affectationRepository.findAll();
        assertThat(affectationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAffectation() throws Exception {
        // Initialize the database
        affectationService.save(affectation);

        int databaseSizeBeforeDelete = affectationRepository.findAll().size();

        // Delete the affectation
        restAffectationMockMvc.perform(delete("/api/affectations/{id}", affectation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Affectation> affectationList = affectationRepository.findAll();
        assertThat(affectationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
