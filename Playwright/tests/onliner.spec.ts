import { test, expect, chromium } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { getRandomInt } from '../helpers/random.helper';
import { userLogin, userPassword, userToken } from '../data/userData';
import { LoginPage } from '../pages/login.page';
import { RateAutoNewsPage } from '../pages/rateAutoNews.page';

test.describe("Onliner test", async () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.onliner.by/');  
    mainPage = new MainPage(page);
  });

  test.beforeAll(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.onliner.by/');
    await context.addCookies(
      [ 
        {
          name: "oss",
          value: userToken,
          domain: ".onliner.by",
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "Lax"
        },
        {
          name: "logged_in",
          value: "1",
          domain: ".onliner.by",
          path: "/",
          httpOnly: false,
          secure: true,
          sameSite: "Lax"
        }
      ]
    );
    await page.reload();
  });

  test("Log in", async () => {
    let loginPage = await mainPage.openLoginPage();
    await loginPage.logIn(userLogin, userPassword);
    let capcha = await loginPage.waitCapchaFrameAppears();
    expect(capcha)
    });

  test("Registration", async () => {
    let loginPage = await mainPage.openLoginPage();
    let registrationPage = await loginPage.clickToRegistrationButton() ;
    let confirmEmailScreen = await registrationPage.confirmEmail();
    await registrationPage.logInwithInputData();
    expect(confirmEmailScreen).toBeVisible();
    });

    test("Rate autonews", async () => {
      let rateAutoNewsPage = await mainPage.openAutoNewsPage();
      await rateAutoNewsPage.clickToFirstNews();
      await rateAutoNewsPage.scrollToSmileButton();
      let valueCounterAfterFirstClick = await rateAutoNewsPage.getCounterValue();
      let valueCounterAfterSecondClcik = await rateAutoNewsPage.clickOneMoreTimeToSmilleIcon();
     expect(valueCounterAfterFirstClick).toEqual(valueCounterAfterSecondClcik);
    });

    test("Search field", async () => {
      let searchPage = await mainPage.openSearchPage();
      let valueInIframeSearch = " Netac";
      let valueAfterSearch = await searchPage.iframeSearch(valueInIframeSearch);
      expect(valueAfterSearch).toContain(valueInIframeSearch);
    });

});
