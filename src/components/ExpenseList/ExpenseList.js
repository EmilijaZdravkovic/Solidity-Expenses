import React, { useState, useEffect } from 'react';
import ExpenseDetailsModal from '../ExpenseDetailsModal/ExpenseDetailsModal.js';
import ExpensesABI from '../../contracts/Expenses.json';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import './ExpenseList.css'

const ExpenseList = ({ web3, account, expensesAddress }) => {
  const [expenses, setExpenses] = useState([]); 
  const [selectedExpense, setSelectedExpense] = useState(null);
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

  const openDetailsModal = (expense) => {
    setSelectedExpense(expense);
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    return sortAscending ? parseFloat(a.amount) - parseFloat(b.amount) : parseFloat(b.amount) - parseFloat(a.amount);
  });

  return (
    <div className='expenses-list'>
      <button className="sort-button" onClick={() => setSortAscending(!sortAscending)}>Sort by Price</button> 
      {sortedExpenses.map((expense, index) => (
        <div className='expenses-list-item' key={index}>
          <p>{expense.amount.toString()}</p>
          <p>{expense.date}</p>
          <p>{expense.category}</p>
          <p>{expense.description}</p>
          <div>
            <AiOutlineEdit className='icon' onClick={() => openDetailsModal(expense)}></AiOutlineEdit>
          </div>
          {selectedExpense  && <ExpenseDetailsModal web3={web3} account={account} expensesAddress={expensesAddress} expense={selectedExpense} onClose={() => setSelectedExpense(null)} />}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
