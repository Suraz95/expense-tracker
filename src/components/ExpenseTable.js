import React, { useState, useEffect,useRef } from 'react';

const ExpenseTable = ({ expenseData, onDeleteExpense }) => {
  // State variables for salary and savings
  const [salary, setSalary] = useState(0);
  const [savings, setSavings] = useState(0);
  const sal=useRef();
  // Calculate total expenses
  const totalExpenses = expenseData.reduce((total, expense) => total + parseInt(expense.amount), 0);
  const save=expenseData.reduce((total,expense)=>parseInt(expense.salary)-totalExpenses,0);
  // Function to calculate savings
  const calculateSavings = () => {
    const storedData = JSON.parse(localStorage.getItem('expensedata')) || {};
    const parsedSalary = storedData.salary ? parseFloat(storedData.salary) : 0;
    setSalary(parsedSalary);
    
    const calculatedSavings = parsedSalary - totalExpenses;
    setSavings(isNaN(calculatedSavings) ? 0 : calculatedSavings);
  };

  // Update salary and savings when expenseData changes
  useEffect(() => {
    calculateSavings();
  }, [expenseData]);

  // Render each expense item in the table
  const renderExpenseItems = () => {
    return expenseData.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.date}</td>
        <td>{expense.amount}</td>
        <td>{expense.selectedCategory}</td>
        <td>{expense.description}</td>
        <td>{expense.salary}</td>
        <td>
          <button className="btn btn-danger" onClick={() => onDeleteExpense(expense.id)}>Delete</button>
        </td>
      </tr>
    ));
  };
 
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderExpenseItems()}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="4" className="text-end">Total Expenses:</th>
            <td>{totalExpenses}</td>
          </tr>
          <tr>
            <th colSpan="4" className="text-end">Savings:</th>
            <td>{save}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTable;
