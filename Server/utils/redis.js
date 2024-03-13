
import { Redis } from "ioredis";
import dotenv from "dotenv"
dotenv.config()

const redisClint = () => {
    if(process.env.REDIS_URI){
        console.log("REDIS connected true ")
        return process.env.REDIS_URI
    }
    throw new Error("REDIS connection failed")
}

export const redis = new Redis(redisClint())