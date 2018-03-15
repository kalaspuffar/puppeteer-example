const puppeteer = require('puppeteer');

(async () => {
  let browser = await puppeteer.launch({
    headless: false   
  });
  let page = await browser.newPage();

  let client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Network.clearBrowserCache');

  await page.goto('https://coderinsights.com/2014/08/', {
      timeout: 0
  });

  const performanceFirst = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );

  await page.goto('https://coderinsights.com/2014/08/', {
    timeout: 0
  });

  const performanceSecond = JSON.parse(
    await page.evaluate(() => JSON.stringify(window.performance.timing))
  );

  console.log(performanceFirst);

  console.log('Time to interactive first: ' + 
    (performanceFirst.domInteractive - 
    performanceFirst.navigationStart));
  console.log('Time to interactive second: ' + 
    (performanceSecond.domInteractive - 
    performanceSecond.navigationStart));

  await browser.close();
})();

/*
  await client.send('ServiceWorker.enable');
  await client.send('ServiceWorker.unregister', {
    scopeURL: 'http://localhost:8080/',
  });
*/