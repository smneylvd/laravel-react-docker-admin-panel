export interface HistoryRecord {
    uuid: string,
    action: string,
    column: string,
    prev_val: any,
    curr_val: any,
    updated_by: any,
    created_at: string,
}

export interface User {
    uuid: string,
    first_name: string,
    last_name: string,
    email: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    history_records: [HistoryRecord]
}