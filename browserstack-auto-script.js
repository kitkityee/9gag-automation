const { Builder, By, Key, until } = require("selenium-webdriver");
const remote = require("selenium-webdriver/remote");
require("./fast-selenium.js");

let email = "kit-tester@outlook.com";
let password = "badPasswordThatShouldNotBeUsed";
let postTitle = "Shake his hand";
let tags = "meme, handsome,";

async function runTestWithCaps(capabilities) {
  let driver = new Builder()
    .usingServer(
      "http://kittester_CmLqy0:Ydrbxq3nJWy35Qs4pyjp@hub-cloud.browserstack.com/wd/hub"
    )
    .withCapabilities({
      ...capabilities,
      ...(capabilities["browser"] && { browserName: capabilities["browser"] }), 
    })
    .build();
  await driver.get("https://9gag.com");

  driver.setFileDetector(new remote.FileDetector());

  console.log(await driver.getTitle());


  await driver.wait(until.elementLocated(By.className("btn-mute")), 100000); //1000ms = 1s?
  await driver.findElement(By.className("btn-mute")).click();

  await driver.findElement(By.name("username")).sendKeys(email);
  await driver.findElement(By.name("password")).sendKeys(password);
  await driver.findElement(By.name("password")).sendKeys(Key.RETURN);

  await driver.wait(until.elementLocated(By.linkText("Upload")), 100000);
  await driver.findElement(By.linkText("Upload")).click();

  await driver.wait(until.elementLocated(By.id("jsid-upload-file-btn")), 100000);
  await driver.findElement(By.id("jsid-upload-file-btn")).click();

  await driver.findElement(By.id("jsid-upload-file-btn")).sendKeys;

  // Can't find a unique element to wait for
  // Times out but doesn't crash so the script can continue
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 5000);
  } catch (error) {
    console.error(error);
  }

  await driver.findElement(By.id("jsid-upload-title")).sendKeys(postTitle);
  await driver.findElement(By.id("jsid-upload-tag-input")).sendKeys(tags);

  // Another timeout to allow time manually complete captcha
  // In the test environment this would be using test keys
  console.log("Do the Captcha");
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 20000);
  } catch (error) {
    console.error(error);
  }

  await driver.findElement(By.className("badge-upload-info-next-btn")).click();

  await driver.wait(
    until.elementLocated(By.xpath('//*[@id="jsid-section-list"]/ul/li[3]/a')),
    1000
  );
  await driver
    .findElement(By.xpath('//*[@id="jsid-section-list"]/ul/li[3]/a'))
    .click();
  await driver
    .findElement(By.className("badge-upload-pick-section-post-btn"))
    .click();

  // Another delay too allow the screen to update before the screenshot is taken
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 1000);
  } catch (error) {
    console.error(error);
  }

  let screenshot = await driver.takeScreenshot();
  fs.writeFileSync("./screenshot.png", screenshot, "base64");

  await driver.quit();
}
const capabilities1 = {
  browser: "chrome",
  browser_version: "98.0",
  os: "Windows",
  os_version: "10",
  build: "browserstack-build-1",
  name: "Parallel test 1",
};
const capabilities2 = {
  browser: "firefox",
  browser_version: "97.0",
  os: "Windows",
  os_version: "10",
  build: "browserstack-build-1",
  name: "Parallel test 2",
};
const capabilities3 = {
  browser: "edge",
  browser_version: "99.0 beta",
  os: "Windows",
  os_version: "10",
  build: "browserstack-build-1",
  name: "Parallel test 3",
};

runTestWithCaps(capabilities1);
// runTestWithCaps(capabilities2);
// runTestWithCaps(capabilities3);
