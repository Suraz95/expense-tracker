import React, { useState, useEffect, useRef } from 'react';

const ExpenseTable = ({ expenseData, onDeleteExpense, month }) => {
  // State variables for salary and savings
  const [salary, setSalary] = useState(0);
  const [savings, setSavings] = useState(0);
  const sal = useRef();

  // Calculate total expenses for the month
  const totalExpenses = expenseData.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.toLocaleString('default', { month: 'long' });
    return (expenseMonth === month) ? total + parseInt(expense.amount) : total;
  }, 0);

  // Calculate savings for the month
  const calculatedSavings = salary - totalExpenses;
  const savingsForMonth = isNaN(calculatedSavings) ? 0 : calculatedSavings;

  // Function to calculate salary and savings
  const calculateSavings = () => {
    const storedData = JSON.parse(localStorage.getItem('expensedata')) || {};
    const parsedSalary = storedData.salary ? parseFloat(storedData.salary) : 0;
    setSalary(parsedSalary);

    const calculatedSavings = parsedSalary - totalExpenses;
    setSavings(isNaN(calculatedSavings) ? 0 : calculatedSavings);
  };

  // Update salary and savings when expenseData or month changes
  useEffect(() => {
    calculateSavings();
  }, [expenseData, month]);

  // Render each expense item for the month in the table
  const renderExpenseItems = () => {
    return expenseData.map((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = expenseDate.toLocaleString('default', { month: 'long' });
      if (expenseMonth === month) {
        return (
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
        );
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Table - {month}</h2>
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
            <td>{savingsForMonth}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseTable;
