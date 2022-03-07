const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

const service = new chrome.ServiceBuilder("driver-autoit/chromedriver.exe");

let email = "kit-tester@outlook.com";
let password = "badPasswordThatShouldNotBeUsed";




(async function test9GAGfiles(files) {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(service)
    .build();

  await driver.get("https://9gag.com");

  console.log(await driver.getTitle());

  await driver.wait(until.elementLocated(By.className("btn-mute")), 10000);
  await driver.findElement(By.className("btn-mute")).click();

  await driver.findElement(By.name("username")).sendKeys(email);
  await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);

  await driver.wait(until.elementLocated(By.linkText("Upload")), 10000);
  await driver.findElement(By.linkText("Upload")).click();

  await driver.wait(until.elementLocated(By.id("jsid-upload-file-btn")), 10000);
  await driver.findElement(By.id("jsid-upload-file-btn")).click();

  //Choose differnt files using different autoIT exe
  let exec = require("child_process").execFile;
  exec(`${files}.exe`);

  //Save screenshot with corresponding names
  let screenshot = await driver.takeScreenshot();
  fs.writeFileSync(`./Screenshots/clickupload/${files}.png`, screenshot, "base64");

  await driver.quit();
})();

//Compile different exe with different file path
test9GAGfiles("tooBigFile"); //File that's too big
test9GAGfiles("highDimension"); //File with too high dimensions
test9GAGfiles("emptyFile"); //Empty or corrupted file
test9GAGfiles("invalidType"); //Invalid file type e.g. svg
test9GAGfiles("boundarySizeAbove"); //10.1MB
test9GAGfiles("boundarySizeBelow"); //9.9MB
