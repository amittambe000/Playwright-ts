import { test, expect } from '../fixtures/baseTest.ts';

test.describe('Authentication Flow',()=>{
    test('User should be able to login with the valid credentails', async({loginPage,dashboardPage})=>{
        // Navigate to the site first (cookies will be sent, so we'll be logged in)
        await dashboardPage.page.goto('/');
        await dashboardPage.naviagteToLeadsPage();
        await expect(dashboardPage.page).toHaveURL(/.*index\.php\?.*module=Leads/);
    })

        test('User should be able to login with the valid credentails1', async({loginPage,dashboardPage})=>{
        // Navigate to the site first (cookies will be sent, so we'll be logged in)
        await dashboardPage.page.goto('/');
        await dashboardPage.naviagteToLeadsPage();
        await expect(dashboardPage.page).toHaveURL(/.*index\.php\?.*module=Leads/);
    })

        test('User should be able to login with the valid credentails2', async({loginPage,dashboardPage})=>{
        // Navigate to the site first (cookies will be sent, so we'll be logged in)
        await dashboardPage.page.goto('/');
        await dashboardPage.naviagteToLeadsPage();
        await expect(dashboardPage.page).toHaveURL(/.*index\.php\?.*module=Leads/);
    })

        test('User should be able to login with the valid credentails3', async({loginPage,dashboardPage})=>{
        // Navigate to the site first (cookies will be sent, so we'll be logged in)
        await dashboardPage.page.goto('/');
        await dashboardPage.naviagteToLeadsPage();
        await expect(dashboardPage.page).toHaveURL(/.*index\.php\?.*module=Leads/);
    })

        test('User should be able to login with the valid credentails4', async({loginPage,dashboardPage})=>{
        // Navigate to the site first (cookies will be sent, so we'll be logged in)
        await dashboardPage.page.goto('/');
        await dashboardPage.naviagteToLeadsPage();
        await expect(dashboardPage.page).toHaveURL(/.*index\.php\?.*module=Leads/);
    })
})
