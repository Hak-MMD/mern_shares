const API_KEY = '2B3EXWTXF2BHSBS4'
// const API_KEY = 'demo'
// const API_KEY = 'D1GD6SC6VGHQ85YV'

const INDAY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=&interval=30min&apikey=${API_KEY}`;
const SEARCH_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=&apikey=${API_KEY}`;
const DAILY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=&apikey=${API_KEY}`
const YEARLY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=&outputsize=full&apikey=${API_KEY}`
const YEARLYC_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=&apikey=${API_KEY}`
const MONTHLY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=&apikey=${API_KEY}`;

module.exports = {
    API_KEY,
    SEARCH_URL,
    INDAY_URL,
    DAILY_URL,
    YEARLY_URL,
    YEARLYC_URL,
    MONTHLY_URL
}