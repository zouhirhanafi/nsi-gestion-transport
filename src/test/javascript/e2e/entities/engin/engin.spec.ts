import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnginComponentsPage from './engin.page-object';
import EnginUpdatePage from './engin-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Engin e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enginComponentsPage: EnginComponentsPage;
  let enginUpdatePage: EnginUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    enginComponentsPage = new EnginComponentsPage();
    enginComponentsPage = await enginComponentsPage.goToPage(navBarPage);
  });

  it('should load Engins', async () => {
    expect(await enginComponentsPage.title.getText()).to.match(/Engins/);
    expect(await enginComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Engins', async () => {
    const beforeRecordsCount = (await isVisible(enginComponentsPage.noRecords)) ? 0 : await getRecordsCount(enginComponentsPage.table);
    enginUpdatePage = await enginComponentsPage.goToCreateEngin();
    await enginUpdatePage.enterData();

    expect(await enginComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(enginComponentsPage.table);
    await waitUntilCount(enginComponentsPage.records, beforeRecordsCount + 1);
    expect(await enginComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await enginComponentsPage.deleteEngin();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(enginComponentsPage.records, beforeRecordsCount);
      expect(await enginComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(enginComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
