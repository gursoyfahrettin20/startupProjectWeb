import { useReducer, useEffect } from "react";
import { authReducer, AuthContext, AuthDispatchContext } from "./context";
import { loadAuthState, storeAuthState } from "./localStorage";


export function AuthenticationContex({ children }) {
    const [authState, dispatch] = useReducer(authReducer, loadAuthState());

    useEffect(() => {
        storeAuthState(authState);
    }, [authState]);

    return (
        <AuthContext.Provider value={authState}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}
