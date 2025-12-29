import {test as setup,expect} from '../fixtures/baseTest.ts';

const authfile='playwright/.auth/user.json';

setup('authentication setup',async({page})=>{
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Username' }).fill('will');
    await page.getByRole('textbox', { name: 'Password' }).fill('will');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveURL(/.*index\.php\?.*module=Home/);
    await page.context().storageState({path:authfile});
})
