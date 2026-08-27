import axios from "axios";
import { CamperFilters, CampersResponse } from "../types/camper";

const API_URL = "https://campers-api.goit.study";

export async function fetchCampers(
  filters: CamperFilters = {},
): Promise<CampersResponse> {
  const { data } = await axios.get<CampersResponse>(`${API_URL}/campers`, {
    params: filters,
  });
  return data;
}
