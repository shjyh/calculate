import { createContext, createElement, useContext, ReactNode } from "react";

export default function createStore<T>(useValue: () => T) {
    const StoreContext = createContext<T>(null);

    return {
        Provider({ children }: { children: ReactNode }) {
            const value = useValue();
            
            return createElement(StoreContext.Provider, {
                value
            }, children);
        },
        useStore() {
            return useContext(StoreContext);
        }
    }
}