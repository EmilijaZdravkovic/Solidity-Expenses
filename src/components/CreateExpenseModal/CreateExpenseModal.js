import React, { useState } from 'react';
import ExpensesABI from '../../contracts/Expenses.json';
import './CreateExpenseModal.css'

const categories = ["Food", "Home", "Car", "Fun"];

const CreateExpenseModal = ({ onClose, web3, account, expensesAddress}) => {
  const [expenseData, setExpenseData] = useState({
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
      console.log('MetaMask is not installed or not connected!');
      return;
    }
    if (!web3 || !account) {
      alert("Web3 instance or account is not available.");
      return;
    }
    try {
      const contract = new web3.eth.Contract(ExpensesABI.abi, expensesAddress);
  
      const transactionParameters = {
        to: expensesAddress,
        from: account,
        data: contract.methods.addExpense(
          expenseData.amount,
          expenseData.date,
          expenseData.category,
          expenseData.description
        ).encodeABI() // call to contract method
      };

      // txHash is a hex string
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      console.log("Transaction Hash:", txHash);
      onClose();
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };
  
  return (
    <div className="expenses-wrapper">
      <div className="expenses-input">
        <div className='expenses-input-item'>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            placeholder='Amount spent'
          />
        </div>
        <div className='expenses-input-item'>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleChange}
            placeholder='Date of spending'
          />
        </div>
        <div className='expenses-input-item'>
          <label>Category</label>
          <select
            name="category"
            value={expenseData.category}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className='expenses-input-item'>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            placeholder='Optional description'
          />
        </div>
        <div className='expenses-input-item'>
          <button type="button" onClick={handleSubmit} className='primaryBtn'>Add</button>
          <button className="modal-button cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
  }  


export default CreateExpenseModal;