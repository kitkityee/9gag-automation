const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

const service = new chrome.ServiceBuilder("driver-autoit/chromedriver.exe");

let email = "kit-tester@outlook.com";
let password = "badPasswordThatShouldNotBeUsed";
let postTitle = "Shake his hand";
let tags = "meme, handsome,";

(async function test9GAG() {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .build();

  await driver.get("https://9gag.com");

  console.log(await driver.getTitle());

  //Accept the cookies
  // await driver.wait(until.elementLocated(By.className("css-1k47zha")), 10000);
  // await driver.findElement(By.className("css-1k47zha")).click();

  //Login
  await driver.wait(until.elementLocated(By.className("btn-mute")), 10000);
  await driver.findElement(By.className("btn-mute")).click();

  await driver.findElement(By.name("username")).sendKeys(email);
  await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

  //Upload
  await driver.wait(until.elementLocated(By.linkText("Upload")), 10000);
  await driver.findElement(By.linkText("Upload")).click();

  await driver.wait(until.elementLocated(By.id("jsid-upload-file-btn")), 10000);
  await driver.findElement(By.id("jsid-upload-file-btn")).click();

  //Choose the right file by autoIT
  let exec = require("child_process").execFile;
  exec("../uploadMeme.exe");

  // Can't wait for the title and tags because they are always there
  // Times out but doesn't crash so the script can continue
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 5000);
  } catch (error) {
    console.error(error);
  }

  //Input the title and tags
  await driver.findElement(By.id("jsid-upload-title")).sendKeys(postTitle);
  await driver.findElement(By.id("jsid-upload-tag-input")).sendKeys(tags);

  // Allow time manually complete captcha
  // In the test environment this would be using test keys
  console.log("Do the Captcha");
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 20000);
  } catch (error) {
    console.error(error);
  }

  //Click Next
  await driver.findElement(By.className("badge-upload-info-next-btn")).click();

  //Category selection
  await driver.wait(
    until.elementLocated(By.xpath('//*[@id="jsid-section-list"]/ul/li[3]/a')),
    1000
  );
  await driver
    .findElement(By.xpath('//*[@id="jsid-section-list"]/ul/li[3]/a'))
    .click();

  //Click Post
  await driver
    .findElement(By.className("badge-upload-pick-section-post-btn"))
    .click();

  // Another delay to allow the screen to update before the screenshot is taken
  try {
    await driver.wait(until.elementLocated(By.id("nullid")), 1000);
  } catch (error) {
    console.error(error);
  }

  //Take a screenshot
  let screenshot = await driver.takeScreenshot();
  fs.writeFileSync("./screenshot.png", screenshot, "base64");
  
  //Close the browser
  await driver.quit();
})();
