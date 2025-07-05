// https://medium.com/meero-engineering/kickstarting-mobile-testing-a-journey-with-appium-and-typescript-89b62d311069

import { remote, RemoteOptions } from 'webdriverio';

let appiumPort = 4723;
const envAppiumPort = process.env.APPIUM_PORT;
if (envAppiumPort != null) {
  appiumPort = parseInt(envAppiumPort, 10);
}

const appiumOptions: RemoteOptions = {
  hostname: process.env.APPIUM_HOST ?? '127.0.0.1',
  port: appiumPort,
  logLevel: 'info',
  capabilities: {},
};

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.pgcapp',
  'appium:appActivity': '.MainActivity',
  'appium:locale': 'US',
  'appium:language': 'en',
  'appium:noReset': true,
};

const iosCapabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '17.2',
  'appium:deviceName': 'iPhone 15',
  'appium:automationName': 'XCUITest',
  'appium:app': 'com.pgcapp',
  'appium:locale': 'US',
  'appium:language': 'en',
  'appium:noReset': true,
  //'appium:maxTypingFrequency': 20,
};

class App {
  public driver: WebdriverIO.Browser | undefined;
  private platform: 'android' | 'ios' | undefined;

  async init() {
    this.platform = process.env.PLATFORM as 'android' | 'ios';

    if (this.platform === 'android') {
      appiumOptions.capabilities = androidCapabilities;
    } else {
      appiumOptions.capabilities = iosCapabilities;
    }

    this.driver = await remote(appiumOptions);
  }

  async quit() {
    if (this.driver == null) {
      return;
    }

    // await this.driver.pause(1000);
    // await this.driver.deleteSession();
    // https://discuss.appium.io/t/want-to-restart-android-application-in-a-single-appium-session-without-deleting-uninstalling-it/13561/12
    await this.driver.terminateApp('com.pgcapp');
  }

  async findElementById(id: string) {
    if (this.driver == null) {
      throw new Error('Driver is not initialized');
    }

    if (this.platform === 'android') {
      return await this.driver.$(
        `-android uiautomator:new UiSelector().resourceId("${id}")`
      );
    }

    return await this.driver.$(`accessibility id:${id}`);
  }

  async findElementByText(text: string) {
    if (this.driver == null) {
      throw new Error('Driver is not initialized');
    }

    if (this.platform === 'android') {
      return await this.driver.$(
        // `-android uiautomator:new UiSelector().text("${text}")`
        `//*[@text="${text}"]`
      );
    }

    return await this.driver.$(`//*[@label="${text}"]`);
  }

  async findElement(selector: string) {
    if (this.driver == null) {
      throw new Error('Driver is not initialized');
    }

    return await this.driver.$(selector);
  }

  async pause(ms: number) {
    if (this.driver == null) {
      throw new Error('Driver is not initialized');
    }

    await this.driver.pause(ms);
  }
}

export { App };
