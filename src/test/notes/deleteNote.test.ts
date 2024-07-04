import { App } from '../../App';
import { createNote } from '../baseFlows/createNote.base';
import assert from 'assert';

describe('Delete note', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('Should delete a note', async () => {
    const noteTitle = 'Nota a ser apagada';
    const noteDescription = 'Descrição da nota a ser apagada';

    await createNote({
      app,
      noteTitle,
      noteDescription,
    });

    const noteListElement = await app.findElementByText(noteTitle);
    await noteListElement.click();

    const deleteButton = await app.findElementById('delete-note-button');
    await deleteButton.click();

    const confirmDeleteButton = await app.findElementByText('Apagar');
    await confirmDeleteButton.click();

    const newNoteButton = await app.findElementById('new-note-button');
    assert.equal(await newNoteButton.isDisplayed(), true);

    const noteListElementAfterDelete = await app.findElementByText(noteTitle);
    assert.equal(await noteListElementAfterDelete.isDisplayed(), false);
  });
});
