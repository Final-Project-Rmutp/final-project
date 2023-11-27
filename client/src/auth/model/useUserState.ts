import { useState } from 'react';

interface NewUser {
  id: string;
  citizen_id: string;
  firstname: string;
  lastname: string;
  accounttype: string;
}

const useUserState = () => {
  const [newUser, setNewUser] = useState<NewUser>({
    id: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name!]: value,
    }));
  };

  const resetUser = () => {
    setNewUser({
      id: '',
      citizen_id: '',
      firstname: '',
      lastname: '',
      accounttype: '',
    });
  };

  return {
    newUser,
    handleInputChange,
    resetUser,
  };
};

export default useUserState;
