import { App } from '../../App';
import { createNote } from '../baseFlows/createNote.base';
import assert from 'assert';

describe('Edit note', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('7 - Should edit a note', async () => {
    const noteTitle = 'Nota a ser editada';
    const noteDescription = 'Descrição da nota a ser editada';

    const noteTitleEdited = 'Nota editada';
    const noteDescriptionEdited = 'Descrição da nota editada';

    await createNote({
      app,
      noteTitle,
      noteDescription,
    });

    const noteListElement = await app.findElementByText(noteTitle);
    await noteListElement.click();

    const titleInput = await app.findElementById('title-input');
    await titleInput.clearValue();
    await titleInput.setValue(noteTitleEdited);

    const descriptionInput = await app.findElementById('description-input');
    await descriptionInput.clearValue();
    await descriptionInput.setValue(noteDescriptionEdited);

    const saveButton = await app.findElementById('save-note-button');
    await saveButton.click();

    const noteTitleOnList = await app.findElementByText(noteTitleEdited);
    assert.equal(await noteTitleOnList.isDisplayed(), true);

    const noteDescriptionOnList = await app.findElementByText(
      noteDescriptionEdited
    );
    assert.equal(await noteDescriptionOnList.isDisplayed(), true);
  });
});
