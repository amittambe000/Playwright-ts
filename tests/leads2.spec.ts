import { test,expect } from "../fixtures/baseTest";
test.describe("Leads Management",()=>{
    test('Create unique lead per worker @Regression', async({page,dashboardPage},testInfo)=>{
        const uniqueId=`${testInfo.workerIndex}-${Date.now()}`;
        const leadName=`Test Lead ${uniqueId}`;
        await page.goto('/index.php?module=Leads&action=EditView')
        await page.locator('#last_name').fill(leadName)
        await page.locator('#SAVE').first().click()

        // Wait for navigation to detail view after save
        await expect(page).toHaveURL(/.*action=DetailView.*/)

        // Verify the lead was created with the correct name
        await expect(page.locator('#full_name')).toContainText(leadName)
    })
})
