import { BasePage } from "./page";

export class RateAutoNewsPage extends BasePage {

    //Locators
    private firstNewsLocators = "(//a[contains(@class, 'news-tiles__stub')])[1]";
    private smileRateButtonLocator = "(//div[contains(@class, 'st-btn st-first')])[1]";
    private counterSmilleButtonLocator ="//*[@id='st-2']/div[1]/span[1]"
    
    //Elements
    public get firstNews() {
        return this.page.locator(this.firstNewsLocators);
    };

    public get smileRateButton() {
        return this.page.locator(this.smileRateButtonLocator);
    };

    public get counterSmilleButton() {
        return this.page.locator(this.counterSmilleButtonLocator);
    };
    
    //Methods
    async clickToFirstNews() {
        await this.firstNews.click();
    };

    async scrollToSmileButton() {
    await this.smileRateButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(1000);
    await this.smileRateButton.click();
    
    };

    async getCounterValue() {
        await (this.counterSmilleButton).textContent();
    };

    async clickOneMoreTimeToSmilleIcon() {
        await this.smileRateButton.click();
        await this.smileRateButton.textContent();
    };
}
