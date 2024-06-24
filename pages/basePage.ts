import { type Page } from '@playwright/test';
import config from '../playwright.config.ts';

export abstract class BasePage {
    baseUrl: string;
    page: Page;
  
    constructor(page: Page) {
      this.page = page;
      this.baseUrl = config?.use?.baseURL ?? 'https://www.caesars.com';
      this.expectedCondition();
    }
  
    abstract expectedCondition(): void;

    async navigate(path: string) {
      try {
        await this.page.goto(path, { timeout: 20000 });
      } catch (error) {
        console.error(`Error navigating to ${path}: ${error}`);
      }
    }
  }
  