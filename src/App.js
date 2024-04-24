import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
// import ExpenseTable from './components/ExpenseTable';

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [salary, setSalary] = useState(""); // State for salary

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = JSON.parse(localStorage.getItem('expenseData')) || [];
    setExpenseData(storedData);
  }, []); // Empty dependency array to only run the effect once on mount

  const addExpense = (newExpense) => {
    setExpenseData((prevData) => {
      const newData = [...prevData, newExpense];
      localStorage.setItem('expenseData', JSON.stringify(newData));
      return newData;
    });
  };

  const deleteExpense = (id) => {
    setExpenseData((prevData) => {
      const newData = prevData.filter((expense) => expense.id !== id);
      localStorage.setItem('expenseData', JSON.stringify(newData));
      return newData;
    });
  };

  // Function to handle salary change
  const handleSetSalary = (newSalary) => {
    setSalary(newSalary);
  };

  return (
    <div className="App">
      <ExpenseForm onAddExpense={addExpense} onSetSalary={handleSetSalary} />
      {/* <ExpenseTable expenseData={expenseData} onDeleteExpense={deleteExpense} salary={salary} /> */}
    </div>
  );
}

export default App;
