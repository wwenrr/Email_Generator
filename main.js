const puppeteer = require("puppeteer");
const { readFile } = require("./data/data"); // Import readFile từ module

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const foo = async (user, pass) => {
  try {
    console.log(user);
    console.log(pass);

    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto("https://www.youtube.com/");

    await page.waitForSelector("a.yt-spec-button-shape-next", {
      timeout: 30000,
    });
    await page.click("a.yt-spec-button-shape-next");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    //click
    await page.waitForSelector("#identifierId");
    await page.type("#identifierId", user);

    //next
    await page.waitForSelector("#identifierNext");
    await page.click("#identifierNext");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    //type password
    await delay("1000");
    console.log("done");
    await page.waitForSelector("input.whsOnd.zHQkBf");
    await page.type("input.whsOnd.zHQkBf", pass);
    await page.waitForSelector("button.VfPpkd-LgbsSe");

    const buttons = await page.$$("button.VfPpkd-LgbsSe");
    for (const button of buttons) {
      const text = await page.evaluate((el) => el.innerText, button);
      if (text.includes("Next")) {
        await button.click();
        console.log('Clicked on the "Next" button');
        break;
      }
    }

    //================================================
    await page.goto("https://youtube.com/@Keo_Mon");

    await page.waitForSelector("a.yt-spec-button-shape-next", {
      timeout: 30000,
    });
    await page.click("a.yt-spec-button-shape-next");

    try {
      // Chờ nút với lớp class cụ thể
      await page.waitForSelector("button.yt-spec-button-shape-next");

      // Nhấp vào nút với văn bản "Subscribe"
      await page.evaluate(() => {
        // Tìm tất cả các nút với lớp class cụ thể
        const buttons = document.querySelectorAll(
          "button.yt-spec-button-shape-next"
        );

        // Duyệt qua tất cả các nút để tìm nút có văn bản "Subscribe"
        for (const button of buttons) {
          const textContentElement = button.querySelector(
            ".yt-spec-button-shape-next__button-text-content"
          );
          if (
            textContentElement &&
            textContentElement.innerText.includes("Subscribe")
          ) {
            button.click();
            console.log('Clicked on the "Subscribe" button');
            break;
          }
        }
      });
    } catch (error) {
      console.error("Error finding or clicking the subscribe button:", error);
    }

    await delay(50000000);
    await browser.close();

    console.log("Browser launched successfully!");
  } catch (error) {
    console.error("Error launching browser:", error);
  }
};

(async () => {
  try {
    arr = await readFile();
    console.log(arr);

    for (let i = 0; i < 2; i += 2) {
      foo(arr[i], arr[i + 1]);
    }
  } catch (err) {
    console.error("Error initializing array:", err);
  }
})();
