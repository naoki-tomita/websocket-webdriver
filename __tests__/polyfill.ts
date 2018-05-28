const createStorageMock = () => {
  let store: {
    [key: string]: string;
  } = {};
  return {
    clear: jest.fn(() => {
      store = {};
    }),
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    keys: jest.fn(() => {
      return Object.keys(store);
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    setItem: jest.fn((key: string, value: any) => {
      store[key] = value.toString();
    }),
  };
};

Object.defineProperty(window, "localStorage", {
  value: createStorageMock(),
});

Object.defineProperty(window, "sessionStorage", {
  value: createStorageMock(),
});

class MockLocation {
  _href: string;
  get href() {
    return this._href;
  }
  set href(url: string) {
    this._href = url;
  }
}

Object.defineProperty(window, "location", {
  value: new MockLocation(),
});