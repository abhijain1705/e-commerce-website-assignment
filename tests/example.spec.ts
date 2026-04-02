import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('http://localhost:5173/login');

  await page.locator('[data-testid="email"]').fill('abhijain3002@gmail.com');
  await page.locator('[data-testid="password"]').fill('helloworld');

  await page.locator('[data-testid="login-submit"]').click();

  await expect(page).toHaveURL('http://localhost:5173/', { timeout: 10000 });
}

test.describe('E-commerce App', () => {

  test('homepage loads products', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();

    const count = await page.locator('[data-testid="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigate to product detail', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('[data-testid="product-card"]').first().click();

    await expect(page).toHaveURL(/product/);

    await expect(page.locator('[data-testid="product-price"]').first()).toBeVisible();
  });

  test('add to cart works (strict login)', async ({ page }) => {
    await login(page);

    await expect(page).not.toHaveURL(/login/);
    await expect(page.locator('[data-testid="cart-button"]')).toBeVisible();

    await page.goto('http://localhost:5173');

    const addAction = page.locator('[data-testid="cart-action"][data-action="add"]').first();
    await addAction.click();

    await expect(addAction).toHaveText('✓ Added to Bag', { timeout: 5000 });
  });

  test('navigate to cart and remove item (strict login)', async ({ page }) => {

    await login(page);

    await expect(page).not.toHaveURL(/login/);
    await expect(page.locator('[data-testid="cart-button"]')).toBeVisible();

    const addAction = page.locator('[data-testid="cart-action"][data-action="add"]').first();

    await expect(addAction).toBeVisible();

    await addAction.click();

    await expect(addAction).toHaveText('✓ Added to Bag', { timeout: 5000 });

    await page.locator('[data-testid="cart-button"]').click();
    await page.waitForURL(/mycart/);

    const cartItems = page.locator('[data-testid="cart-item"]');

    await expect(cartItems.first()).toBeVisible({ timeout: 5000 });

    const initialCount = await cartItems.count();
    expect(initialCount).toBeGreaterThan(0);

    await page.locator('[data-testid="cart-action"][data-action="remove"]').first().evaluate((el) => {
      (el as HTMLElement).click();
    });

    await expect(cartItems).toHaveCount(initialCount - 1);
  });

  test('filters products by category', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('[data-testid="category-filter"]').nth(1).click();

    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
  });

  test('filters products by price range', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.fill('[data-testid="price-min"]', '10');
    await page.fill('[data-testid="price-max"]', '1000');

    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
  });

  test('sorting works (price low to high)', async ({ page }) => {
    await page.goto('http://localhost:5173');

    await page.locator('[data-testid="sort-filter"]').nth(1).click();

    const prices = await page.locator('[data-testid="product-price"]').allTextContents();

    const numericPrices = prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));

    const sorted = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sorted);
  });

  test('pagination button works', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const cards = page.locator('[data-testid="product-card"]');

    await expect(cards.first()).toBeVisible();

    await page.locator('[data-testid="next-page"]').click();

    await expect
      .poll(async () => await cards.count(), {
        timeout: 5000,
      })
      .toBeGreaterThan(0);
  });

});