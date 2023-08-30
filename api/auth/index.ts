import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const adminSecret_key = "admins3cr3tk3yf0rjs0nw3bt0k3n"
const userSecret_key = "users3cr3tf0rjs0nw3bt0k3n"


export const admingenerateToken = (payload:object):string => {
    return jwt.sign(payload,adminSecret_key)
}

export const usergenerateToken = (payload:object):string => {
    return jwt.sign(payload,userSecret_key)
}

export const usertokenverify = async(token:string) => {
    try{
        const decoded = await jwt.verify(token,userSecret_key);
        return decoded
    }catch(error){
        console.error("error",error)
        return null
    }
}

export const admintokenverify = async(token:string) => {
    try{
        const decoded = await jwt.verify(token,adminSecret_key);
        return decoded
    }catch(error){
        console.error("error",error)
        return null
    }
}

export const verifyPassword = async(password:string,hashedPassword:string) => {
    try{
        const isMatch = await bcrypt.compare(password,hashedPassword)
        return isMatch
    }catch(error){
        console.error("Error",error)
        return false
    }   
}

// admin verification token
export const adminVerifyToken = async(req: { headers: any; },res: any,next: () => void) => {
    const token = req.headers
    try{
        const isMatch = jwt.verify(token,adminSecret_key)
        return isMatch
    }catch(error){
        console.log("Error while checking token")
        return false
    }finally{
        next()
    }
}

// user verification token
export const userVerifyToken = async(req: { headers: any; },res: any,next: () => void) => {
    const token = req.headers
    try{
        const isMatch = jwt.verify(token,userSecret_key)
        return isMatch
    }catch(error){
        console.log("Error while checking token")
        return false
    }finally{
        next()
    }
}
