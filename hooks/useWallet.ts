import { useToast } from "@chakra-ui/react";

import {InputTransactionData, useWallet as useWalletAdapter} from "../wallet-adapter/wallet-adapter-react";

import { useAptos } from "@/contexts/AptosContext";

interface ToastMessage {
    title: string;
    description: string;
}

const useWallet = () => {

    const { updateClient } = useAptos();

    const { 
        account, 
        connected, 
        wallets, 
        wallet, 
        network,
        connect, 
        disconnect, 
        signAndSubmitTransaction,
    } = useWalletAdapter();

    const toast = useToast();

    const submitTransaction = async (transaction: InputTransactionData, toastMessage?: ToastMessage) => {
        return signAndSubmitTransaction(transaction)
            .then(async (res) => {
                if(res.success){
                    await updateClient();
                    if(toastMessage) {
                        toast({
                            title: toastMessage.title,
                            description: toastMessage.description,
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                    return res;
                } else {
                    toast({
                        title: "Transaction failed",
                        description: "Transaction failed",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return null;
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
                return null
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