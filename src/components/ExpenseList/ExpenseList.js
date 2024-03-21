import React, { useState, useEffect } from 'react';
import ExpensesABI from '../../contracts/Expenses.json';
import { AiOutlineDelete} from "react-icons/ai";
import './ExpenseList.css'

const ExpenseList = ({ web3, account, expensesAddress }) => {
  const [expenses, setExpenses] = useState([]); 
  const [sortAscending, setSortAscending] = useState(true);

  const loadExpenses = async () => {
    try {
      const contract = new web3.eth.Contract(
        ExpensesABI.abi,
        expensesAddress,
      );
  
      const expensesFromContract = await contract.methods.getAllExpenses().call();
      setExpenses(expensesFromContract);
    } catch (error) {
      console.error("Error while loading expense list:", error);
    }
  };

  useEffect(() => {
    if (web3) {
      loadExpenses();
    }
  }, [web3]); 



  const handleCancel = async (selectedExpense) => {
    try {
      if (web3 && account && expensesAddress && selectedExpense != null) {
        const contract = new web3.eth.Contract(ExpensesABI.abi, expensesAddress);
        const data = await contract.methods.getExpense(selectedExpense.id).call();
  
        if (data.cancelled==0) {
          window.alert("This expense has already been cancelled.");
        } else {
          const transactionParameters = {
            to: expensesAddress,
            from: account,
            data: contract.methods.cancelExpense(selectedExpense.id).encodeABI()
          };
  
          const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
  
          console.log("Transaction Hash:", txHash);
          window.location.reload(); 
        }
      }
    } catch (error) {
      console.error("Error while canceling expense:", error);
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortAscending ? parseFloat(a.amount) - parseFloat(b.amount) : parseFloat(b.amount) - parseFloat(a.amount);
  });

  return (
    <div className='expenses-list'>
      <button className="sort-button" onClick={() => setSortAscending(!sortAscending)}>Sort by Price</button> 
      <div className='expenses-list-item'>
        <p>Amount</p>
        <p>Date of expense</p>
        <p>Category</p>
        <p>Description</p>
        <p>Status</p>
        <p>EDIT</p>
      </div>
      {sortedExpenses.map((expense, index) => (
        <div className='expenses-list-item' key={index}>
          <p>{expense.amount.toString()}</p>
          <p>{expense.date}</p>
          <p>{expense.category}</p>
          <p>{expense.description}</p>
          <p>{expense.canceled ? 'Active' : 'Canceled'}</p>
          <div>
            <AiOutlineDelete className='icon' onClick={() => handleCancel(expense)}></AiOutlineDelete>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
