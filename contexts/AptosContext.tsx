import { createContext, ReactNode, FC, useContext, useState, useEffect, useCallback } from "react"

import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { Aptos } from "@aptos-labs/ts-sdk";
import {getAptosClient} from "@/services/aptosClient";

interface ContextType {
    client: Aptos;

    updateClient: () => Promise<void>;
}



export const AptosContext = createContext<ContextType>({
    client: getAptosClient(),
    updateClient: async () => {}
});

export const useAptos = () => useContext(AptosContext);

interface AptosContextProps {
    children: ReactNode;
}

export const AptosProvider : FC<AptosContextProps> = ({ children }) => {

    const { network: networkInfo } = useWallet();


    const updateClient = useCallback(async () => {
        setClient(getAptosClient());
    }, []);

    useEffect(() => {
        updateClient();
    }, [networkInfo, updateClient]);


    const [client, setClient] = useState<Aptos>(getAptosClient());
 
    return (
        
        <AptosContext.Provider
            value={{
                client,
                updateClient
            }}
        >
            {children}
        </AptosContext.Provider>
    )
}