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
export interface CamperGallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}
export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  coverImage?: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmissions;
  engine: CamperEngines;
  amenities: CamperAmenities[];
  gallery: CamperGallery[];
  createdAt: string;
  updatedAt: string;
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
export interface BookingRequest {
  name: string;
  email: string;
}
export interface BookingResponse {
  message: string;
}
