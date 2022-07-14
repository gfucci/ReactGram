import { api } from "../utils/config";
import { requestConfig } from "../utils/config";

// register an user
const register = async (data) => {

    const config = requestConfig("POST", data)

    try { 
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

//login an user
const login = async (data) => {

    const config = requestConfig("POST", data)

    try {
        
        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
    } catch (error) {
        console.log(error)
    }
}

//logout an user
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    login,
    logout
}

export default authService 