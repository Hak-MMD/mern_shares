const adjustIndayUrl = (url, code) => {
    // console.log(url);
    const first = url.split('symbol=')[0]
    const second = url.split('symbol=')[1]
    return `${first}symbol=${code}${second}`
}

const adjustSearchUrl = (url, key) => {
    // console.log(url);
    const first = url.split('keywords=')[0]
    const second = url.split('keywords=')[1]
    return `${first}keywords=${key}${second}`
}

const indayParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Time Series (30min)'];
    console.log('this', parsedResponseFiltered);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }

    const sliced = Object.keys(parsedResponseFiltered).slice(0, 32).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        // console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0].split(' ')[1];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

const fiveDayParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Time Series (Daily)'];
    console.log(body);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const sliced = Object.keys(parsedResponseFiltered).slice(0, 5).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        // console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

const dailyParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Time Series (Daily)'];
    // console.log(body);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const sliced = Object.keys(parsedResponseFiltered).slice(0, 31).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        // console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

const monthsParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Monthly Time Series'];
    console.log(body);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const sliced = Object.keys(parsedResponseFiltered).slice(0, 6).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

const monthlyParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Monthly Time Series'];
    console.log(body);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const sliced = Object.keys(parsedResponseFiltered).slice(0, 13).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

const yearParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Time Series (Daily)'];
    console.log(body);

    if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const sliced = Object.keys(parsedResponseFiltered).slice(0, 1).reduce((result, key) => {
            result[key] = parsedResponseFiltered[key];
            return result
    }, {});

    const todaysData = Object.keys(sliced).map(function(key) {
    var ret = {};
    ret[key] = sliced[key];
    return ret;
    });

    let result = todaysData.map(item => {
        console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

}


const yearlyParse = (body) => {
    const parsedResponseFiltered = JSON.parse(body)['Time Series (Daily)'];
    console.log(body);
    // const sliced = Object.keys(parsedResponseFiltered).slice(0, 31).reduce((result, key) => {
    //         result[key] = parsedResponseFiltered[key];
    //         return result
    // }, {});
   if (parsedResponseFiltered === null || parsedResponseFiltered === undefined) {
        return null
    }
    const todaysData = Object.keys(parsedResponseFiltered).map(function(key) {
    var ret = {};
    ret[key] = parsedResponseFiltered[key];
    return ret;
    });

    let result = todaysData.map(item => {
        console.log(item);
        const valuesObj = Object.entries(item)[0][1];

        delete Object.assign(valuesObj, {open: valuesObj['1. open']})['1. open'];
        delete Object.assign(valuesObj, {high: valuesObj['2. high']})['2. high'];
        delete Object.assign(valuesObj, {low: valuesObj['3. low']})['3. low'];
        delete Object.assign(valuesObj, {close: valuesObj['4. close']})['4. close'];
        delete Object.assign(valuesObj, {volume: valuesObj['5. volume']})['5. volume'];

        const dateObj = Object.entries(item)[0][0];
        valuesObj.date = dateObj;
        return valuesObj
    });

    return result

};

function getEveryNth(arr, nth) {
  const result = [];

  for (let index = 0; index < arr.length; index += nth) {
    result.push(arr[index]);
  }

  return result;
}

const searchParse = (body) => {
     let parsed = JSON.parse(body)['bestMatches'];
    if (parsed === null || parsed === undefined) {
        return null
    }
    const toArrObject = Object.keys(parsed).map(function(key) {
        var ret = {};
        ret[key] = parsed[key];
        return ret;
    });
    const result = toArrObject.map(item => {
        const valuesObj = Object.entries(item)[0][1];
        delete Object.assign(valuesObj, {symbol: valuesObj['1. symbol']})['1. symbol'];
        delete Object.assign(valuesObj, {name: valuesObj['2. name']})['2. name'];
        const sliced = Object.keys(valuesObj).slice(7, 9).reduce((result, key) => {
            result[key] = valuesObj[key];
            return result
        }, {});

        return sliced;
    });

    return result;
};

module.exports = {adjustIndayUrl, monthsParse, fiveDayParse, monthlyParse, yearParse, adjustSearchUrl, indayParse, dailyParse, searchParse, getEveryNth, yearlyParse}

