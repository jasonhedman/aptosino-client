import {Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.RANDOMNET });

export const getAptosClient = () => new Aptos(config);