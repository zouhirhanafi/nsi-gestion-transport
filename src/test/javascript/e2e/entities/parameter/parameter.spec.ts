import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ParameterComponentsPage from './parameter.page-object';
import ParameterUpdatePage from './parameter-update.page-object';
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

describe('Parameter e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parameterComponentsPage: ParameterComponentsPage;
  let parameterUpdatePage: ParameterUpdatePage;

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
    parameterComponentsPage = new ParameterComponentsPage();
    parameterComponentsPage = await parameterComponentsPage.goToPage(navBarPage);
  });

  it('should load Parameters', async () => {
    expect(await parameterComponentsPage.title.getText()).to.match(/Parameters/);
    expect(await parameterComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Parameters', async () => {
    const beforeRecordsCount = (await isVisible(parameterComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(parameterComponentsPage.table);
    parameterUpdatePage = await parameterComponentsPage.goToCreateParameter();
    await parameterUpdatePage.enterData();

    expect(await parameterComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(parameterComponentsPage.table);
    await waitUntilCount(parameterComponentsPage.records, beforeRecordsCount + 1);
    expect(await parameterComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await parameterComponentsPage.deleteParameter();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(parameterComponentsPage.records, beforeRecordsCount);
      expect(await parameterComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(parameterComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
