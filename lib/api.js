"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAddress = exports.getStoreProducts = exports.getNearStores = void 0;
const axios_1 = __importDefault(require("axios"));
const getNearStores = (areaId, latitude, longitude) => {
    return axios_1.default.post('https://i.uniqlo.cn/hmall-store-service/i/site/stock/mobile/queryOthers/zh_CN', {
        areaId,
        type: "4",
        oriLatitude: latitude,
        oriLongitude: longitude
    });
};
exports.getNearStores = getNearStores;
const getStoreProducts = (storeCode) => {
    return axios_1.default.post('https://i.uniqlo.cn/hmall-sc-service/search/searchWithConditions4StoreOnly', {
        pageInfo: { page: 1, pageSize: 16 },
        color: [],
        size: [],
        sex: [],
        rank: "priceAsc",
        priceRange: { low: 0, high: 0 },
        storeCode,
    });
};
exports.getStoreProducts = getStoreProducts;
const getAllAddress = () => {
    return axios_1.default.get("https://www.uniqlo.cn/data/zh_CN/address-all.json");
};
exports.getAllAddress = getAllAddress;
