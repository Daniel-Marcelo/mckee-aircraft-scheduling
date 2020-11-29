export interface Flight {
    id: string;
    arrivaltime: number;
    departuretime: number;
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

// Sorts flights based on departure date
export const sortFlights = (flights: Flight[]) => {
    flights.sort((a, b) => {
      if (a.departuretime > b.departuretime) {
        return 1;
      } else if (a.departuretime < b.departuretime) {
        return -1;
      } else {
        return 0;
      }
    });
  }