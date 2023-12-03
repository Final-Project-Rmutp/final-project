import { useState } from 'react';
import { ListItem } from './authTypes';

const useUserState = () => {
  const [user, setUser] = useState<ListItem>({
    id: '', // Add the id property
    accountstatus: '', // Add the accountstatus property
    accountrole: '',
    pin: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    accounttype: '',
    user_img_path: '' || null,
  });

  const [editingUser] = useState<ListItem | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const resetUser = () => {
    setUser({
      id: '',
      accountstatus: '',
      accountrole: '',
      pin: '',
      citizen_id: '',
      firstname: '',
      lastname: '',
      accounttype: '',
      user_img_path: '' || null,
    });
  };

  return { user, editingUser, handleInputChange, resetUser };
};

export default useUserState;
