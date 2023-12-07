const StockModel = require('../models/Stock');
const {INDAY_URL, SEARCH_URL, DAILY_URL, YEARLY_URL, YEARLYC_URL, MONTHLY_URL} = require('../stock_data/data');
const {adjustIndayUrl, adjustSearchUrl, searchParse, dailyParse, getEveryNth, yearlyParse, yearParse, monthlyParse, fiveDayParse, monthsParse} = require('../stock_data/StockFunctions');
const request = require('request');
const {indayParse} = require('../stock_data/StockFunctions');
const UserModel = require('../models/User');
const TransactModel = require('../models/Transaction');

const createAllStocks = async (req, res) => {
    try {
        stocks.map(async(item) => {
            await StockModel.create({...item});
        });
    } catch (error) {
        console.log(error);
    }
};

const getStocks = async (req, res) => {
    try {
        const allStocks = await StockModel.find({});


        res.json(allStocks)
    } catch (error) {
        console.log(error);
    }
};

const singleStock = async (req, res) => {
    const {code} = req.params;
    // console.log(code);
    try {
        const url = adjustIndayUrl(INDAY_URL, code);
        // console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = indayParse(body);

            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            
            res.json(result.reverse());        
        });
    } catch (error) {
        console.log(error);  
    }
};


const findStocks = async (req, res) => {
    const { key } = req.params;
    try {
        const url = adjustSearchUrl(SEARCH_URL, key);
        console.log('here', url);
        // let result;
        // request.get({
        //     url: url,
        //     json: true,
        //     headers: {'User-Agent': 'request'}
        // }, (err, res, data) => {
        //     if (err) {
        //         console.error('error:', err); // Print the error if one occurred
        //         return res.status(400).json({ message: `Search stock endpoint error! Status: ${res.statusCode} Response: ${res}` });
        //     } else {
        //         result = data['bestMatches'];
        //         return result        
        //     }
        // });
        // res.json(result)

        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Search stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }    
            const result = searchParse(body);
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            res.json(result);        
        });

    } catch (error) {
        console.log(error);
    }
};

const fiveDays = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(DAILY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = fiveDayParse(body).reverse();
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            res.json(result);    
            
        });
    } catch (error) {
        console.log(error);
    }
}

const everyDay = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(DAILY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = dailyParse(body).reverse();
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            res.json(result);    
            
        });
    } catch (error) {
        console.log(error);
    }
}

const allTime = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(YEARLY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const newArr = yearlyParse(body).reverse();
            if (newArr === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            const result = getEveryNth(newArr, 252);
            
            res.json(result);  
        });  
    } catch (error) {
        console.log(error);
    }
};

const oneYear = (req,res) => {
   const { code } = req.params;
    try {
        const url = adjustIndayUrl(YEARLYC_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = yearParse(body);
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            // const result = getEveryNth(newArr, 252);
            
            res.json(result);  
        });  
    } catch (error) {
        console.log(error);
    }
};

const fiveYears = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(YEARLY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const newArr = yearlyParse(body).reverse();
            if (newArr === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }
            const nextArr = getEveryNth(newArr, 252);
            const result = nextArr.slice(0,5);
            
            res.json(result);  
        });  
    } catch (error) {
        console.log(error);
    }
};


const monthly = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(MONTHLY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = monthlyParse(body).reverse();
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }

            // const result = nextArr.slice(0,5);
            
            res.json(result);  
        });  
    } catch (error) {
        console.log(error);
    }
};

const sixMonths = (req,res) => {
    const { code } = req.params;
    try {
        const url = adjustIndayUrl(MONTHLY_URL, code);
        console.log(url);
        request(url, function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            
            const result = monthsParse(body).reverse();
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            }

            // const result = nextArr.slice(0,5);
            
            res.json(result);  
        });  
    } catch (error) {
        console.log(error);
    }

    
};

const getFavStocks = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.email });
        console.log(user.saved.length);
        //!!!!!!!!gets all items with given ids!!!!!!
       const result = await StockModel.find({ '_id': { $in: user.saved } });

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
};

