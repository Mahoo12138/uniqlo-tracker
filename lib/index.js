"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const config_1 = require("./config");
const shell = __importStar(require("shelljs"));
(0, config_1.loadConfig)().then((config) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { resp: stores } } = yield (0, api_1.getNearStores)(config.areaId, config.latitude, config.longitude);
    let count = 0;
    for (let i = 0; i < stores.length; i++) {
        const { data: { resp: goods } } = yield (0, api_1.getStoreProducts)(stores[i].code);
        const realGoods = goods[1];
        realGoods.forEach(good => {
            if (good.priceColor === 'red')
                count++;
        });
    }
    console.log(`附近 ${stores.length} 家优衣库营业，共有 ${count} 件促销品！`);
    shell
        .exec(`termux-notification -t ${"优衣库消息推送"}  -c "附近 ${stores.length} 家门店营业，共有 ${count} 件促销品！"`, { async: true });
}));
