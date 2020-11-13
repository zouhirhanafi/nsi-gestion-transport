import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ParameterUpdatePage from './parameter-update.page-object';

const expect = chai.expect;
export class ParameterDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gestionTransportApp.parameter.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-parameter'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ParameterComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('parameter-heading'));
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
    await navBarPage.getEntityPage('parameter');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateParameter() {
    await this.createButton.click();
    return new ParameterUpdatePage();
  }

  async deleteParameter() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const parameterDeleteDialog = new ParameterDeleteDialog();
    await waitUntilDisplayed(parameterDeleteDialog.deleteModal);
    expect(await parameterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gestionTransportApp.parameter.delete.question/);
    await parameterDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(parameterDeleteDialog.deleteModal);

    expect(await isVisible(parameterDeleteDialog.deleteModal)).to.be.false;
  }
}
