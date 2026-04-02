import { test, expect, Page } from '@playwright/test';

async function loginUser(page: Page) {
  await page.goto('http://localhost:5173/login');

  await page.locator('[data-testid="email"]').fill('abhijain3002@gmail.com');
  await page.locator('[data-testid="password"]').fill('helloworld');

  await page.locator('[data-testid="login-submit"]').click();

  // Wait for auth completion - redirect away from /login
  await expect(page).toHaveURL('http://localhost:5173/', { timeout: 15000 });
}

test.describe('E-commerce E2E Test Suite', () => {

  test('1. Homepage loads products', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // verify product cards visible
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
    
    // count > 0
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('2. Navigate to product detail', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards.first()).toBeVisible({ timeout: 10000 });
    
    const titleLocator = page.locator('[data-testid="product-title"]').first();
    const productTitle = await titleLocator.textContent();
    
    // click product card
    await productCards.first().click();
    
    // verify URL /product/:id
    await expect(page).toHaveURL(/\/product\/\d+/);
    
    // verify product title + price
    await expect(page.locator('h1', { hasText: productTitle || '' })).toBeVisible();
    await expect(page.locator('[data-testid="product-price"]').first()).toBeVisible();
  });

  test('3 & 4. Add to cart and Cart functionality (STRICT LOGIN)', async ({ page }) => {
    // 3. Add to cart (STRICT LOGIN)
    await loginUser(page);

    // ensure products are loaded
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });

    // add product to cart
    const addAction = page.locator('[data-testid="cart-action"][data-action="add"]').first();
    await addAction.click();

    // verify UI reflects added state
    await expect(addAction).toHaveText('✓ Added to Bag', { timeout: 5000 });

    // 4. Cart functionality
    // go to cart
    await page.locator('[data-testid="cart-button"]').click();
    await expect(page).toHaveURL('http://localhost:5173/mycart');

    // verify items exist
    const cartItems = page.locator('[data-testid="cart-item"]');
    await expect(cartItems).not.toHaveCount(0);
    
    const initialCount = await cartItems.count();

    // remove item
    await page.locator('[data-testid="cart-action"][data-action="remove"]').first().click();

    // verify count decreases
    await expect(cartItems).toHaveCount(initialCount - 1);
  });

  test('5. Filters (API-based)', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    
    const titlesBefore = await page.locator('[data-testid="product-title"]').allTextContents();
    
    // apply category filter (click the second one since first is "All")
    await page.locator('[data-testid="category-filter"]').nth(0).click();
    
    // waiting for URL to update with categorySlug
    await expect(page).toHaveURL(/categorySlug=/);
    
    // wait for products list to update
    await expect(async () => {
      const titlesAfter = await page.locator('[data-testid="product-title"]').allTextContents();
      expect(titlesAfter).not.toEqual(titlesBefore);
    }).toPass({ timeout: 5000 });
  });

  test('6. Price filter', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });

    // apply min/max
    // In FilterTray it's min and max inputs
    // We should ensure FilterTray is open if we are on mobile, but viewport is large by default
    await page.locator('[data-testid="price-min"]').fill('50');
    await page.locator('[data-testid="price-max"]').fill('500');

    await expect(page).toHaveURL(/priceRange=/);

    // verify products render
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });
    const count = await page.locator('[data-testid="product-card"]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('7. Sorting', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });

    // apply price sorting - option 'price-asc'
    // in SORT_OPTIONS, 1st object is "Recommended", 2nd is "Price: Low to High" (index 1)
    await page.locator('[data-testid="sort-filter"]').nth(1).click();
    
    await expect(page).toHaveURL(/sort=price-asc/);
    
    // verify ascending order
    // the UI sorts instantly or refetches, so we should wait briefly or use `toPass`
    await expect(async () => {
        const prices = await page.locator('[data-testid="product-price"]').allTextContents();
        const numericPrices = prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
        const sorted = [...numericPrices].sort((a, b) => a - b);
        expect(numericPrices).toEqual(sorted);
        expect(numericPrices.length).toBeGreaterThan(0);
    }).toPass({ timeout: 5000 });
  });

  test('8. Pagination', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible({ timeout: 10000 });

    const firstProductTitleBefore = await page.locator('[data-testid="product-title"]').first().textContent();

    // click next
    await page.locator('[data-testid="next-page"]').click();
    
    // verify URL has page=1
    await expect(page).toHaveURL(/page=1/);

    // verify product list changes
    await expect(page.locator('[data-testid="product-title"]').first()).not.toHaveText(firstProductTitleBefore || '', { timeout: 10000 });
  });

});
