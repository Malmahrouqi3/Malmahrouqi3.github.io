import React, { createContext, useContext, useState, ReactNode, PropsWithChildren } from 'react';

interface LoadingContextType {
    isLoaded: boolean;
    setLoaded: (v: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoaded: false,
    setLoaded: () => { }
});

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoaded, setLoaded: setIsLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
