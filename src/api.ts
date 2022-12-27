import axios from 'axios'

export const getNearStores = (areaId: string, latitude: string, longitude: string) => {
    return axios.post<Resp<StoreInfo>>('https://i.uniqlo.cn/hmall-store-service/i/site/stock/mobile/queryOthers/zh_CN', {
        areaId,
        type: "4",
        oriLatitude: latitude,
        oriLongitude: longitude
    })
}

export const getStoreProducts = (storeCode: string) => {
    return axios.post<Resp<GoodInfo[]>>('https://i.uniqlo.cn/hmall-sc-service/search/searchWithConditions4StoreOnly', {
        pageInfo: { page: 1, pageSize: 16 },
        color: [],
        size: [],
        sex: [],
        rank: "priceAsc",
        priceRange: { low: 0, high: 0 },
        storeCode,
    })
}

export const getAllAddress = () => {
    return axios.get<AddressItem[]>("https://www.uniqlo.cn/data/zh_CN/address-all.json")
}

interface AddressItem {
    value: string,
    name: string,
    parent?: string
}

interface Resp<T> {
    msgCode: string;
    msg: string;
    resp: T[],
    success: boolean,
}
interface StoreInfo {
    code: string,
}

interface GoodInfo {
    priceColor: "red" | "black",
}