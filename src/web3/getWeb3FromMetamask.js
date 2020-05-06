import Web3 from "web3";

const getWeb3FromMetamask = () =>
    new Promise(resolve => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener("load", async () => {
            const web3 = new Web3(window.ethereum);
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
        });
    });

export default getWeb3FromMetamask;
