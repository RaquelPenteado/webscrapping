require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.click('input[name="username"]');
  const email = process.env.USER;
  await page.keyboard.type(email);

  await page.waitForSelector('input[name="password"]');
  await page.click('input[name="password"]');
  const password = process.env.PASSWORD;
  await page.keyboard.type(password);

  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  await page.waitForNavigation();

  await page.goto("https://www.instagram.com/raquel_penteado");
  
  const imglist = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img')
    const imgArray = [...nodeList]
    imglist = imgArray.map( ({src}) => ({
      src
    }))
    return imglist
  })

  fs.writeFile('instagram.json', JSON.stringify(imglist, null, 2), err => {
    if(err) throw new Error ('something went wrong')

    console.log('well done!')
  })

  await browser.close();
})();