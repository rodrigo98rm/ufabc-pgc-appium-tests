import { App } from '../../App';
import { createNote } from '../baseFlows/createNote.base';

describe('Create note', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('5 - Should create a note', async () => {
    await createNote({
      app,
      noteTitle: 'Nota teste 1',
      noteDescription: 'Descrição teste 1',
    });
  });
});
