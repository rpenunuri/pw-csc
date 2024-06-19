import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Home Page', () => {
  test('visitor can navigate through top card slider', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();

    const activeSlideTitle = await homePage.getTopCardSliderActiveSlideTitle();

    if (activeSlideTitle === null) {
      throw new Error('Active slide title is null');
    }

    await homePage.clickTopCardSliderNextButton();
    await homePage.clickTopCardSliderPrevButton();

    await homePage.assertTopCardSliderActiveSlideTitle(activeSlideTitle);
  });

  test('visitor can search for hotel bookings', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    const bookHotelListPage = await homePage.clickBookNowButton();
    await bookHotelListPage.assertHotelListIsVisible();
    await bookHotelListPage.assertBookingSearchResultsIsNotEmpty();
  });
});