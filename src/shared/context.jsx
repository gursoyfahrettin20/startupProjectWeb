import {createContext, useContext} from "react";
import {setToken} from "@/lib/http.js";

export const PropsContext = createContext();
export const PropsDispatchContext = createContext();

export const propsReducer = (props, action) => {
    switch (action.type) {
        case "login-success":
            setToken(action.data.token);
            return action.data.user;
        case "logout-success":
            setToken();
            return {id: 0}
        case "user-update-data":
            return {
                ...props,
                username: action.data.username,
                image: action.data.image
            }
        default:
            throw new Error(`unknown action: ${action.type}`)
    }
}


export function usePropState() {
    return useContext(PropsContext);
}

export function usePropDispatch() {
    return useContext(PropsDispatchContext);
}