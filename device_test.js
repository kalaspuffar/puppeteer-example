const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.emulate(devices['iPhone 6']);
    await page.goto('https://coderinsights.com/2014/08/', {
        timeout: 50000
    });
    await page.screenshot({path: 'iphone.png'});

    await page.emulate(devices['Galaxy S III']);
    await page.goto('https://coderinsights.com/2014/08/', {
        timeout: 50000
    });
    await page.screenshot({path: 'galaxy.png'});

    await page.emulate(devices['Nexus 10']);
    await page.goto('https://coderinsights.com/2014/08/', {
        timeout: 50000
    });
    await page.screenshot({path: 'surfpad.png'});

    await page.emulate(devices['Nexus 6P']);
    await page.goto('https://coderinsights.com/2014/08/', {
        timeout: 50000
    });
    await page.screenshot({path: 'nexus.png'});

    await browser.close();
})();