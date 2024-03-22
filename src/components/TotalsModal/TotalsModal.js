import React, { useState } from 'react';
import expensesABI from '../../contracts/Expenses.json';
import './TotalsModal.css';

const TotalsModal = ({ web3, onClose, expensesAddress }) => {
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
        <h2>TOTALS BY CATEGORY</h2>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Category:</option>
          <option value="Food">Food</option>
          <option value="Car">Car</option>
          <option value="Home">Home</option>
          <option value="Fun">Fun</option>
        </select>
        <button onClick={handleGetTotalExpense}>Get Total Expense</button>
        

          <p>TOTAL: {Number(totalExpense)} RSD</p>

        <button  onClick={onClose}>Close</button>
      </div>
    );
  };
  
  export default TotalsModal;
  