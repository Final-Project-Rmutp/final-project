//authTypes.ts
export interface UserData {
  id:string;
  pin: string;
  citizen_id: string;
  firstname: string;
  lastname: string;
  user_img_path:string | null;

}

export interface ListItem {
  updated: boolean;
  id: string;
  pin: string;
  firstname: string;
  lastname: string;
  citizen_id: string;
  user_img_path:string | null;
  account_type: string;
  accountstatus: string;
  account_role: string;
}

export interface AdduserListItem {
  id:string;
  pin: string;
  firstname: string;
  lastname: string;
  citizen_id: string;
  user_img_path:string | null;
  account_type: string;
}


