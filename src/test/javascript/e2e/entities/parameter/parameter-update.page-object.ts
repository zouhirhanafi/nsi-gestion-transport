import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ParameterUpdatePage {
  pageTitle: ElementFinder = element(by.id('gestionTransportApp.parameter.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  labelInput: ElementFinder = element(by.css('input#parameter-label'));
  lib2Input: ElementFinder = element(by.css('input#parameter-lib2'));
  lib3Input: ElementFinder = element(by.css('input#parameter-lib3'));
  refExterneInput: ElementFinder = element(by.css('input#parameter-refExterne'));
  val1Input: ElementFinder = element(by.css('input#parameter-val1'));
  val2Input: ElementFinder = element(by.css('input#parameter-val2'));
  val3Input: ElementFinder = element(by.css('input#parameter-val3'));
  ordreInput: ElementFinder = element(by.css('input#parameter-ordre'));
  typeSelect: ElementFinder = element(by.css('select#parameter-type'));
  paraentSelect: ElementFinder = element(by.css('select#parameter-paraent'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLabelInput(label) {
    await this.labelInput.sendKeys(label);
  }

  async getLabelInput() {
    return this.labelInput.getAttribute('value');
  }

  async setLib2Input(lib2) {
    await this.lib2Input.sendKeys(lib2);
  }

  async getLib2Input() {
    return this.lib2Input.getAttribute('value');
  }

  async setLib3Input(lib3) {
    await this.lib3Input.sendKeys(lib3);
  }

  async getLib3Input() {
    return this.lib3Input.getAttribute('value');
  }

  async setRefExterneInput(refExterne) {
    await this.refExterneInput.sendKeys(refExterne);
  }

  async getRefExterneInput() {
    return this.refExterneInput.getAttribute('value');
  }

  async setVal1Input(val1) {
    await this.val1Input.sendKeys(val1);
  }

  async getVal1Input() {
    return this.val1Input.getAttribute('value');
  }

  async setVal2Input(val2) {
    await this.val2Input.sendKeys(val2);
  }

  async getVal2Input() {
    return this.val2Input.getAttribute('value');
  }

  async setVal3Input(val3) {
    await this.val3Input.sendKeys(val3);
  }

  async getVal3Input() {
    return this.val3Input.getAttribute('value');
  }

  async setOrdreInput(ordre) {
    await this.ordreInput.sendKeys(ordre);
  }

  async getOrdreInput() {
    return this.ordreInput.getAttribute('value');
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async typeSelectOption(option) {
    await this.typeSelect.sendKeys(option);
  }

  getTypeSelect() {
    return this.typeSelect;
  }

  async getTypeSelectedOption() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async paraentSelectLastOption() {
    await this.paraentSelect.all(by.tagName('option')).last().click();
  }

  async paraentSelectOption(option) {
    await this.paraentSelect.sendKeys(option);
  }

  getParaentSelect() {
    return this.paraentSelect;
  }

  async getParaentSelectedOption() {
    return this.paraentSelect.element(by.css('option:checked')).getText();
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
    await this.setLabelInput('label');
    expect(await this.getLabelInput()).to.match(/label/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLib2Input('lib2');
    expect(await this.getLib2Input()).to.match(/lib2/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLib3Input('lib3');
    expect(await this.getLib3Input()).to.match(/lib3/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRefExterneInput('refExterne');
    expect(await this.getRefExterneInput()).to.match(/refExterne/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVal1Input('val1');
    expect(await this.getVal1Input()).to.match(/val1/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVal2Input('val2');
    expect(await this.getVal2Input()).to.match(/val2/);
    await waitUntilDisplayed(this.saveButton);
    await this.setVal3Input('val3');
    expect(await this.getVal3Input()).to.match(/val3/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOrdreInput('5');
    expect(await this.getOrdreInput()).to.eq('5');
    await this.typeSelectLastOption();
    await this.paraentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
