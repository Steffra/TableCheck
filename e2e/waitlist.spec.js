const { test, expect } = require("@playwright/test");

const BASE_URL = process.env.BASE_URL;

test.beforeEach(async ({ request }) => {
  await request.post(`${BASE_URL}/test-utils/prepare-db-for-e2e-testing`);
});

test("Home page loads", async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle("TableCheck");
  await expect(page.locator("#waitlistForm")).toBeVisible();
});

test("Reservation page loads after submitting form", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="size"]', "2");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/reservation\//);
  await expect(page.locator("body")).toContainText("Your table is ready!");
});

test("Check-in page is reachable", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="size"]', "2");
  await page.click('button[type="submit"]');
  const checkInButton = page.locator("button", { hasText: "Check In" });
  await expect(checkInButton).toBeVisible();
  await expect(page.locator("form[action^='/check-in/']")).toBeVisible();
});

test("Seated page is shown after check-in", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="size"]', "2");
  await page.click('button[type="submit"]');
  const checkInButton = page.locator("button", { hasText: "Check In" });
  await checkInButton.click();
  await expect(page.locator("body")).toContainText("You're now seated");
  await expect(page.locator(".progress-circle")).toBeVisible();
  await expect(page.locator("#countdownText")).toBeVisible();
});

test("Full waitlist flow: join → check-in → seated → finished", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('input[name="name"]', "Test User");
  await page.fill('input[name="size"]', "1");
  await page.click('button[type="submit"]');
  const checkInButton = page.locator("button", { hasText: "Check In" });
  await checkInButton.click();
  //wait 7 seconds for auto finish
  await page.waitForTimeout(3200);
  await expect(page.locator("body")).toContainText("Meal finished");
});
