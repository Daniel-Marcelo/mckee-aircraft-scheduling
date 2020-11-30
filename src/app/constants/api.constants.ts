export const apiBaseUrl = 'https://infinite-dawn-93085.herokuapp.com'

export const aircraftsUrl = `${apiBaseUrl}/aircrafts`
export const flightsUrl = (offset = 0, limit = 25) => `${apiBaseUrl}/flights?offset=${offset}&limit=${limit}`