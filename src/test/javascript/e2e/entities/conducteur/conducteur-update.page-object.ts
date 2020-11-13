import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ConducteurUpdatePage {
  pageTitle: ElementFinder = element(by.id('gestionTransportApp.conducteur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#conducteur-nom'));
  affectationInput: ElementFinder = element(by.css('input#conducteur-affectation'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setAffectationInput(affectation) {
    await this.affectationInput.sendKeys(affectation);
  }

  async getAffectationInput() {
    return this.affectationInput.getAttribute('value');
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
    await this.setNomInput('nom');
    expect(await this.getNomInput()).to.match(/nom/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAffectationInput('5');
    expect(await this.getAffectationInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
