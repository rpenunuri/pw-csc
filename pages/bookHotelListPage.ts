import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class BookHotelListPage extends BasePage {
    readonly path: string;
    readonly hotelList: Locator = this.page.locator('[data-component="HotelList"]');
    readonly bookingSearchListItems: Locator = this.hotelList.locator('[data-component="BookingSearchListItem"]');

    constructor(page) {
        super(page);

        this.path = this.baseUrl + '/book/hotel-list';
    }

    async expectedCondition() {
        await this.page.waitForURL('**/book/hotel-list');
    }

    async goToBookHotelListPage() {
        await this.navigate(this.path);
    }

    async assertHotelListIsVisible() {
        await expect(this.hotelList).toBeVisible();
    }

    async assertBookingSearchResultsIsNotEmpty() {
        expect((await this.bookingSearchListItems.all()).length).toBeGreaterThan(0);
    }
}