import { Page } from "@playwright/test";

export class BasePage {
    readonly page:Page;
    constructor(page:Page) {
        this.page = page;
    }

    async navigateTo(url:string) {
        await this.page.goto(url);
    }
    async getPageTitle() {
        return await this.page.title();
    }
    async getPageUrl() {
        return await this.page.url();
    }
    async getPageSource() {
        return await this.page.content();
    }

}
