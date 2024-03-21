import React, { useState, useEffect } from 'react';
import ExpensesABI from '../../contracts/Expenses.json';
import './ExpenseDetailsModal.css'

const ExpenseDetailsModal = ({ expense, onClose, web3, account }) => {
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState(""); 

  const categories = ["Food", "Home", "Car", "Fun"];


  const loadExpenseDetails = async () => {
    if (web3 && expense) {
      const contract = new web3.eth.Contract(ExpensesABI.abi, expense);
      const amount = await contract.methods.getAmount().call();
      const date = await contract.methods.getDate().call();
      const category = await contract.methods.getCategory().call();
      const description = await contract.methods.getDescription().call();

      setNewAmount(amount);
      setNewDate(date);
      setNewCategory(category);
      setNewDescription(description);
    }
  };

  const handleUpdate = async () => {
    // Your update logic here
  };

  return (
    <div className='edit_wrapper'>
    <input placeholder='New amount'  value={expense.amount}></input>
    <input placeholder='New date' value={expense.date}></input>
    <select value={newCategory} >
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <input placeholder='New description' value={expense.description}></input>
    <button type='button' onClick={handleUpdate} className='primaryBtn'>Update</button>
  </div>
  );
};

export default ExpenseDetailsModal;
