const puppeteer = require('puppeteer');

(async () => {
    let browser = await puppeteer.launch({
        headless: false
    });
    let page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 200, // ms
    downloadThroughput: 780 * 1024 / 8, // 780 kb/s
    uploadThroughput: 330 * 1024 / 8, // 330 kb/s
    });
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    
    await page.goto('https://coderinsights.com/2014/08/', {
        timeout: 0
    });
    
    const performanceFirst = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
    );

    console.log('Time to interactive first: ' + 
    (performanceFirst.domInteractive - 
    performanceFirst.navigationStart));

    await browser.close();
})();