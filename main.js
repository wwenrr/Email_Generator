const puppeteer = require("puppeteer");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    console.log('Browser launched successfully!');
    foo(browser)
  } catch (error) {
    console.error('Error launching browser:', error);
  }
})();

foo = async (browser) => {
  const page = await browser.newPage();

  // Điều hướng đến URL
  await page.goto(
    "https://accounts.google.com/signup/v2/createaccount?continue=http%3A%2F%2Fsupport.google.com%2Faccounts%2Fanswer%2F27441%3Fhl%3Dvi&hl=vi&parent_directed=true&ddm=0&flowName=GlifWebSignIn&flowEntry=SignUp"
  );

  const pageTitle = await page.title();
  console.log(`Page Title: ${pageTitle}`);

  try {
    await page.waitForSelector('input[id="lastName"]');
    await page.type('input[id="lastName"]', "John");

    await page.waitForSelector('input[id="firstName"]');
    await page.type('input[id="firstName"]', "Doe");
  } catch (error) {
    console.log("Fail!", error);
  }

  try {
    await page.click(".VfPpkd-vQzf8d");
  } catch (error) {
    console.log("Fail to click button!", error);
  }

  // Trang mới
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  try {
    await page.type('input[id="day"]', "1");
    await page.select("select#month", "1");
    await page.type('input[id="year"]', "2010");
    await page.select("select#gender", "1");
  } catch (error) {
    console.log("Fail to Submit!");
  }

  try {
    await page.click(".VfPpkd-RLmnJb");
  } catch (error) {
    console.log("Fail to click button!", error);
  }

  //Trang mới
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  try {
    await page.focus(".whsOnd.zHQkBf"); //focus

    await delay(1000);
    await page.keyboard.type("asdfaed332s", { delay: 10 }); // Trễ 10ms
    await page.click(".VfPpkd-vQzf8d");
  } catch (error) {
    console.log("Error when typing:", error);
  }

  //Trang mới
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  try {
    await delay(1000);
    await page.focus('input[name="Passwd"]'); //focus 1
    await page.keyboard.type("MK07042004", { delay: 10 }); // Trễ 10ms

    await delay(100);
    await page.focus('input[name="PasswdAgain"]'); //focus 1
    await page.keyboard.type("MK07042004", { delay: 10 }); // Trễ 10ms

    await page.click(".VfPpkd-vQzf8d");
  } catch (error) {}

  // Đóng trình duyệt
  // await browser.close();
  await delay(10000000);
};
