import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    readonly salesMenu:Locator;
    readonly LeadsLink:Locator;

    constructor(page:Page) {
        super(page);
        this.salesMenu = page.getByRole('link', { name: 'Sales' });
        this.LeadsLink = page.getByRole('link', { name: 'Leads' });
    }

    async naviagteToLeadsPage(){
        await this.salesMenu.click();
        await this.LeadsLink.click();
    }
}
