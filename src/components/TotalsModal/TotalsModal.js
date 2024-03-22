import React, { useState, useEffect } from 'react';
import expensesABI from '../../contracts/Expenses.json';
import './TotalsModal.css';

const TotalsModal = ({ web3, onClose, expensesAddress }) => {

    const [totals, setTotals] = useState({
      Food: 0,
      Car: 0,
      Home: 0,
      Fun: 0
    });
  
    useEffect(() => {
      const handleGetAllTotals = async () => {
        try {
          const expenseAnalyzer = new web3.eth.Contract(expensesABI.abi, expensesAddress);
          const foodTotal = await expenseAnalyzer.methods.getTotalExpensePerCategory('Food').call();
          const carTotal = await expenseAnalyzer.methods.getTotalExpensePerCategory('Car').call();
          const homeTotal = await expenseAnalyzer.methods.getTotalExpensePerCategory('Home').call();
          const funTotal = await expenseAnalyzer.methods.getTotalExpensePerCategory('Fun').call();
          setTotals({
            Food: foodTotal,
            Car: carTotal,
            Home: homeTotal,
            Fun: funTotal
          });
        } catch (error) {
          console.error("Error getting total expenses:", error);
        }
      };
      
      handleGetAllTotals();
    }, [web3, expensesAddress]);
  
    return (
      <div className="expense-analysis-modal">
        <h2>TOTALS BY CATEGORY</h2>
        <div>
          <p>Food: {Number(totals.Food)} RSD</p>
          <p>Home: {Number(totals.Home)} RSD</p>
          <p>Car: {Number(totals.Car)} RSD</p>
          <p>Fun: {Number(totals.Fun)} RSD</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    );
};

export default TotalsModal;
