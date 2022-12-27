"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
const api_1 = require("./api");
const getAreaId = (city, district) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: allAddress } = yield (0, api_1.getAllAddress)();
    let address = allAddress.find(addr => addr.name.includes(district));
    if (!address) {
        address = allAddress.find(addr => addr.name.includes(city));
    }
    if (!address) {
        throw new Error("Invalid address config");
    }
    return address.value;
});
const loadConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const configPath = path_1.default.resolve(__dirname, '../config.yml');
    if (!fs_1.default.existsSync(configPath)) {
        throw new Error("Config file is not found");
    }
    const file = fs_1.default.readFileSync(configPath, 'utf8');
    const config = yaml_1.default.parse(file);
    if (!config.areaId) {
        if (config.city && config.district) {
            config.areaId = yield getAreaId(config.city, config.district);
        }
        else {
            throw new Error("Address Info is invalid");
        }
    }
    return config;
});
exports.loadConfig = loadConfig;
