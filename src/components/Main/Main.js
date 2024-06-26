import React, { useState, useEffect } from 'react';
import ExpenseList from '../ExpenseList/ExpenseList.js'; 
import CreateExpenseModal from '../CreateExpenseModal/CreateExpenseModal.js'; 
import Web3 from 'web3';
import './Main.css';
const expensesAddress = "0x03DBa9862599a7f52506f744fFEFdb82D2AB2BA7";
const sepoliaRPCUrl = "https://sepolia.infura.io/v3/c15405c891f649b7be2fd974e73c3a3d";

const Main = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log("Connected to Ethereum account: ", accounts[0]);
        window.ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0]);
          console.log("Switched to account: ", newAccounts[0]);
        });
      } else {
        console.log("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  };
  

  useEffect(() => {
    const web3Instance = new Web3(sepoliaRPCUrl);
    console.log(web3Instance);
    setWeb3(web3Instance);
    connectWallet();
    console.log("Web3 instance set up: ", web3);
  }, []);

  return (
    <div className="main-container">
      {!account && (
        <button onClick={connectWallet}>
          Connect with MetaMask
        </button>
      )}
      <h1>My expenses</h1>
      {showCreateModal && (
        <CreateExpenseModal className="create-expense-modal" web3={web3} account={account} onClose={() => setShowCreateModal(false)} expensesAddress = {expensesAddress}/>
      )}
      <ExpenseList className="expense-list" web3={web3} account={account} expensesAddress={expensesAddress}/>
      <button className="create-expense-button" onClick={() => setShowCreateModal(true)}>
        Add expense
      </button>
      
    </div>
  );
}

export default Main;