import { BasePage } from "./page";
import { RegistrationPage } from "./registration.page";

export class LoginPage extends BasePage {
    // Locators
    private loginFieldLocator = "(//input[contains(@class, 'auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full')])[1]";
    private passwordFieldLocator = "(//input[contains(@class, 'auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full')])[2]";
    private logInButtonLocator = "//button[contains(@class,'auth-button_primary')]";
    private captchaFrameLocator = "//*[contains(@class,'auth-form__captcha')]";
    private registrationButtonLocator = "//*[@id='auth-container']/div/div[2]/div/form/div[4]/div[1]/a";
    
    // Elements
    private get loginField() {
        return this.page.locator(this.loginFieldLocator);
    }

    private get passwordField() {
        return this.page.locator(this.passwordFieldLocator);
    }

    private get logInButton() {
        return this.page.locator(this.logInButtonLocator);
    }

    private get captchaFrame() {
        return this.page.locator(this.captchaFrameLocator);
    }

    private get registrationButton() {
        return this.page.locator(this.registrationButtonLocator);
    } 

    // Methods

    async logIn(login: string, password: string) {
        await this.loginField.fill(login);
        await this.passwordField.fill(password);
        await this.logInButton.click();
    }

   async waitCapchaFrameAppears() {
        return await this.captchaFrame.waitFor( { state: "visible", timeout: 5000 });
    }

    async clickToRegistrationButton(): Promise<RegistrationPage> {
        await this.registrationButton.click();
        return new RegistrationPage(this.page);
    }; 
}