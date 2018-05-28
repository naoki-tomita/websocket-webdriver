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

class CurrentScript {
  _src: string = "";
  get src() {
    return this._src;
  }
  set src(src: string) {
    this._src = src;
  }
}

Object.defineProperty(document, "currentScript", {
  value: new CurrentScript(),
});
