import { testEmailLogin, testPassword, userLogin } from "../data/userData";
import { BasePage } from "./page";

export class RegistrationPage extends BasePage {
    //Locators
    private inputEmailFieldLocator = "(//input[contains(@class, 'auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full')])[1]";
    private inputPasswordFieldLocator = "(//input[contains(@class, 'auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full')])[2]";
    private inputPasswordFieldOneMoreTimeLocator = "(//input[contains(@class, 'auth-input auth-input_primary auth-input_base auth-form__input auth-form__input_width_full')])[3]";
    private clickToRegistrationButtonLocator = "//*[@id='container']/div/div/div/form/div[2]/div/div[10]/button";
    private confirmYourEmailFormLocator = "(//div[contains(@class, 'auth-form')])[1]";
    private buttonGoToMailLocator = "//a[contains(@class, 'auth-button auth-button_appendant auth-button_middle auth-formbutton auth-formbutton_width_full')]";
    //Elements
    private get inputEmailField() {
        return this.page.locator(this.inputEmailFieldLocator);
    }
    
    private get inputPasswordField() {
        return this.page.locator(this.inputPasswordFieldLocator);
    }

    private get inputPasswordFieldOneMoreTime() {
        return this.page.locator(this.inputPasswordFieldOneMoreTimeLocator);
    }  

    private get clickToRegistrationButton() {
        return this.page.locator(this.clickToRegistrationButtonLocator);
    }  

    private get confirmYourEmailForm() {
        return this.page.locator(this.confirmYourEmailFormLocator);
    } 
    
    private get buttonGoToMail() {
        return this.page.locator(this.buttonGoToMailLocator);
    } 

    //Methods
    async logInwithInputData () {
        await this.inputEmailField.fill(testEmailLogin); 
        await this.inputPasswordField.fill(testPassword);
        await this.inputPasswordFieldOneMoreTime.fill(testPassword);
        await this.clickToRegistrationButton.click;
    };

    async confirmEmail () {
        return (await this.confirmYourEmailForm);
    }

    async displayButtonGoToMail () {
        return (await this.buttonGoToMail);
    }
};
