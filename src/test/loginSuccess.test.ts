// https://medium.com/meero-engineering/kickstarting-mobile-testing-a-journey-with-appium-and-typescript-89b62d311069
import { App } from '../App';

describe('Login success', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('Logs in', async () => {
    const emailInput = await app.findElementById('email-input');
    await emailInput.setValue('rodrigo@teste.com');

    const passwordInput = await app.findElementById('password-input');
    await passwordInput.setValue('123456');

    const loginButton = await app.findElementById('login-button');
    await loginButton.click();

    const headerTitle = await app.findElementByText('Notas');
    await headerTitle.isDisplayed();
  });
});
