import { Api } from "../api/api";

const SET_CURRENCY_DATA = 'SET_CURRENCY_DATA';

// let data = [
//     { "ccy": "USD", "base_ccy": "UAH", "buy": "26.15000", "sale": "26.55000" },
//     { "ccy": "EUR", "base_ccy": "UAH", "buy": "30.10000", "sale": "30.70000" },
//     { "ccy": "RUR", "base_ccy": "UAH", "buy": "0.35000", "sale": "0.38000" },
//     { "ccy": "BTC", "base_ccy": "USD", "buy": "56527.1280", "sale": "62477.3520" }
// ];

// const currencyData = () => {
//     data.reduce((acc, item) => {
//         return [
//             ...acc,
//             {
//                 currency: `${item.base_ccy} / ${item.ccy}`,
//                 buy: Math.floor(item.buy * 100) / 100,
//                 sale: Math.floor(item.sale * 100) / 100,
//             }
//         ]
//     }, [])
// }
// // state data
// let currencyData = data.reduce((result, item) => {
//     return {
//         ...result,
//         [`${item.ccy} / ${item.base_ccy}`]: item,
//     }
// }, {})

// console.log(JSON.stringify(currencyData, null, 2))

let initialState = {
    currencyData: [
        // [
        //     {
        //       "currency": "UAH / USD",
        //       "buy": 26.15,
        //       "sale": 26.55
        //     },
        //     {
        //       "currency": "UAH / EUR",
        //       "buy": 30.1,
        //       "sale": 30.7
        //     },
        //     {
        //       "currency": "UAH / RUR",
        //       "buy": 0.35,
        //       "sale": 0.38
        //     },
        //     {
        //       "currency": "USD / BTC",
        //       "buy": 58398.18,
        //       "sale": 64545.35
        //     }
        //   ]
    ],
};


const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCY_DATA: {
            return ({
                ...state,
                currencyData: action.currencyData
            })
        }
        default: return state;
    }

}
//actions

export const setCurrencyData = (currencyData) => {
    return { type: SET_CURRENCY_DATA, currencyData }
}

//thunks
export const getCurrencyData = () => async (dispatch) => {
    const response = await Api.getCurrencyData();
    const currencyData = response.data.reduce((acc, item) => {
        return [
            ...acc,
            {
                currency: `${item.base_ccy} / ${item.ccy}`,
                buy: Math.floor(item.buy * 100) / 100,
                sale: Math.floor(item.sale * 100) / 100,
            }
        ]
    }, [])
    dispatch(setCurrencyData(currencyData));
}

export default mainPageReducer;