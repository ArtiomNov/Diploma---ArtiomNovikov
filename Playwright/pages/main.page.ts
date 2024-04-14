import { RateAutoNewsPage } from "./rateAutoNews.page";
import { LoginPage } from "./login.page";
import { BasePage } from "./page";
import { SearchPage } from "./search.page";

export class MainPage extends BasePage {
    // Locators
    public loginButtonLocator = "//div[contains(@class, 'auth-bar__item auth-bar__item--text')]";
    public autoNewsButtonLocator = "(//a[contains(@class, 'b-main-navigation__dropdown-title-link')])[2]";
    public mainMenuNewsButtonLocator = "//*[@id='container']/div/div/header/div[2]/div/nav/ul[1]/li[2]/a/span";
    public searchFieldLocator ="//input[contains(@class, 'fast-search__input')]";

    // Elements
    private get loginButton() {
        return this.page.locator(this.loginButtonLocator);
    };

    private get mainMenuNewsButton() {
        return this.page.locator(this.mainMenuNewsButtonLocator);
    };

    private get autoNewsButton() {
        return this.page.locator(this.autoNewsButtonLocator);
    };

    private get searchField() {
        return this.page.locator(this.searchFieldLocator);
    };
   
    // Methods
    

    async openLoginPage(): Promise<LoginPage> {
        await this.loginButton.click();
        return new LoginPage(this.page);
    }

    async openAutoNewsPage(): Promise<RateAutoNewsPage> {
        await(this.mainMenuNewsButton).hover();
        await this.autoNewsButton.click();
        return new RateAutoNewsPage(this.page);
    }

    async openSearchPage(): Promise<SearchPage> {
        await this.searchField.fill("Карты памяти");
        return new SearchPage(this.page);
    }
};