//authTypes.ts
export interface UserData {
  id: string;
  citizen_id: string;
  firstname: string;
  lastname: string;
  accounttype: string;
}

export interface ListItem {
  id: string;
  firstname: string;
  lastname: string;
  citizen_id: string;
  user_img_path:string;
  accounttype: string;
  accountstatus: string;
  accountrole: string;
}