import { expect, test } from "../fixtures/baseTest";

test("Create a new Lead", async({page,dashboardPage})=>{
    const leadName = `Test Lead ${Date.now()}`;

    await page.goto('/index.php?module=Leads&action=EditView')
    await page.locator('#last_name').fill(leadName)
    await page.locator('#SAVE').first().click()

    // Wait for navigation to detail view after save
    await expect(page).toHaveURL(/.*action=DetailView.*/)

    // Verify the lead was created with the correct name
    await expect(page.locator('#full_name')).toContainText(leadName)
})

test("Create a new Lead1", async({page,dashboardPage})=>{
    const leadName = `Test Lead ${Date.now()}`;

    await page.goto('/index.php?module=Leads&action=EditView')
    await page.locator('#last_name').fill(leadName)
    await page.locator('#SAVE').first().click()

    // Wait for navigation to detail view after save
    await expect(page).toHaveURL(/.*action=DetailView.*/)

    // Verify the lead was created with the correct name
    await expect(page.locator('#full_name')).toContainText(leadName)
})


test("Create a new Lead2", async({page,dashboardPage})=>{
    const leadName = `Test Lead ${Date.now()}`;

    await page.goto('/index.php?module=Leads&action=EditView')
    await page.locator('#last_name').fill(leadName)
    await page.locator('#SAVE').first().click()

    // Wait for navigation to detail view after save
    await expect(page).toHaveURL(/.*action=DetailView.*/)

    // Verify the lead was created with the correct name
    await expect(page.locator('#full_name')).toContainText(leadName)
})


test("Create a new Lead3", async({page,dashboardPage})=>{
    const leadName = `Test Lead ${Date.now()}`;

    await page.goto('/index.php?module=Leads&action=EditView')
    await page.locator('#last_name').fill(leadName)
    await page.locator('#SAVE').first().click()

    // Wait for navigation to detail view after save
    await expect(page).toHaveURL(/.*action=DetailView.*/)

    // Verify the lead was created with the correct name
    await expect(page.locator('#full_name')).toContainText(leadName)
})


test("Create a new Lead4", async({page,dashboardPage})=>{
    const leadName = `Test Lead ${Date.now()}`;

    await page.goto('/index.php?module=Leads&action=EditView')
    await page.locator('#last_name').fill(leadName)
    await page.locator('#SAVE').first().click()

    // Wait for navigation to detail view after save
    await expect(page).toHaveURL(/.*action=DetailView.*/)

    // Verify the lead was created with the correct name
    await expect(page.locator('#full_name')).toContainText(leadName)
})
