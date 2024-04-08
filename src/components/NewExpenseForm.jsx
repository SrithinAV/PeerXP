
import React, { useState, useEffect } from 'react';
import '../styles/NewExpenseForm.css';
const NewExpenseForm = ({ createdBy, onSubmit, onCancel, expense, title }) => {
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  
 
  useEffect(() => {
    if (expense) {
      setName(expense.name);
      setCategory(expense.category);
      setDate(expense.date);
      setAmount(expense.amount);
      setDescription(expense.description);
      setUpdatedAt(expense.updatedAt);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date || !category || !description || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert('Amount must be a positive number.');
      return;
    }
    const newExpense = {
      name,
      date,
      category,
      description,
      amount: parseFloat(amount),
      createdBy,
      updatedAt
    };
    onSubmit(newExpense);
    clearForm(); // Clear form fields after submission
  };

  const clearForm = () => {
    setName('');
    setDate('');
    setCategory('');
    setDescription('');
    setAmount('');
    setUpdatedAt('');
  };

  const handleCancel = (e) => {
    e.preventDefault(); // Prevent form submission
    clearForm(); // Clear form fields
    onCancel(); // Trigger cancel action
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{title}</h2><br></br>
      <h4>Name</h4>
      <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name The Expense" />
      <h4>Discription</h4>
      <input className="form-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe The Expense" />
      <h4>Category</h4>
      
      {/* Dropdown for category */}
      <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category (drop down) </option>
        <option value="Health">Health</option>
        <option value="Electronics">Electronics</option>
        <option value="Travel">Travel</option>
        <option value="Education">Education</option>
        <option value="Books">Books</option>
        <option value="Others">Others</option>
      </select>
     <h4>Date of Expense</h4>
     <input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date of Expense (date picker)" />
     <h4>Expense Amount</h4>
      <input className="form-input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Expense Amount in INR" />
      <div className="button-container">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="form-submit">Create Expense</button>
      </div>
    </form>
  );
};

export default NewExpenseForm;
