import {
  test,
  expect,
} from "@playwright/test";

test.describe("Personalized Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the dashboard", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: /good morning/i,
      }),
    ).toBeVisible();
  });

  test("can search for content", async ({ page }) => {
    const search =
      page.getByRole("searchbox");

    await search.fill("technology");

    await expect(page).toHaveURL(
      /\/search\?q=technology/,
      {
        timeout: 10000,
      },
    );
  });

  test("can toggle dark mode", async ({ page }) => {
    const themeButton =
      page.getByRole("button", {
        name: /toggle theme/i,
      });

    await themeButton.click();

    await expect(
      page.locator("html"),
    ).toHaveClass(/dark/, {
      timeout: 10000,
    });
  });

  test("can favorite content", async ({ page }) => {
    const favoriteButton =
      page
        .getByTestId("favorite-button")
        .first();

    await expect(
      favoriteButton,
    ).toBeVisible({
      timeout: 15000,
    });

    await expect(
      favoriteButton,
    ).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    await favoriteButton.click();

    await expect(
      favoriteButton,
    ).toHaveAttribute(
      "aria-pressed",
      "true",
      {
        timeout: 5000,
      },
    );
  });
});
