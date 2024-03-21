import React, { useState } from 'react';
import expensesABI from '../../contracts/Expenses.json';
import './TotalsModal.css';

const TotalsModal = ({ web3, account, onClose, expensesAddress }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [totalExpense, setTotalExpense] = useState(0);
  
    const handleGetTotalExpense = async () => {
      try {
        const expenseAnalyzer = new web3.eth.Contract(expensesABI.abi, expensesAddress);
        console.log(selectedCategory);
        const total = await expenseAnalyzer.methods.getTotalExpensePerCategory(selectedCategory).call();
        setTotalExpense(total);
        
      } catch (error) {
        console.error("Error getting total expense:", error);
      }
    };
  
    return (
      <div className="expense-analysis-modal">
        <h2 className="modal-title">Expense Analysis</h2>
        <select className="category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Choose category</option>
          <option value="Food">Food</option>
          <option value="Car">Car</option>
          <option value="Home">Home</option>
          <option value="Fun">Fun</option>
        </select>
        <button className="get-total-button" onClick={handleGetTotalExpense}>Get Total Expense</button>
        
        {Number(totalExpense) > 0 ? (
          <p className="total-expense-info">Total expense for {selectedCategory} is {Number(totalExpense)} RSD</p>
        ) : (
          <p className="total-expense-info">Total expense for {selectedCategory} is 0 RSD</p>
        )}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default TotalsModal;
  