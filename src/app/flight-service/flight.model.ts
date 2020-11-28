export interface Flight {
    id: string;
    arrivalTime: number;
    departureTime: number;
    readable_arrival: string;
    readable_departure: string;
    origin: string;
    destination: string;
}

export interface GetFlightsResponse {
    pagination: Pagination;
    data: Flight[];
}

export interface Pagination {
    offset: number;
    limit: number;
    total: number;
}