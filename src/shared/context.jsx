import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export const authReducer = (authState, action) => {
    switch (action.type) {
        case "login-success":
            return action.data;
        case "logout-success":
            return { id: 0 }
        default:
            throw new Error(`unknown action: ${action.type}`)
    }
}

export function useAuthState() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}