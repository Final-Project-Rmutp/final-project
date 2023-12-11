import { useState } from "react";
import { RoomListActionItem, RoomListItem } from "../model/room-list";

const useRoomState = () => {
    const [room, setRoom] = useState<RoomListItem>({
        id: "",
        room_id: "",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: "",
        room_level: "",
        room_status: "",
    });
    const [editingRoom, setEditRoom] = useState<RoomListActionItem>({
        id: "",
        room_id:"",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: "",
        room_level: "",
        room_status: "",
    });
    const [AddRoom, setAddRoom] = useState<RoomListActionItem>({
        id: "",
        room_id:"",
        room_number: "",
        room_type: "",
        room_capacity: "",
        room_facilities: "",
        room_level: "",
        room_status: "",
    });
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
        room_facilities: "",
        room_level: "",
        room_status: "",
        });
    };

    return {
        room,
        editingRoom,
        AddRoom,
        setAddRoom,
        setEditRoom,
        handleInputChange,
        resetRoom,
        handleInputEditChange,
        setRoom,
    };
};

export default useRoomState;
