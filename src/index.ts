import { getNearStores, getStoreProducts } from "./api";
import { loadConfig } from "./config";
import * as shell from 'shelljs'

loadConfig().then(async config => {
    const { data: { resp: stores } } = await getNearStores(config.areaId, config.latitude, config.longitude)

    let count = 0
    for (let i = 0; i < stores.length; i++) {
        const { data: { resp: goods } } = await getStoreProducts(stores[i].code)
        const realGoods = goods[1]
        realGoods.forEach(good => {
            if (good.priceColor === 'red') count++
        })
    }
    console.log(`附近 ${stores.length} 家优衣库营业，共有 ${count} 件促销品！`)
    shell
    .exec(`termux-notification -t ${"优衣库消息推送"}  -c "附近 ${stores.length} 家门店营业，共有 ${count} 件促销品！"`
      , { async: true }
    );
})