import { useState } from 'react';
import { ListItem, UserData } from './authTypes';

const useUserState = () => {
  const [user, setUser] = useState<ListItem>({
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

  const [editingUser,setEditUser] = useState<UserData>({
    id: '',
    pin: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditUser((prevUser) => ({
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

  return { user, editingUser,setEditUser, handleInputChange, resetUser,handleInputEditChange,setUser };
};

export default useUserState;
