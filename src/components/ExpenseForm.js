import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Expense.css"

const ExpenseForm = ({ onAddExpense }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState(""); // New state for salary input
  const [formValid, setFormValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!date || !amount || !selectedCategory || !description || !salary) {
      setFormValid(false);
      return;
    }
  
    const expense = {
      id: Math.random(),
      date,
      amount,
      selectedCategory,
      description,
      salary, // Include salary in expense object
    };
  
    onAddExpense(expense);
  
    setDate("");
    setAmount("");
    setSelectedCategory("");
    setDescription("");
    // setSalary(""); // Clear salary input value
    setFormValid(true);
  };
  

  return (
    <div className="gradient-background">
    <div className="container mt-5 ">
      <h2 className="text-center mb-4">Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Enter your Monthly salary:
          </label>
          <input
            onChange={(e) => {
              setSalary(e.target.value);
            }}
            value={salary}
            type="number"
            min={1}
            className="form-control"
            id="salary"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date of Purchase:
          </label>
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
            className="form-control"
            id="date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            min={1}
            className="form-control"
            id="amount"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="form-control"
            id="category"
          >
            <option value="">Select a category</option>
            <option value="Bills & Utilities">Bills & Utilities</option>
            <option value="Dining">Dining</option>
            <option value="Retail Purchase">Retail Purchase</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="Enter description..."
            className="form-control"
            id="description"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        {!formValid && (
          <p className="alert alert-danger mt-3">Please fill out all fields.</p>
        )}
      </form>
    </div>
    </div>
  );
};

export default ExpenseForm;