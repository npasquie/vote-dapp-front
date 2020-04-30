import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

const getWeb3 = () =>
    new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
           const privateKey = "PASTE KEY HERE";
           const httpProvider = "PASTE URL HERE";
           const provider = new HDWalletProvider(
               privateKey,httpProvider);
            const web3 = new Web3(provider);
            resolve(web3);
        });
    });

export default getWeb3;
