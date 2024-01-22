export interface AdminReportModel {
    id:string;
    report_id: number;
    room_id: number;
    user_id: number;
    report_detail: string;
    report_status: number;
    timestamp: string;
}