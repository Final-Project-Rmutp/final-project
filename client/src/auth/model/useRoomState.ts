import { useState } from "react";
import { RoomListActionItem, RoomListItem } from "../model/room-list";
import { SubjectItemList } from "./subject";

const useRoomState = () => {
    const [room, setRoom] = useState<RoomListItem>({
        id: "",
        room_id: "",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: [0, 1],
        facilities_id:[1, 2],
        room_level: "",
        room_status: "",
    });
    const [editingRoom, setEditRoom] = useState<RoomListActionItem>({
        id: "",
        room_id:"",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: [0, 1],
        facilities_id:[1, 2],
        room_level: "",
        room_status: "",
    });
    const [AddRoom, setAddRoom] = useState<RoomListActionItem>({
        id: "",
        room_id:"",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: [1, 2],
        facilities_id:[1, 2],
        room_level: "",
        room_status: "",
    });

    const [subject, setSubject] = useState<SubjectItemList>({
        id:"",
        subject_id: "",
        subject_name: "",
        subject_code: "",
        user_id: "",
        firstname:""
    });
    const [editingSubject, setEditSubject] = useState<SubjectItemList>({
        id:"",
        subject_id: "",
        subject_name: "",
        subject_code: "",
        user_id: "",
        firstname:""
    });
    const [AddSubject, setAddSubject] = useState<SubjectItemList>({
        id:"",
        subject_id: "",
        subject_name: "",
        subject_code: "",
        user_id: "",
        firstname:""
    });
        const handleInputChangeSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setAddSubject((prevUser) => ({
            ...prevUser,
            [name]: value,
            }));
        };
        const handleInputEditChangeSubject = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const { name, value } = event.target;
            setEditSubject((prevRoom) => ({
            ...prevRoom,
            [name]: value,
            }));
        };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
        }));
    };
    const handleInputEditChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setEditRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
        }));
    };

    const resetRoom = () => {
        setRoom({
        id: "",
        room_id: "",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: [0, 1],
        facilities_id:[1, 2],
        room_level: "",
        room_status: "",
        });
    };

    return {
        room,
        editingRoom,
        AddRoom,
        AddSubject,
        editingSubject,
        subject,
        //set
        setSubject,
        setAddRoom,
        setEditRoom,
        resetRoom,
        setRoom,
        setEditSubject,
        setAddSubject,
        //func
        handleInputChange,
        handleInputEditChange,
        handleInputChangeSubject,
        handleInputEditChangeSubject
    };
};

export default useRoomState;
