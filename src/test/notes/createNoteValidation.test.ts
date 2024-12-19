import { App } from '../../App';
import assert from 'assert';

describe('Create note validation', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('4 - Should display the correct validation errors', async () => {
    const newNoteButton = await app.findElementById('new-note-button');
    await newNoteButton.click();

    const saveButton = await app.findElementById('save-note-button');
    await saveButton.click();

    const titleErrorElement = await app.findElementByText('Preencha o título');
    assert.equal(await titleErrorElement.isDisplayed(), true);

    const okButton = await app.findElementByText('OK');
    await okButton.click();

    const titleInput = await app.findElementById('title-input');
    await titleInput.setValue('Nota teste 1');

    await saveButton.click();

    const descriptionErrorElement = await app.findElementByText(
      'Preencha a descrição'
    );
    assert.equal(await descriptionErrorElement.isDisplayed(), true);

    await okButton.click();

    const errorAlertElement = await app.findElementByText('Erro');
    assert.equal(await errorAlertElement.isDisplayed(), false);
  });
});
