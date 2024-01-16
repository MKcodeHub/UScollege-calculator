const puppeteer = require("puppeteer")

// starting Puppeteer
puppeteer
  .launch().then(async browser => {
    const page = await browser.newPage()
    await page.goto("https://cra-crawl.vercel.app/")
    //Wait for the page to be loaded
    await page.waitForSelector("h1")

    let heading = await page.evaluate(() => {
      const h1 = document.body.querySelector("h1")

      return h1.innerText
    })

    console.log({ heading })

    // closing the browser
    await browser.close()
  }).catch(function (err) {
    console.error(err)
  })
