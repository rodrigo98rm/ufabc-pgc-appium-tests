import { App } from '../../App';
import assert from 'assert';

export const createNote = async ({
  app,
  noteTitle,
  noteDescription,
}: {
  app: App;
  noteTitle: string;
  noteDescription: string;
}) => {
  const newNoteButton = await app.findElementById('new-note-button');
  await newNoteButton.click();

  const titleInput = await app.findElementById('title-input');
  await titleInput.setValue(noteTitle);

  const descriptionInput = await app.findElementById('description-input');
  await descriptionInput.setValue(noteDescription);

  const saveButton = await app.findElementById('save-note-button');
  await saveButton.click();

  assert.equal(await newNoteButton.isDisplayed(), true);

  const noteTitleElement = await app.findElementByText(noteTitle);
  const noteDescriptionElement = await app.findElementByText(noteDescription);

  assert.equal(await noteTitleElement.isDisplayed(), true);
  assert.equal(await noteDescriptionElement.isDisplayed(), true);
};
