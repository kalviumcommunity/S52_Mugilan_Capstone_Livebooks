import { redirect } from "react-router-dom";
import userAuth from "./userAuth";
export default function Protected({children}){
    const isAuthenticated = userAuth()

    return isAuthenticated ? children:redirect('/')
    
}