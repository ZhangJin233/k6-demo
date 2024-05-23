import { browser } from 'k6/experimental/browser';
import { Trend } from 'k6/metrics';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

const myTrend = new Trend('total_action_time', true);

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
    page.evaluate(() => window.performance.mark('page-visit'));

    page.locator('#checkbox1').check();
    page.locator('#counter-button"]').click();
    page.locator('#text1').fill('This is a test');

    page.evaluate(() => window.performance.mark('action-completed'));

    // Get time difference between visiting the page and completing the actions
    page.evaluate(() =>
      window.performance.measure('total-action-time', 'page-visit', 'action-completed')
    );

    const totalActionTime = page.evaluate(
      () =>
        JSON.parse(JSON.stringify(window.performance.getEntriesByName('total-action-time')))[0]
          .duration
    );

    myTrend.add(totalActionTime);
  } finally {
    page.close();
  }
}