## Introduction 👋

Quick Screenshot is a lightweight node project that can screenshot a list of URLs. It uses puppeteer and can screenshot pages that use basic authentication - making it perfect for screenshotting prototypes.

If you want to go a bit further and automate the creation of screenflow diagrams too, check out [quick-screenflow](https://github.com/alirawashdeh/quick-screenflow) instead

## Installation 📦

```
git clone https://github.com/alirawashdeh/quick-screenshot.git
cd quick-screenshot
npm install
```

## Configuration 🎚

Update the `urls.js` file to include all the URLs you need to screenshot.

Simple example:

```
  { "name": "001 Google", "url": "https://www.google.com" },
```

Example of a site using basic authentication:

```
{ "name": "003 Basic Auth Example", "username":"user", "password":"password", "url": "https://dfdm943axhisa.cloudfront.net" }
```

## Usage 🏃‍♀️

Run the project using

```
npm start
```
Outputted files will appear in the root of the folder.

## Credits 👍
This project is based on
[puppeteer-examples](https://github.com/checkly/puppeteer-examples)
