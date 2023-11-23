import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authLogin';

const Admin: React.FC = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [isEnterPressed, setIsEnterPressed] = useState(false);
    const [inputValue, setInputValue] = useState<string>('');

  const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 3, name: 'Jane Doe', age: 30 },
    { id: 4, name: 'Jane Doe', age: 30 },
    { id: 5, name: 'Jane Doe', age: 30 },
    { id: 6, name: 'Jane Doe', age: 30 },
    { id: 7, name: 'Jane Doe', age: 30 },
    { id: 8, name: 'Jane Doe', age: 30 },
    { id: 9, name: 'Jane Doe', age: 30 },
    { id: 10, name: 'Jane Doe', age: 30 },
  ];

  const handleRowClick = (id: number) => {
    // Toggle row selection
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Handle the Enter key press, set the input value to the combined value of selected rows
      const combinedValue = selectedRows
        .map((rowId) => data.find((row) => row.id === rowId)?.name)
        .filter(Boolean)
        .join(', ');

      setInputValue(combinedValue);
      setIsEnterPressed(true); // Set isEnterPressed to true when Enter is pressed
    } else {
      // Clear input value and reset Enter state when any other key is pressed
      setInputValue('');
      setIsEnterPressed(false);
    }
  };
  const { logout, getUserInfo } = useAuth();
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  useEffect(() => {
    // Clear input value and reset Enter state when no rows are selected
    if (selectedRows.length === 0) {
      setInputValue('');
      setIsEnterPressed(false);
    }
  }, [selectedRows]);

  return (
    <div className="admin-container">
        <div
          className="logout-button"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <p>Welcome, {userInfo.name}!</p>
        </div>
      {isEnterPressed && (
        <div>
          <input
            type="text"
            placeholder={`Enter value for selected rows`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              style={{
                background: selectedRows.includes(row.id) ? 'lightblue' : 'white',
              }}
            >
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
