import { App } from '../../App';
import assert from 'assert';

describe('Empty list state', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init();
  });

  after(async () => {
    await app.quit();
  });

  it('Should show some basic information while the list is empty', async () => {
    const emptyStateTitle = await app.findElementByText(
      'Nenhuma nota cadastrada'
    );
    assert.equal(await emptyStateTitle.isDisplayed(), true);
  });
});
