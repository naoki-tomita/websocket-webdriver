# WebSocket-WebDriver

[![Build Status](https://travis-ci.com/naoki-tomita/websocket-webdriver.svg?branch=master)](https://travis-ci.com/naoki-tomita/websocket-webdriver)

## What is this?
A browser driver like WebDriver.
This should work on older browser, device browser.

## How to use
### Application

* Add this element on your web application.
  * Script is on `/dist/client/main.js`

```html
<script src="main.js"></script>
```

### Test code.

```js
// some test frame work.
var driver = require("websocket-webdriver");

var button = driver.element("some xpath");
var buttonText = await button.getText();
expect(buttonText).toBe("Button text");
```
