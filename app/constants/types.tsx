export interface HistoryItem {
    type: string,
    date: Date,
    data: ActivityItem | SchoolVisit,
} 

export interface ActivityItem {
    a_id: number,
    date: string,
    description: string,
}
export interface School {
    id: number,
    name: string,
    address: string,
    contact: string,
    type: string
}

export interface SchoolVisit {
    visit_id: number;
    school_id: number;
    date: Date;
    students: number;
    name: string;
    contact: string;
  }