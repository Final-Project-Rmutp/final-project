// useUserState.ts
import { useState } from 'react';

const useUserState = () => {
  const [user, setUser] = useState({
    id: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      
    }));
    
  };

  const resetUser = () => {
    setUser({
      id: '',
      citizen_id: '',
      firstname: '',
      lastname: '',
      accounttype: '',
    });
  };

  return { user, handleInputChange, resetUser };
};

export default useUserState;
