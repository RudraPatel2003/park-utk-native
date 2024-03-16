export const ranges = [
  "0 - 5",
  "5 - 10",
  "10 - 20",
  "20 - 40",
  "40-99",
  "100+",
] as const;
export type Range = (typeof ranges)[number];

export const parkingGarages = [
  "11th Street (G13)",
  "Neyland Drive (G10)",
  "Terrace Avenue (G17)",
  "Volunteer Boulevard (G16)",
  "Volunteer Hall (G15)",
  "White Avenue (G12)",
] as const;
export type ParkingGarage = (typeof parkingGarages)[number];

export type CoordinateConverter = {
  [key in ParkingGarage]: number;
};

export const parkingGarageLatitudes: CoordinateConverter = {
  "11th Street (G13)": 35.95974721358193,
  "Neyland Drive (G10)": 35.95351904825186,
  "Terrace Avenue (G17)": 35.95460811672249,
  "Volunteer Boulevard (G16)": 35.951209287591126,
  "Volunteer Hall (G15)": 35.95892034378138,
  "White Avenue (G12)": 35.95797921826765,
} as const;

export const parkingGarageLongitudes: CoordinateConverter = {
  "11th Street (G13)": -83.92529528555826,
  "Neyland Drive (G10)": -83.92393497849766,
  "Terrace Avenue (G17)": -83.93379379139853,
  "Volunteer Boulevard (G16)": -83.92979662787423,
  "Volunteer Hall (G15)": -83.92984735786756,
  "White Avenue (G12)": -83.93197406178757,
} as const;

export type Report = {
  id: string;
  parking_garage: ParkingGarage;
  reported_range: Range;
  created_at: string;
};

export type APIResponse<T> = {
  success: boolean;
  data?: T | T[];
  errors?: string[];
};
