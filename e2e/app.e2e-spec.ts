import { SustainableNutritionPage } from './app.po';

describe('sustainable-nutrition App', function() {
  let page: SustainableNutritionPage;

  beforeEach(() => {
    page = new SustainableNutritionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sn works!');
  });
});
