import axios from "axios";

export const Api = {

    getCurrencyData () {
        return axios.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`);
    },
};