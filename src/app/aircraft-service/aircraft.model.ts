import { Pagination } from '../flight-service/flight.model';

export interface GetAircraftResponse {
    pagination: Pagination;
    data: Aircraft[];
}

export interface Aircraft {
    ident: string;
    type: string;
    economySeats: number;
    base: string;
}