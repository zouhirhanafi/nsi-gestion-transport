import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EnginUpdatePage {
  pageTitle: ElementFinder = element(by.id('gestionTransportApp.engin.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeInput: ElementFinder = element(by.css('input#engin-type'));
  referenceInput: ElementFinder = element(by.css('input#engin-reference'));
  libelleInput: ElementFinder = element(by.css('input#engin-libelle'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return this.referenceInput.getAttribute('value');
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
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
    await this.setTypeInput('5');
    expect(await this.getTypeInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setReferenceInput('reference');
    expect(await this.getReferenceInput()).to.match(/reference/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLibelleInput('libelle');
    expect(await this.getLibelleInput()).to.match(/libelle/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
