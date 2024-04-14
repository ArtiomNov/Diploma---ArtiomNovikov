import { BasePage } from "./page";
import { Locator } from "@playwright/test";

export class SearchPage extends BasePage {
    //Locators
    private iFramelocator = "//*[@id='fast-search-modal']/div/div/iframe";
    private iframeSearchFieldLocator = "//div[contains(@class, 'search__suggest-match')]";
    private productSearchLocator = "//*[@id='search-page']/div[2]/ul/li[1]/div/div/div[2]/div";
    private productLocator = "//*[@id='container']/div/div/div/div/div[2]/div[1]/div/div[4]/h1";
    //Elements
    public get iframe(): Locator {
        return this.page.locator(this.iFramelocator);
    };

    public get iframeSearchField(): Locator {
        return this.page.locator(this.iframeSearchFieldLocator);
    };

    public get productSearch() {
        return this.page.locator(this.productSearchLocator);
    };

    public get product() {
        return this.page.locator(this.productLocator);
    };
    //Methods
    async iframeSearch(value: string) {
        const frameLocator = this.iframe;
        const frameElement = await frameLocator.elementHandle();
        
        if (!frameElement) {
            throw new Error("Iframe element not found");
        }
    
        const frame = await frameElement.contentFrame();
        
        if (!frame) {
            throw new Error("Content frame of iframe not found");
        }

        const searchField = frame.locator(this.iframeSearchFieldLocator);
        await searchField.type(value); 
        const product = await frame.locator(this.productSearchLocator).first();
        await product.click();
        await this.page.bringToFront();
        await this.page.waitForTimeout(5000);
       return  await (this.product).textContent();
    };

   
}
