import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ConducteurComponentsPage from './conducteur.page-object';
import ConducteurUpdatePage from './conducteur-update.page-object';
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

describe('Conducteur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conducteurComponentsPage: ConducteurComponentsPage;
  let conducteurUpdatePage: ConducteurUpdatePage;

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
    conducteurComponentsPage = new ConducteurComponentsPage();
    conducteurComponentsPage = await conducteurComponentsPage.goToPage(navBarPage);
  });

  it('should load Conducteurs', async () => {
    expect(await conducteurComponentsPage.title.getText()).to.match(/Conducteurs/);
    expect(await conducteurComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Conducteurs', async () => {
    const beforeRecordsCount = (await isVisible(conducteurComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(conducteurComponentsPage.table);
    conducteurUpdatePage = await conducteurComponentsPage.goToCreateConducteur();
    await conducteurUpdatePage.enterData();

    expect(await conducteurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(conducteurComponentsPage.table);
    await waitUntilCount(conducteurComponentsPage.records, beforeRecordsCount + 1);
    expect(await conducteurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await conducteurComponentsPage.deleteConducteur();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(conducteurComponentsPage.records, beforeRecordsCount);
      expect(await conducteurComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(conducteurComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
