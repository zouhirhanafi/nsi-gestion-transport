import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ConducteurUpdatePage from './conducteur-update.page-object';

const expect = chai.expect;
export class ConducteurDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gestionTransportApp.conducteur.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-conducteur'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ConducteurComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('conducteur-heading'));
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
    await navBarPage.getEntityPage('conducteur');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateConducteur() {
    await this.createButton.click();
    return new ConducteurUpdatePage();
  }

  async deleteConducteur() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const conducteurDeleteDialog = new ConducteurDeleteDialog();
    await waitUntilDisplayed(conducteurDeleteDialog.deleteModal);
    expect(await conducteurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gestionTransportApp.conducteur.delete.question/);
    await conducteurDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(conducteurDeleteDialog.deleteModal);

    expect(await isVisible(conducteurDeleteDialog.deleteModal)).to.be.false;
  }
}
