import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { BookHotelListPage } from './bookHotelListPage';

export class HomePage extends BasePage {
  readonly path: string;
  readonly globalBooker: Locator = this.page.locator('#global-booker');
  readonly bookNowButton: Locator = this.globalBooker.getByRole('button', { name: 'BOOK NOW'});

  readonly topCardSlider: Locator = this.page.locator('div.card-slider card-slider');
  readonly topCardSliderNextButton: Locator = this.topCardSlider.getByRole('button', { name: 'Next' });
  readonly topCardSliderPrevButton: Locator = this.topCardSlider.getByRole('button', { name: 'Previous' });
  readonly topCardSliderActiveSlide = this.topCardSlider.locator('div[class*="active"]');
  readonly topCardSliderActiveSlideTitle = this.topCardSliderActiveSlide.locator('h4');

  constructor(page) {
    super(page);

    this.path = this.baseUrl + '/';
  }

  async expectedCondition() {
    await expect(this.page).toHaveTitle(/Caesars Entertainment Hotels, Casinos & Experiences/);
  }

  async goToHomePage() {
    await this.navigate(this.path);
  }

  async clickBookNowButton(): Promise<BookHotelListPage> {
    await this.bookNowButton.click();
    return new BookHotelListPage(this.page);
  }

  async clickTopCardSliderNextButton() {
    await this.topCardSliderNextButton.click();
  }

  async clickTopCardSliderPrevButton() {
    await this.topCardSliderPrevButton.click();
  }

  async getTopCardSliderActiveSlideTitle() {
    return await this.topCardSliderActiveSlideTitle.textContent();
  }

  async assertTopCardSliderActiveSlideTitle(expectedTitle: string) {
    await expect(this.topCardSliderActiveSlideTitle).toHaveText(expectedTitle);
  }
}