export type CamperForm =
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";

export type CamperTransmissions = "automatic" | "manual";
export type CamperEngines = "diesel" | "petrol" | "hybrid" | "electric";
export type CamperAmenities =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmissions;
  engine: CamperEngines;
  amenities: CamperAmenities[];
  coverImage: string;
  totalReviews: number;
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}
export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmissions;
  engine?: CamperEngines;
  page?: number;
  perPage?: number;
}
