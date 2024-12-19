import { App } from '../../App';
import assert from 'assert';

describe('Login success', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('2 - Login succeeds', async () => {
    const emailInput = await app.findElementById('email-input');
    await emailInput.setValue('rodrigo@teste.com');

    const passwordInput = await app.findElementById('password-input');
    await passwordInput.setValue('123456');

    const loginButton = await app.findElementById('login-button');
    await loginButton.click();

    const noteListPageHeader = await app.findElementByText('Notas');
    assert.equal(await noteListPageHeader.isDisplayed(), true);
  });
});
