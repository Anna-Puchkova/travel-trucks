import axios from "axios";
import {
  BookingRequest,
  BookingResponse,
  Camper,
  CamperFilters,
  CampersResponse,
  Review,
} from "../types/camper";
const API_URL = "https://campers-api.goit.study";
export async function fetchCampers(
  filters: CamperFilters = {},
): Promise<CampersResponse> {
  const { data } = await axios.get<CampersResponse>(`${API_URL}/campers`, {
    params: filters,
  });

  return data;
}
export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await axios.get<Camper>(`${API_URL}/campers/${id}`);
  return data;
}
export async function getReviews(camperId: string): Promise<Review[]> {
  const { data } = await axios.get<Review[]>(
    `${API_URL}/campers/${camperId}/reviews`,
  );
  return data;
}
export async function createBookingRequest(
  camperId: string,
  bookingData: BookingRequest,
): Promise<BookingResponse> {
  const { data } = await axios.post<BookingResponse>(
    `${API_URL}/campers/${camperId}/booking-requests`,
    bookingData,
  );
  return data;
}
