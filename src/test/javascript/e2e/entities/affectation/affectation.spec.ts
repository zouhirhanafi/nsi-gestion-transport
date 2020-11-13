import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AffectationComponentsPage from './affectation.page-object';
import AffectationUpdatePage from './affectation-update.page-object';
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

describe('Affectation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let affectationComponentsPage: AffectationComponentsPage;
  let affectationUpdatePage: AffectationUpdatePage;

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
    affectationComponentsPage = new AffectationComponentsPage();
    affectationComponentsPage = await affectationComponentsPage.goToPage(navBarPage);
  });

  it('should load Affectations', async () => {
    expect(await affectationComponentsPage.title.getText()).to.match(/Affectations/);
    expect(await affectationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Affectations', async () => {
    const beforeRecordsCount = (await isVisible(affectationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(affectationComponentsPage.table);
    affectationUpdatePage = await affectationComponentsPage.goToCreateAffectation();
    await affectationUpdatePage.enterData();

    expect(await affectationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(affectationComponentsPage.table);
    await waitUntilCount(affectationComponentsPage.records, beforeRecordsCount + 1);
    expect(await affectationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await affectationComponentsPage.deleteAffectation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(affectationComponentsPage.records, beforeRecordsCount);
      expect(await affectationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(affectationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
