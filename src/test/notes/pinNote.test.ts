import { App } from '../../App';
import { createNote } from '../baseFlows/createNote.base';
import assert from 'assert';

describe('Pin note', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('8 - Should pin a note', async () => {
    const noteTitle = 'Nota a ser fixada';
    const noteDescription = 'Descrição da nota a ser fixada';

    await createNote({
      app,
      noteTitle,
      noteDescription,
    });

    const noteListElementBeforePinned = await app.findElementById(
      `list-item-pinned:false-${noteTitle}`
    );
    assert.equal(await noteListElementBeforePinned.isDisplayed(), true);

    const noteListElement = await app.findElementByText(noteTitle);
    await noteListElement.click();

    const pinNoteSwitch = await app.findElementById('pin-note-switch');
    await pinNoteSwitch.click();

    const saveButton = await app.findElementByText('SALVAR');
    await saveButton.click();

    const newNoteButton = await app.findElementById('new-note-button');
    assert.equal(await newNoteButton.isDisplayed(), true);

    const noteListElementAfterPinned = await app.findElementById(
      `list-item-pinned:true-${noteTitle}`
    );
    assert.equal(await noteListElementAfterPinned.isDisplayed(), true);
  });
});
