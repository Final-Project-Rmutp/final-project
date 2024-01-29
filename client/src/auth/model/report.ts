export interface AdminReportModel {
    id:string;
    report_id:number;
    fullname: string;
    room_number: string;
    report_detail: string;
    report_status: number;
    timestamp: string;
}
export interface UserReportModel {
    id:string;
    report_id: string
    room_number: string
    report_detail: string
    report_status: string
    timestamp: string
}