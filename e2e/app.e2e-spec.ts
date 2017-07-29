import { GcLogParserUiPage } from './app.po';

describe('gc-log-parser-ui App', () => {
  let page: GcLogParserUiPage;

  beforeEach(() => {
    page = new GcLogParserUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