const getSavedStocks = async (req, res) => {
    const {code} = req.params;
    try {
        const user = await UserModel.findOne({ email: req.email });
        const stock = await StockModel.findOne({ code });
        if (stock && user.saved.includes(stock._id)) {
            return res.status(200).json(stock);
        } else {
            return res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
    }
};

const saveStock = async (req, res) => {
        const { code } = req.params;
        const { name } = req.body;
        try {
            const user = await UserModel.findOne({ email: req.email });
            const stock = await StockModel.findOne({ code });

            if (stock) {
                user.saved.push(stock._id);

            } 

            if (!stock) {
                const newStock = await StockModel.create({ name, code });
                user.saved.push(newStock._id);
            }


            await user.save();

            res.status(200).json(user.saved);

            // if (user && user.saved.includes(code)) {

            //     const delStock = await UserModel.findOneAndUpdate({ email: req.email }, {
            //         $pull: { saved: code  }
            //     }, { new: true });   

            //     await delStock.save();
                
            //     return res.status(200).json({ isInclude: true });
            // }

        
            // if (user && !user.saved.includes(code)) {
            //     const addStock = await UserModel.findOneAndUpdate({ email: req.email }, {
            //         $push: { saved: code }
            //     }, { new: true });   
            //     await addStock.save();
                
            //     return res.status(200).json({ isInclude: false });
            // }
       
        } catch (error) {
            console.log(error);
        }
};

const delSavedStock = async (req, res) => {
    const { code } = req.params;
    try {
        const user = await UserModel.findOne({ email: req.email });
        const stock = await StockModel.findOne({ code });

        if (stock) {
            const n = user.saved.indexOf(stock._id);

            user.saved.splice(n, 1);
        } 

        if (!stock) {
            return res.status(400).json({ message: 'Operation is not allowed! Please refresh page and try again later!' });
        }

        await user.save();

        res.status(200).json(user.saved);

        // if (user && user.saved.includes(code)) {

        //     const delStock = await UserModel.findOneAndUpdate({ email: req.email }, {
        //         $pull: { saved: code  }
        //     }, { new: true });   

        //     await delStock.save();
            
        //     return res.status(200).json({ isInclude: true });
        // }

    
        // if (user && !user.saved.includes(code)) {
        //     const addStock = await UserModel.findOneAndUpdate({ email: req.email }, {
        //         $push: { saved: code }
        //     }, { new: true });   
        //     await addStock.save();
            
        //     return res.status(200).json({ isInclude: false });
        // }       
    } catch (error) {
        console.log(error);
    }
};

const checkStock = async (req, res) => {
    const { code } = req.params;

    try {
        const stock = await StockModel.findOne({ code });
        
        if (!stock) {
            return res.status(204).json({ data: false });
        }

        res.status(200).json(stock);
    } catch (error) {
        console.log(error);
    }
};

const checkSaveStock = async (req, res) => {
    const { code } = req.params;
    const { name } = req.body;

    try {
        const stock = await StockModel.findOne({ code });
        
        if (!stock) {
            const newStock = await StockModel.create({ name, code });
            return res.status(201).json(newStock);
        }

        res.status(200).json(stock);
    } catch (error) {
        console.log(error);
    }
};

const buyShares = async (req,res) => {
    try {
        const { code } = req.params;
        const { amount, price } = req.body;

        const user = await UserModel.findOne({ email: req.email });
        const stock = await StockModel.findOne({ code });

        user.wallet = user.wallet - price * amount;
        await user.save();

        const transaction = await TransactModel.findOne({ userId: user.id, stockId: stock.id });
        if (transaction) {
            let averageSum = transaction.price * transaction.amount + price * amount;
            let averagePrice = averageSum / (transaction.amount + amount);
            transaction.amount += amount;
            transaction.price = averagePrice;
            await transaction.save();

        }

        if (!transaction) {
            const newTransact = await TransactModel.create({ userId: user.id, code: stock.code, amount, price, name: stock.name });//check this line(justify create function)!!!!
            return res.status(201).json(newTransact);

        }

        res.status(200).json({transaction, message: 'Transaction was completed successfully!'});
    } catch (error) {
        console.log(error);
    }
};


const getPortfolio = async (req, res) => {
    try {
        const portfolio = await TransactModel.find({ userId: req.userId });
         
        res.status(200).json(portfolio);
    } catch (error) {
        console.log(error);
    }
};

const getTransact = async (req, res) => {
    const { code } = req.params;
    console.log(12345);
    try {
        const url = adjustIndayUrl(DAILY_URL, code);
        console.log(url);
        request(url, async function (error, response, body) {
            if (error) {
                console.error('error:', error); // Print the error if one occurred
                return res.status(400).json({ message: `Single stock endpoint error! Status: ${response.statusCode} Response: ${response}` });
            }
            // console.log(dailyParse(body));
            
            const result = dailyParse(body);
            // console.log(result);
            if (result === null) {
                return res.status(400).json({ message: 'You can only do 5 requests in a minute! Please wait a minute and try again!' })
            } 
            
            // console.log(result);
            const obj = result.shift();
            console.log(obj);
            const transaction = await TransactModel.findOne({ userId: req.userId, code });
            
            res.status(200).json({
                userId: transaction.userId,
                name: transaction.name,
                code: transaction.code,
                amount: transaction.amount,
                price: (transaction.price).toFixed(2),
                oneProfit: (transaction.price - obj.close).toFixed(2),
                allProfit: ((transaction.price - obj.close) * transaction.amount).toFixed(2),
                newPrice: (obj.close).toFixed(2)
            });
        });
    } catch (error) {
        console.log(error);
    }
};

    


module.exports = {
    createAllStocks,
    singleStock,
    sixMonths,
    findStocks,
    fiveDays,
    everyDay,
    allTime,
    monthly,
    oneYear,
    fiveYears,
    getStocks,
    saveStock,
    getSavedStocks,
    delSavedStock,
    getFavStocks,
    buyShares,
    checkSaveStock,
    checkStock,
    getPortfolio,
    getTransact, 
}