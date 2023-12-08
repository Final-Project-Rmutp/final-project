import { useState } from "react";
import { AdduserListItem, ListItem, UserData } from "./authTypes";
import { ReservedListItem } from "./reserved-list";

const useUserState = () => {
  const [user, setUser] = useState<ListItem>({
    id: "",
    accountstatus: "",
    account_role: "",
    pin: "",
    citizen_id: "",
    firstname: "",
    lastname: "",
    account_type: "",
    user_img_path: "" || null,
  });

  const [reservedUser, setReservedUser] = useState<ReservedListItem>({
    id:"",
    user_name:"",
    citizen_id: "",
    reservation_id: "",
    room_id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    reservation_status: "",
  });

  const [editingUser, setEditUser] = useState<UserData>({
    id: "",
    pin: "",
    citizen_id: "",
    firstname: "",
    lastname: "",
  });
  const [AddUser, setAddUser] = useState<AdduserListItem>({
    pin: "",
    citizen_id: "",
    firstname: "",
    lastname: "",
    account_type: "",
    user_img_path: "" || null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleInputEditChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const resetUser = () => {
    setUser({
      id: "",
      accountstatus: "",
      account_role: "",
      pin: "",
      citizen_id: "",
      firstname: "",
      lastname: "",
      account_type: "",
      user_img_path: "" || null,
    });
  };

  return {
    user,
    editingUser,
    reservedUser,
    AddUser,
    setReservedUser,
    setAddUser,
    setEditUser,
    handleInputChange,
    resetUser,
    handleInputEditChange,
    setUser,
  };
};

export default useUserState;
