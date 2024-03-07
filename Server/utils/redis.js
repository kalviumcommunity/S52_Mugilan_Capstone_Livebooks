
import { Redis } from "ioredis";
require('dotenv').config()

const redisClint = () => {
    if(process.env.REDIS_URI){
        console.log("redis connected ")
        return process.env.REDIS_URI
    }
    throw new Error("REDIS connection failed")
}

export const redis = new Redis(redisClint())