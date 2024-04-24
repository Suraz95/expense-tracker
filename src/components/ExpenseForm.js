import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Expense.css'; // Import your custom CSS file

const ExpenseTracker = () => {
  // Define options for months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // State to store expenses for each month, including salary
  const [expenses, setExpenses] = useState({});

  // State to store user input for new expense, including salary
  const [newExpense, setNewExpense] = useState({
    month: '',
    date: '',
    amount: '',
    category: '',
    description: '',
    salary: ''
  });

  // Function to handle user input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { month, date, amount, category, description, salary } = newExpense;
    
    // Check if the month exists in expenses, if not, create an empty array
    setExpenses(prevExpenses => ({
      ...prevExpenses,
      [month]: {
        expenses: [...(prevExpenses[month]?.expenses || []), { date, amount, category, description }],
        salary: salary || prevExpenses[month]?.salary // If salary is not provided, use previous salary value
      }
    }));
    
    // Clear the form after submission
    setNewExpense({
      month: '',
      date: '',
      amount: '',
      category: '',
      description: '',
      salary: ''
    });
  };

  // Function to handle month change
  const handleMonthChange = (e) => {
    const { value } = e.target;
    // Set the salary input field value based on the selected month's salary
    setNewExpense({ ...newExpense, month: value, salary: expenses[value]?.salary || '' });
  };

  // Function to calculate savings for each month
  const calculateSavings = (monthExpenses, salary) => {
    const totalExpenses = monthExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    return isNaN(salary) ? '-' : (salary - totalExpenses).toFixed(2);
  };

  // Function to calculate total savings
  const calculateTotalSavings = () => {
    let total = 0;
    Object.values(expenses).forEach(({ expenses, salary }) => {
      const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      total += isNaN(salary) ? 0 : salary - totalExpenses;
    });
    return total.toFixed(2);
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <select className="form-select" name="month" value={newExpense.month} onChange={handleMonthChange}>
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input type="date" className="form-control" name="date" value={newExpense.date} onChange={handleInputChange} placeholder="Date" />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" name="salary" value={newExpense.salary} onChange={handleInputChange} placeholder="Salary" />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" name="amount" value={newExpense.amount} onChange={handleInputChange} placeholder="Amount" />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="category" value={newExpense.category} onChange={handleInputChange} placeholder="Category" />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" name="description" value={newExpense.description} onChange={handleInputChange} placeholder="Description" />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
      
      {/* Display expenses for each month */}
      {Object.entries(expenses).map(([month, { expenses: monthExpenses, salary }]) => (
        <div key={month}>
          <h3 className="mt-5">{month}</h3>
          <p>Salary: {isNaN(salary) ? '-' : salary}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {monthExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Savings: {calculateSavings(monthExpenses, salary)}</p>
        </div>
      ))}
      
      {/* Display total savings */}
      <div>
        <h3 className="mt-5">Total Savings</h3>
        <p>{calculateTotalSavings()}</p>
      </div>
    </div>
  );
};

export default ExpenseTracker;
