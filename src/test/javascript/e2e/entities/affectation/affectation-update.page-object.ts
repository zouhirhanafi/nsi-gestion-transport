import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AffectationUpdatePage {
  pageTitle: ElementFinder = element(by.id('gestionTransportApp.affectation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateAffectationInput: ElementFinder = element(by.css('input#affectation-dateAffectation'));
  dateCreationInput: ElementFinder = element(by.css('input#affectation-dateCreation'));
  statutSelect: ElementFinder = element(by.css('select#affectation-statut'));
  motifAnnulationInput: ElementFinder = element(by.css('input#affectation-motifAnnulation'));
  operationInput: ElementFinder = element(by.css('input#affectation-operation'));
  attributeurSelect: ElementFinder = element(by.css('select#affectation-attributeur'));
  enginSelect: ElementFinder = element(by.css('select#affectation-engin'));
  agentSelect: ElementFinder = element(by.css('select#affectation-agent'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateAffectationInput(dateAffectation) {
    await this.dateAffectationInput.sendKeys(dateAffectation);
  }

  async getDateAffectationInput() {
    return this.dateAffectationInput.getAttribute('value');
  }

  async setDateCreationInput(dateCreation) {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput() {
    return this.dateCreationInput.getAttribute('value');
  }

  async setStatutSelect(statut) {
    await this.statutSelect.sendKeys(statut);
  }

  async getStatutSelect() {
    return this.statutSelect.element(by.css('option:checked')).getText();
  }

  async statutSelectLastOption() {
    await this.statutSelect.all(by.tagName('option')).last().click();
  }
  async setMotifAnnulationInput(motifAnnulation) {
    await this.motifAnnulationInput.sendKeys(motifAnnulation);
  }

  async getMotifAnnulationInput() {
    return this.motifAnnulationInput.getAttribute('value');
  }

  async setOperationInput(operation) {
    await this.operationInput.sendKeys(operation);
  }

  async getOperationInput() {
    return this.operationInput.getAttribute('value');
  }

  async attributeurSelectLastOption() {
    await this.attributeurSelect.all(by.tagName('option')).last().click();
  }

  async attributeurSelectOption(option) {
    await this.attributeurSelect.sendKeys(option);
  }

  getAttributeurSelect() {
    return this.attributeurSelect;
  }

  async getAttributeurSelectedOption() {
    return this.attributeurSelect.element(by.css('option:checked')).getText();
  }

  async enginSelectLastOption() {
    await this.enginSelect.all(by.tagName('option')).last().click();
  }

  async enginSelectOption(option) {
    await this.enginSelect.sendKeys(option);
  }

  getEnginSelect() {
    return this.enginSelect;
  }

  async getEnginSelectedOption() {
    return this.enginSelect.element(by.css('option:checked')).getText();
  }

  async agentSelectLastOption() {
    await this.agentSelect.all(by.tagName('option')).last().click();
  }

  async agentSelectOption(option) {
    await this.agentSelect.sendKeys(option);
  }

  getAgentSelect() {
    return this.agentSelect;
  }

  async getAgentSelectedOption() {
    return this.agentSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDateAffectationInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateAffectationInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateCreationInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateCreationInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.statutSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setMotifAnnulationInput('motifAnnulation');
    expect(await this.getMotifAnnulationInput()).to.match(/motifAnnulation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOperationInput('5');
    expect(await this.getOperationInput()).to.eq('5');
    await this.attributeurSelectLastOption();
    await this.enginSelectLastOption();
    await this.agentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
