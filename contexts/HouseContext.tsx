import { createContext, ReactNode, FC, useContext } from "react"

import { toAptos } from "@/services/utils";

import useViewFunction from "@/hooks/useViewFunction";

import {
    feeBasisPointsViewPayload,
    maxBetViewPayload,
    maxMultiplierViewPayload,
    minBetViewPayload
} from "@/config/modules/houseModule";

interface HouseContextType {
    loading: boolean,
    minBet: number,
    maxBet: number,
    maxMultiplier: number,
    feeBasisPoints: number,
}

export const HouseContext = createContext<HouseContextType>({
    loading: true,
    minBet: 0,
    maxBet: 0,
    maxMultiplier: 0,
    feeBasisPoints: 0,
});

export const useHouse = () => useContext(HouseContext);

interface HouseContextProps {
    children: ReactNode;
}

export const HouseProvider : FC<HouseContextProps> = ({ children }) => {

    const {returnValue: minBet, loading: minBetLoading} = useViewFunction(minBetViewPayload);
    const {returnValue: maxBet, loading: maxBetLoading} = useViewFunction(maxBetViewPayload);
    const {returnValue: maxMultiplier, loading: maxMultiplierLoading} = useViewFunction(maxMultiplierViewPayload);
    const {returnValue: feeBasisPoints, loading: feeBasisPointsLoading} = useViewFunction(feeBasisPointsViewPayload);

    return (
        <HouseContext.Provider
            value={{
                loading: minBetLoading || maxBetLoading || maxMultiplierLoading || feeBasisPointsLoading,
                minBet: toAptos(parseInt(minBet ? minBet[0] as string : "0")),
                maxBet: toAptos(parseInt(maxBet ? maxBet[0] as string : "0")),
                maxMultiplier: (maxMultiplier ? maxMultiplier[0] : 0) as number,
                feeBasisPoints: (feeBasisPoints ? feeBasisPoints[0] : 0) as number,
            }}
        >
            {children}
        </HouseContext.Provider>
    )
}