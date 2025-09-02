export type Place = {
  id: string;
  location: string;
  area: string;
  gps: [string, string]; // Tuple with two string values
  hasMap: boolean;
};