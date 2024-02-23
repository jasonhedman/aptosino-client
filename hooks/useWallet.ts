import { useToast } from "@chakra-ui/react";

import {InputTransactionData, useWallet as useWalletAdapter} from "@aptos-labs/wallet-adapter-react";

import { useAptos } from "@/contexts/AptosContext";

interface ToastMessage {
    title: string;
    description: string;
}

const useWallet = () => {

    const { client, updateClient } = useAptos();

    const { 
        account, 
        connected, 
        wallets, 
        wallet, 
        network,
        connect, 
        disconnect, 
        signAndSubmitTransaction
    } = useWalletAdapter();

    const toast = useToast();

    const submitTransaction = async (transaction: InputTransactionData, toastMessage: ToastMessage): Promise<boolean> => {
        return signAndSubmitTransaction(transaction)
            .then(async (res) => {
                if(res.success){
                    await updateClient();
                    toast({
                        title: toastMessage.title,
                        description: toastMessage.description,
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    return true;
                } else {
                    toast({
                        title: "Transaction failed",
                        description: "Transaction failed",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return false;
                }
            })
            .catch((e) => {
                console.error(e);
                toast({
                    title: "Transaction Failed",
                    description: e.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return false
            })
    }

    return {
        address: account?.address?.toString() || "",
        connected,
        wallets,
        wallet,
        network,
        connect,
        disconnect,
        submitTransaction
    }
}

export default useWallet