import React from "react";
import {
  ModalDialog,
  Modal,
  DialogTitle,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Button,
  DialogActions,
  Input,
  Option,
} from "@mui/joy";
import useStudentList from "../useStudentList";



export interface ModalAddProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
export const ModalAdd: React.FC<ModalAddProps> = ({ open, onClose, onConfirm }) => {

    const {
        AddUser,
        setAddUser,
        handleImageChange
    } = useStudentList();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddUser((prevAddUser) => ({
          ...prevAddUser,
          [name]: value,
        }));
      };
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg" layout="center" color="primary" sx={{ width: 450 }}>
        <DialogTitle>Add New User</DialogTitle>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>ID Card</FormLabel>
            <Input
              required
              name="pin"
              value={AddUser.pin}
              onChange={handleInputChange}
              fullWidth
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Student ID</FormLabel>
            <Input
              required
              name="citizen_id"
              value={AddUser.citizen_id}
              onChange={handleInputChange}
              fullWidth
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel>FirstName</FormLabel>
            <Input
              required
              name="firstname"
              value={AddUser.firstname}
              onChange={handleInputChange}
              fullWidth
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel>LastName</FormLabel>
            <Input
              required
              name="lastname"
              value={AddUser.lastname}
              onChange={handleInputChange}
              fullWidth
              size="lg"
            />
          </FormControl>
          <FormControl>
            <FormLabel>AccountType</FormLabel>
            <Select
              defaultValue="select"
              required
              name="account_type"
              value={AddUser.account_type}
              onChange={(_, value) =>
                setAddUser({ ...AddUser, account_type: value as string })
              }
            >
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
              fullWidth
            />
          </FormControl>
          <DialogActions>
            <Button type="cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => onConfirm()}>
              Confirm
            </Button>
          </DialogActions>
        </Stack>
      </ModalDialog>
    </Modal>
  );

};

