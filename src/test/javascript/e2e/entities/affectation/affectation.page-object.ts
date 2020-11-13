import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AffectationUpdatePage from './affectation-update.page-object';

const expect = chai.expect;
export class AffectationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gestionTransportApp.affectation.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-affectation'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AffectationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('affectation-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('affectation');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAffectation() {
    await this.createButton.click();
    return new AffectationUpdatePage();
  }

  async deleteAffectation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const affectationDeleteDialog = new AffectationDeleteDialog();
    await waitUntilDisplayed(affectationDeleteDialog.deleteModal);
    expect(await affectationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gestionTransportApp.affectation.delete.question/);
    await affectationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(affectationDeleteDialog.deleteModal);

    expect(await isVisible(affectationDeleteDialog.deleteModal)).to.be.false;
  }
}
