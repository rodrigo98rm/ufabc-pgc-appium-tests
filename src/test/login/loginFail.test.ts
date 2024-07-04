// https://medium.com/meero-engineering/kickstarting-mobile-testing-a-journey-with-appium-and-typescript-89b62d311069
// https://www.testim.io/blog/mocha-for-typescript-testing/

import { App } from '../../App';
import assert from 'assert';

describe('Login fail', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('Login fails', async () => {
    const emailInput = await app.findElementById('email-input');
    await emailInput.setValue('rodrigo@teste.com');

    const passwordInput = await app.findElementById('password-input');
    await passwordInput.setValue('12345');

    const loginButton = await app.findElementById('login-button');
    await loginButton.click();

    const invalidLoginAlert = await app.findElementByText('Login Inválido');
    assert.equal(await invalidLoginAlert.isDisplayed(), true);

    const okButton = await app.findElementByText('OK');
    await okButton.click();

    assert.equal(await loginButton.isDisplayed(), true);
  });
});
