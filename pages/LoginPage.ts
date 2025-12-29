import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DashboardPage } from "./DashboardPage";

export class LoginPage extends BasePage {
    readonly usernameInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;

    constructor(page:Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' })
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
    }

    async login(username:string, password:string):Promise<DashboardPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new DashboardPage(this.page);
    }
}
