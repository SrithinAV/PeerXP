import React, { useState, useEffect } from 'react';
import NewExpenseForm from './NewExpenseForm';
import '../styles/NewExpenseForm.css';
import '../styles/ExpenseTracker.css';
import '../styles/pagination.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import ConfirmationDialog from './ConfirmationDialogDelete';

const ExpenseTracker = ({ userEmail }) => {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page
  const [title, setTitle] = useState("Create New Expense");  //This is the heading of Expense form

  useEffect(() => {
    if (currentExpense) {
      setTitle("Edit Expense");
    } else {
      setTitle("Create New Expense");
    }
  }, [currentExpense]);

  const handleAddExpense = (newExpense) => {
    if (currentExpense) {
      const updatedExpenses = expenses.map((expense) =>
        expense === currentExpense ? { ...newExpense, updatedAt: new Date() } : expense
      );
      setExpenses(updatedExpenses);
    } else {
      setExpenses([...expenses, { ...newExpense, updatedAt: new Date() }]);
    }
    setIsFormOpen(false);
    setCurrentExpense(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setCurrentExpense(null);
  };

  const handleUpdate = (index) => {
    const expenseToUpdate = currentItems[index]; // Retrieve expense from currentItems
    setCurrentExpense(expenseToUpdate);
    setIsFormOpen(true);
  };

  const handleDelete = (expense) => {
    setIsDialogOpen(true);
    setExpenseToDelete(expense);
  };

  const handleConfirmDelete = () => {
    const updatedExpenses = expenses.filter((expense) => expense !== expenseToDelete);
    setExpenses(updatedExpenses);
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };

  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]}, ${year}`;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const currentItems = sortedExpenses
    .filter((expense) =>
      expense.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (dateFilter ? expense.date.includes(dateFilter) : true)
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="expenseTracker">
      <div className="expense-heading-button-container">
        <h2 className='expense-heading'>My Expense Manager</h2>
        <div className='expense-button-padding'>
          <input
            className='search-input'
            type="text"
            value={dateFilter}
            onChange={handleDateFilter}
            placeholder="Filter by date of expense"
          />
          <input 
            className='search-input'
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search expenses by name"
          />
          <button className='new-expense' onClick={() => setIsFormOpen(true)}>+ New Expense</button>
        </div>
      </div>
      {isFormOpen && (
        <>
          <div className="backdrop" onClick={handleCancel} />
          <NewExpenseForm createdBy={userEmail} onSubmit={handleAddExpense} onCancel={handleCancel} expense={currentExpense} title={title}/>
        </>
      )}
      <ConfirmationDialog 
        isOpen={isDialogOpen} 
        onConfirm={handleConfirmDelete} 
        onCancel={handleCancelDelete} 
      />
      <table className='table-style'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date Of Expense</th>
            <th>Amount</th>
            <th>Updated At</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>{expense.category}</td>
              <td>{formatDate(expense.date)}</td>
              <td>INR {expense.amount.toFixed(2)}</td>
              <td>{formatUpdatedAt(expense.updatedAt)}</td>
              <td>{expense.createdBy}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  size="lg"
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleUpdate(index)}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="lg"
                  color="red"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(expense)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {[...Array(Math.ceil(expenses.length / itemsPerPage)).keys()].map((number) => (
          <button key={number} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
            {number + 1}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(expenses.length / itemsPerPage)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
