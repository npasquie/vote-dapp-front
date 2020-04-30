import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import config from "./config";

const getWeb3 = () =>
    new Promise(resolve => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
           const provider = new HDWalletProvider(
               config.privateKey,config.httpProvider);
            const web3 = new Web3(provider);
            resolve(web3);
        });
    });

export default getWeb3;
