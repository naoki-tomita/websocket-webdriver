export class MockLocation {
  _href: string;
  get href() {
    return this._href;
  }
  set href(url: string) {
    this._href = url;
  }
}

export const environment = {
  location: new MockLocation(),
};
