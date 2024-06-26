// https://medium.com/meero-engineering/kickstarting-mobile-testing-a-journey-with-appium-and-typescript-89b62d311069
import { App } from '../App';

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.pgcapp',
  'appium:appActivity': '.MainActivity',
  'appium:locale': 'US',
  'appium:language': 'en',
};

describe('Login', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init(androidCapabilities);
  });

  after(async () => {
    await app.quit();
  });

  it('Logs in', async () => {
    const emailInput = await app.findElement();

    const imageButton = await app.findElement('android.widget.ImageButton');
    await imageButton.click();
    const editText = await app.findElement(
      'android=new UiSelector().className(android.widget.EditText)'
    );
    await editText.click();
    await editText.setValue('bat');
    const linearLayout = await app.findElement(
      '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout[2]/android.widget.ScrollView/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[3]/android.widget.LinearLayout'
    );
    await linearLayout.click();
    const progressBar = await app.findElement(
      'android=new UiSelector().className(android.widget.ProgressBar)'
    );
    await progressBar.isDisplayed();
  });
});
