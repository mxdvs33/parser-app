console.log('Запрос получен, выбираю нужный url...')

const puppeteer = require('puppeteer');

const urls = [
    'https://www.binance.com/ru/price/bitcoin',
    'https://www.binance.com/ru/price/ethereum',
    'https://www.binance.com/ru/price/tether',
    'https://www.binance.com/ru/price/usd-coin'
];

(async () => {
    const browser = await puppeteer.launch({headless: false})

    for (let url of urls) {
        const page = await browser.newPage()
        await page.goto(url)

        let arr = await page.evaluate(() => {
            let text = document.querySelector('.css-1bwgsh3').innerText
            return text
        })

        console.log(arr)

        await page.close()
    }

    await browser.close()
})()