import { useState } from 'react';
import { AdduserListItem, ListItem, UserData } from './authTypes';

const useUserState = () => {
  const [user, setUser] = useState<ListItem>({
    id: '',
    accountstatus: '',
    account_role: '',
    pin: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    account_type: '',
    user_img_path: '' || null,
  });

  const [editingUser,setEditUser] = useState<UserData>({
    id: '',
    pin: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
  });
  const [AddUser,setAddUser] = useState<AdduserListItem>({
    pin: '',
    citizen_id: '',
    firstname: '',
    lastname: '',
    account_type: '',
    user_img_path: '' || null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddUser((prevUser) => ({
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
      account_role: '',
      pin: '',
      citizen_id: '',
      firstname: '',
      lastname: '',
      account_type: '',
      user_img_path: '' || null,
    });
  };

  return { user, editingUser, AddUser,setAddUser, setEditUser, handleInputChange, resetUser,handleInputEditChange,setUser };
};

export default useUserState;
