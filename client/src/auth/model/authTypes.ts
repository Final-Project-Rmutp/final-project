//authTypes.ts
export interface UserData {
  id:string;
  pin: string;
  citizen_id: string;
  firstname: string;
  lastname: string;
}
// export interface UpdateUserData {
//   pin: string;
//   citizen_id: string;
//   firstname: string;
//   lastname: string;
// }

export interface ListItem {
  id: string;
  pin: string;
  firstname: string;
  lastname: string;
  citizen_id: string;
  user_img_path:string | null;
  accounttype: string;
  accountstatus: string;
  accountrole: string;
}