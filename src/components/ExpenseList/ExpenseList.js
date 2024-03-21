import React, { useState, useEffect } from 'react';
import ExpenseModal from '../ExpenseDetailsModal/ExpenseDetailsModal.js';
import ExpensesABI from '../../contracts/Expenses.json';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import './ExpenseList.css'

const ExpenseList = ({ web3, account, expensesAddress }) => {
  const [expenses, setExpenses] = useState([]); 
  const [selectedExpense, setSelectedExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      const contract = new web3.eth.Contract(
        ExpensesABI.abi,
        expensesAddress,
      );
  
      const expensesFromContract = await contract.methods.getAllExpenses().call();
      console.log(expensesFromContract);
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
  
  {/*       <AiOutlineDelete className='icon' onClick={() => handleCancellation(index)}></AiOutlineDelete>
        <AiOutlineEdit className='icon' onClick={() => handleEdit(index, item)}></AiOutlineEdit> */}

    return (
      <div className='expenses-list'>
        {expenses.map((expense, index) => (
          <div className='expenses-list-item' key={index}>
            <h3>{expense.amount}</h3>
            <p>{expense.date}</p>
            <p>{expense.category}</p>
            <p>{expense.description}</p>
            <div>
            <AiOutlineEdit className='icon' onClick={() => openDetailsModal(expenses)}></AiOutlineEdit>
            </div>
          </div>
        ))}
        {selectedExpense  && <ExpenseModal web3={web3} account={account} expense={selectedExpense} onClose={() => setSelectedExpense(null)} />}
      </div>
    );
  };

export default ExpenseList;
