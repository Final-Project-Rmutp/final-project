export interface RoomListItem {
    id:string;
    room_id: string;
    room_number: string;
    room_type: string;
    room_capacity: string;
    room_facilities: number[];
    facilities_id:number[];
    room_level: string;
    room_status: string;
}

export interface RoomListActionItem {
    id:string;
    room_id:string ;
    room_number: string;
    room_type: string;
    room_capacity: string;
    room_facilities: number[];
    facilities_id:number[];
    room_level: string;
    room_status: string;
}
