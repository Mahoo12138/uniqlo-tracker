import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import { getAllAddress } from './api'

const getAreaId = async (city: string, district: string) => {
    const { data: allAddress } = await getAllAddress()
    let address = allAddress.find(addr => addr.name.includes(district))
    if (!address) {
        address = allAddress.find(addr => addr.name.includes(city))
    }
    if (!address) {
        throw new Error("Invalid address config")
    }
    return address.value;
}

export const loadConfig = async () => {
    const configPath = path.resolve(__dirname, '../config.yml')
    if (!fs.existsSync(configPath)) {
        throw new Error("Config file is not found")
    }
    const file = fs.readFileSync(configPath, 'utf8')
    const config = YAML.parse(file)
    if (!config.areaId) {
        if (config.city && config.district) {
            config.areaId = await getAreaId(config.city, config.district)
            fs.writeFileSync(configPath, YAML.stringify(config))
        } else {
            throw new Error("Address Info is invalid")
        }
    }
    return config;
}
