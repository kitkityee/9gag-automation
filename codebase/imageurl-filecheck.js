const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

const service = new chrome.ServiceBuilder("driver-autoit/chromedriver.exe");
const email = "kit-tester@outlook.com";
const password = "badPasswordThatShouldNotBeUsed";

//URL for checking
const fileBig = {
  name: "fileBig",
  url: ""
}
const highDimension ="url"
const emptyFile ="url"
const etc ="url"


(async function test9GAGImageURLfile(file) {
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

  //Click upload by image URL
  await driver.wait(until.elementLocated(By.id("jsid-upload-url-btn")), 10000);
  await driver.findElement(By.linkText("jsid-upload-url-btn")).click();

  //Input image URL
  await driver.wait(until.elementLocated(By.id("jsid-upload-url-input")), 10000);
  await driver.findElement(By.linkText("jsid-upload-url-input")).sendKeys(file.url);

  //Take a screenshot and store them with corresponding names
  let screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`./Screenshots/imageurl/${file.name}.png`, screenshot, "base64");
  
  //Close the browser
  await driver.quit();
})();


test9GAGImageURLfile(fileBig)
test9GAGImageURLfile(highDimension)
test9GAGImageURLfile(emptyFile)
test9GAGImageURLfile(etc)