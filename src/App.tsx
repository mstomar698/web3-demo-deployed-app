import React, { useState, useEffect } from "react";
import { useMetamask } from "use-metamask";
import { web3, contract } from "./web3";

function App() {
  const { connect, getAccounts, getBalance } = useMetamask();
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchAccount() {
      const accounts = await getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }

    async function fetchBalance() {
      const bal = await getBalance();
      if (bal) {
        setBalance(web3.utils.fromWei(bal, "ether"));
      }
    }

    async function fetchRegistered() {
      const reg = await contract.methods.isAuthenticated(account).call();
      setRegistered(reg);
    }

    fetchAccount();
    fetchBalance();
    fetchRegistered();
  }, [getAccounts, getBalance, account]);

  async function handleRegister() {
    await contract.methods.register().send({ from: account });
    setRegistered(true);
  }

  async function handleUnregister() {
    await contract.methods.unregister().send({ from: account });
    setRegistered(false);
  }

  return (
    <div className="App">
      <h1>Web3, React and Solidity Demo App</h1>
      <p>This app demonstrates how to use MetaMask for authentication and interact with a smart contract deployed on the Goerli network.</p>
      <button onClick={connect}>Connect to MetaMask</button>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
      <p>Registered: {registered ? "Yes" : "No"}</p>
      <button onClick={handleRegister} disabled={registered}>Register</button>
      <button onClick={handleUnregister} disabled={!registered}>Unregister</button>
    </div>
  );
}

export default App;
