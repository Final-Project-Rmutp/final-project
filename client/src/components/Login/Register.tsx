import React, { useState } from 'react';
import axios from 'axios';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

const Register: React.FC = () => {
  const [registrationData, setRegistrationData] = useState({
    id: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    id: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
    general: '',
  });

  const resetErrorMessages = () => {
    setErrorMessages({
      id: '',
      citizen_id: '',
      firstname: '',
      lastname: '',
      accounttype: '',
      general: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    resetErrorMessages();
  };

  const handleRegister = async () => {
    resetErrorMessages();

    try {
      const response = await axios.post(`${apiUrl}/admin/user/add`, registrationData);

      if (response.status === 201) {
        console.log('User registration successful. User ID:', response.data.userId);
        // Optionally, you can redirect the user to the login page after successful registration
        // window.location.href = '/login';
      } else {
        console.error('User registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('User registration failed:', error);
    }
  };

  return (
    <div className="register-form">
      <div className="register-form-container">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">Register</h1>
        <div className="mb-4">
          <label htmlFor="id" className="text-sm text-gray-600">
            ID Card:
          </label>
          <input type="text" name="id" value={registrationData.id} onChange={handleInputChange} />
          {errorMessages.id && <p className="error-message">{errorMessages.id}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="citizen_id" className="text-sm text-gray-600">
            ID Student:
          </label>
          <input type="text" name="citizen_id" value={registrationData.citizen_id} onChange={handleInputChange} />
          {errorMessages.citizen_id && <p className="error-message">{errorMessages.citizen_id}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="firstname" className="text-sm text-gray-600">
            First Name:
          </label>
          <input type="text" name="firstname" value={registrationData.firstname} onChange={handleInputChange} />
          {errorMessages.firstname && <p className="error-message">{errorMessages.firstname}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="text-sm text-gray-600">
            Last Name:
          </label>
          <input type="text" name="lastname" value={registrationData.lastname} onChange={handleInputChange} />
          {errorMessages.lastname && <p className="error-message">{errorMessages.lastname}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="accounttype" className="text-sm text-gray-600">
            Account Type:
          </label>
          <input type="text" name="accounttype" value={registrationData.accounttype} onChange={handleInputChange} />
          {errorMessages.accounttype && <p className="error-message">{errorMessages.accounttype}</p>}
        </div>
        {errorMessages.general && <p className="error-message mt-2">{errorMessages.general}</p>}
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
