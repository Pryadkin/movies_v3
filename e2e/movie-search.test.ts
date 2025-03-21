import {expect, test} from '@playwright/test'

test('movie-search', async ({page}) => {
    await page.goto('/')

    const menuBtn = page.getByRole('button', {name: 'Options'})

    await expect(menuBtn).toBeVisible()

    await menuBtn.hover()

    // Дожидаемся появления меню
    const menu = page.locator('ul') // Замените на селектор меню
    await menu.waitFor({state: 'visible'})

    // Проверяем, что div с текстом "My movies" видим
    await page.getByRole('link', {name: 'My movies'}).click()

    await expect(page).toHaveURL('/my-movies')
})
