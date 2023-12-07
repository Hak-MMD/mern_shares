import { apiFetch } from '../../app/api/apiSlice'; 
import { store } from '../../app/store';
import axios from 'axios';
import { setWallet } from '../user/userSlice';

// import useAuth from '../../hooks/useAuth';

const allStocks = async () => {
    return apiFetch.get('/stock/getStocks').then((response) => {
        // console.log(response.data);
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const indayData = async (code) => {
    return apiFetch.get(`/stock/inday/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const fiveData = async (code) => {
    return apiFetch.get(`/stock/fiveDays/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const oneMonth = async (code) => {
    return apiFetch.get(`/stock/daily/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const sixMonths = async (code) => {
    return apiFetch.get(`/stock/sixMonths/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const oneYear = async (code) => {
    return apiFetch.get(`/stock/monthly/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const findStock = async (key) => {
    return apiFetch.get(`/stock/search/${key}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const saveStock = async (code, name) => {
    return apiFetch.patch(`/stock/save/${code}`, { name }).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const delSavedStock = async (code) => {
    return apiFetch.patch(`/stock/delSaved/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const getSavedStock = async (code) => {
    return apiFetch.get(`/stock/getSaved/${code}`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const getFavStock = async () => {
    return apiFetch.get(`/stock/getFav`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const preSaveStock = async (code, data) => {
    const name = data.name;
    return apiFetch.post(`/stock/checkSave/${code}`, { name }).then((response) => {
        if (response.status == 200 || response.status == 201) {
            return response.data;
        } else {
            return false;
        }
    });
};

const checkStock = async (code) => {
    return apiFetch.post(`/stock/check/${code}`).then((response) => {
            if (response.status == 200) {
                return response.data;
            } else if (response.status == 204) {
                return response.data.data
            } else {
                return false;
            }
        }
    );
};

const buyStock = async (code, amount, price) => {
    return apiFetch.patch(`/stock/buy/${code}`, { amount, price }).then((response) => {
        if (response.status == 200 || response.status == 201) {
             
            return response.data;
        } else {
            return false;
        }
    });
};

const getPortfolio = async () => {
    return apiFetch.get(`/stock/getPortfolio`).then((response) => {
        return response.data
    }).catch((e) => {
        console.error(e);
    });
};

const getTransact = async (code) => {
    return apiFetch.get(`/stock/getTransact/:${code}`).then((response) => {
        if (response.status == 200) {  
            return response.data;
        } else {
            return false;
        }    
    }).catch((e) => {
        console.error(e);
    });
};

export {
    allStocks,
    indayData,
    fiveData,
    oneMonth,
    sixMonths,
    oneYear,
    findStock,
    saveStock,
    getSavedStock,
    delSavedStock,
    getFavStock,
    preSaveStock, 
    buyStock,
    checkStock,
    getPortfolio,
    getTransact
}