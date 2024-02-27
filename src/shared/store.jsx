import { useReducer, useEffect } from "react";
import { propsReducer, PropsContext, PropsDispatchContext } from "./context";
import { loadAuthState, storeAuthState } from "./localStorage";


export function AuthenticationContext({ children }) {
    const [propsState, dispatch] = useReducer(propsReducer, loadAuthState());

    useEffect(() => {
        storeAuthState(propsState);
    }, [propsState]);

    return (
        <PropsContext.Provider value={propsState}>
            <PropsDispatchContext.Provider value={dispatch}>
                {children}
            </PropsDispatchContext.Provider>
        </PropsContext.Provider>
    );
}
